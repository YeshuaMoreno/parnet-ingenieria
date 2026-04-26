from pydantic import BaseModel
from typing import Optional


class ProductoCreate(BaseModel):
    nombre: str
    categoria: str
    descripcion: Optional[str] = None
    precio: float = 0
    estatus: str = "Existencia"
    imagen: Optional[str] = None


class ProductoUpdate(BaseModel):
    nombre: str
    categoria: str
    descripcion: Optional[str] = None
    precio: float = 0
    estatus: str = "Existencia"
    imagen: Optional[str] = None


class ProductoResponse(BaseModel):
    id: int
    nombre: str
    categoria: str
    descripcion: Optional[str]
    precio: float
    estatus: str
    imagen: Optional[str]

    class Config:
        from_attributes = True