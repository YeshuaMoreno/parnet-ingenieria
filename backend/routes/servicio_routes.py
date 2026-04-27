from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from backend.database import SessionLocal
from backend.models.servicio import Servicio
from backend.models.solicitud_servicio import SolicitudServicio

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


class SolicitudCreate(BaseModel):
    nombre: str
    correo: str
    area: str
    detalle: str


@router.post("/servicios/solicitar")
def solicitar_servicio(data: SolicitudCreate, db: Session = Depends(get_db)):
    solicitud = SolicitudServicio(
        nombre=data.nombre,
        correo=data.correo,
        area=data.area,
        detalle=data.detalle,
        fecha=datetime.utcnow()
    )

    db.add(solicitud)
    db.commit()
    db.refresh(solicitud)

    return {"msg": "Solicitud enviada correctamente", "solicitud": solicitud}


@router.get("/servicios/solicitudes")
def obtener_solicitudes(db: Session = Depends(get_db)):
    return db.query(SolicitudServicio).order_by(SolicitudServicio.id.desc()).all()


@router.post("/servicios")
def crear_servicio(data: ServicioCreate, db: Session = Depends(get_db)):
    servicio = Servicio(**data.dict())

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