from sqlalchemy import Column, Integer, DateTime
from datetime import datetime
from backend.database import Base


class Visita(Base):
    __tablename__ = "visitas"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(DateTime, default=datetime.now)