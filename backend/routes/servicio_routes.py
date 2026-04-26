from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models.servicio import Servicio
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class ServicioCreate(BaseModel):
    nombre: str
    area: str
    descripcion: Optional[str] = None
    estatus: str = "Activo"


class ServicioUpdate(BaseModel):
    nombre: str
    area: str
    descripcion: Optional[str] = None
    estatus: str = "Activo"


@router.post("/servicios")
def crear_servicio(data: ServicioCreate, db: Session = Depends(get_db)):
    servicio = Servicio(
        nombre=data.nombre,
        area=data.area,
        descripcion=data.descripcion,
        estatus=data.estatus
    )

    db.add(servicio)
    db.commit()
    db.refresh(servicio)

    return {"msg": "Servicio creado correctamente", "servicio": servicio}


@router.get("/servicios")
def obtener_servicios(db: Session = Depends(get_db)):
    return db.query(Servicio).all()


@router.get("/servicios/{id}")
def obtener_servicio(id: int, db: Session = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id == id).first()

    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")

    return servicio


@router.put("/servicios/{id}")
def actualizar_servicio(id: int, data: ServicioUpdate, db: Session = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id == id).first()

    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")

    servicio.nombre = data.nombre
    servicio.area = data.area
    servicio.descripcion = data.descripcion
    servicio.estatus = data.estatus

    db.commit()
    db.refresh(servicio)

    return {"msg": "Servicio actualizado correctamente", "servicio": servicio}


@router.delete("/servicios/{id}")
def eliminar_servicio(id: int, db: Session = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id == id).first()

    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")

    db.delete(servicio)
    db.commit()

    return {"msg": "Servicio eliminado correctamente"}