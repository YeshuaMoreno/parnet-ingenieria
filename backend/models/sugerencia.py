from sqlalchemy import Column, Integer, String, Text
from backend.database import Base


class Sugerencia(Base):
    __tablename__ = "sugerencias"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    correo = Column(String(150), nullable=False)
    mensaje = Column(Text, nullable=False)
    estatus = Column(String(30), default="Pendiente")