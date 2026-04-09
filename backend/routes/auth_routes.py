from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models.usuario import Usuario

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(
        Usuario.username == username,
        Usuario.password == password
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {"mensaje": "Login exitoso"}