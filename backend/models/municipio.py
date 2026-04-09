from sqlalchemy import Column, Integer, String
from backend.database import Base
from backend.models.ticket import Ticket

class Municipio(Base):
    __tablename__ = "municipios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True)
    contador = Column(Integer, default=0)