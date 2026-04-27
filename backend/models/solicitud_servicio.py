from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from backend.database import Base

class SolicitudServicio(Base):
    __tablename__ = "solicitudes_servicio"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    correo = Column(String(150), nullable=False)
    area = Column(String(100), nullable=False)
    detalle = Column(Text, nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow)