from sqlalchemy import Column, Integer, String, ForeignKey
from backend.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    curp = Column(String(20))
    turno = Column(Integer)
    estatus = Column(String(20), default="Pendiente")
    municipio_id = Column(Integer, ForeignKey("municipios.id"))