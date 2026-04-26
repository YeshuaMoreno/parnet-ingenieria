from sqlalchemy import Column, Integer, String, Text, Float
from backend.database import Base


class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    categoria = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=True)
    precio = Column(Float, default=0)
    estatus = Column(String(30), default="Existencia")
    imagen = Column(String(255), nullable=True)