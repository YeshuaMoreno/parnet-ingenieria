from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models.noticia import Noticia
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class NoticiaCreate(BaseModel):
    titulo: str
    contenido: str
    imagen: Optional[str] = None
    estatus: str = "Activa"


class NoticiaUpdate(BaseModel):
    titulo: str
    contenido: str
    imagen: Optional[str] = None
    estatus: str = "Activa"


@router.post("/noticias")
def crear_noticia(data: NoticiaCreate, db: Session = Depends(get_db)):
    noticia = Noticia(
        titulo=data.titulo,
        contenido=data.contenido,
        imagen=data.imagen,
        estatus=data.estatus
    )

    db.add(noticia)
    db.commit()
    db.refresh(noticia)

    return {"msg": "Noticia creada correctamente", "noticia": noticia}


@router.get("/noticias")
def obtener_noticias(db: Session = Depends(get_db)):
    return db.query(Noticia).all()


@router.get("/noticias/{id}")
def obtener_noticia(id: int, db: Session = Depends(get_db)):
    noticia = db.query(Noticia).filter(Noticia.id == id).first()

    if not noticia:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")

    return noticia


@router.put("/noticias/{id}")
def actualizar_noticia(id: int, data: NoticiaUpdate, db: Session = Depends(get_db)):
    noticia = db.query(Noticia).filter(Noticia.id == id).first()

    if not noticia:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")

    noticia.titulo = data.titulo
    noticia.contenido = data.contenido
    noticia.imagen = data.imagen
    noticia.estatus = data.estatus

    db.commit()
    db.refresh(noticia)

    return {"msg": "Noticia actualizada correctamente", "noticia": noticia}


@router.delete("/noticias/{id}")
def eliminar_noticia(id: int, db: Session = Depends(get_db)):
    noticia = db.query(Noticia).filter(Noticia.id == id).first()

    if not noticia:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")

    db.delete(noticia)
    db.commit()

    return {"msg": "Noticia eliminada correctamente"}