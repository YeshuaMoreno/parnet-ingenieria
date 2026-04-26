from sqlalchemy import Column, Integer, String, Text
from backend.database import Base


class Noticia(Base):
    __tablename__ = "noticias"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150), nullable=False)
    contenido = Column(Text, nullable=False)
    imagen = Column(String(255), nullable=True)
    estatus = Column(String(30), default="Activa")