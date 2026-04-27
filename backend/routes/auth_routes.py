from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import jwt
from datetime import datetime, timedelta
import hashlib
import secrets

from backend.database import SessionLocal
from backend.models.usuario import Usuario

router = APIRouter()

SECRET_KEY = "parnet_secret_key_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120


class LoginData(BaseModel):
    username: str
    password: str


class RegisterData(BaseModel):
    username: str
    password: str
    rol: str = "user"


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hashear_password(password: str) -> str:
    salt = secrets.token_hex(16)
    hash_password = hashlib.sha256((salt + password).encode("utf-8")).hexdigest()
    return f"{salt}${hash_password}"


def verificar_password(password_plano: str, password_guardado: str) -> bool:
    # Compatibilidad con usuarios viejos sin hash
    if "$" not in password_guardado:
        return password_plano == password_guardado

    salt, hash_guardado = password_guardado.split("$", 1)
    hash_password = hashlib.sha256((salt + password_plano).encode("utf-8")).hexdigest()
    return hash_password == hash_guardado


def crear_token(data: dict):
    datos = data.copy()
    expiracion = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    datos.update({"exp": expiracion})
    return jwt.encode(datos, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/login")
def login(data: LoginData, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.username == data.username).first()

    if not usuario:
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")

    password_correcta = verificar_password(data.password, usuario.password)

    if not password_correcta:
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")

    # Si estaba en texto plano, lo convertimos a hash automáticamente
    if "$" not in usuario.password:
        usuario.password = hashear_password(data.password)
        db.commit()

    token = crear_token({
        "sub": usuario.username,
        "rol": usuario.rol
    })

    return {
        "token": token,
        "rol": usuario.rol
    }


@router.post("/register")
def register(data: RegisterData, db: Session = Depends(get_db)):
    existe = db.query(Usuario).filter(Usuario.username == data.username).first()

    if existe:
        raise HTTPException(status_code=400, detail="El usuario ya existe")

    nuevo_usuario = Usuario(
        username=data.username,
        password=hashear_password(data.password),
        rol=data.rol
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {
        "msg": "Usuario registrado correctamente",
        "usuario": {
            "id": nuevo_usuario.id,
            "username": nuevo_usuario.username,
            "rol": nuevo_usuario.rol
        }
    }