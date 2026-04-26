from sqlalchemy import Column, Integer, String, Text
from backend.database import Base


class Servicio(Base):
    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    area = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=True)
    estatus = Column(String(30), default="Activo")