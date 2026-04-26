from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models.producto import Producto
from backend.models.servicio import Servicio
from backend.models.sugerencia import Sugerencia
from backend.models.noticia import Noticia
from backend.models.visita import Visita

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/dashboard/general")
def dashboard_general(db: Session = Depends(get_db)):
    return {
        "productos": db.query(Producto).count(),
        "servicios": db.query(Servicio).count(),
        "sugerencias": db.query(Sugerencia).count(),
        "noticias": db.query(Noticia).count(),
        "visitas": db.query(Visita).count()
    }


@router.get("/dashboard/productos-resumen")
def dashboard_productos(db: Session = Depends(get_db)):
    productos = db.query(Producto).all()

    por_categoria = {}

    for p in productos:
        categoria = p.categoria or "Sin categoría"
        por_categoria[categoria] = por_categoria.get(categoria, 0) + 1

    return {
        "total": len(productos),
        "por_categoria": por_categoria
    }


@router.get("/dashboard/servicios")
def dashboard_servicios(db: Session = Depends(get_db)):
    servicios = db.query(Servicio).all()

    por_area = {}

    for s in servicios:
        area = s.area or "Sin área"
        por_area[area] = por_area.get(area, 0) + 1

    return {
        "total": len(servicios),
        "por_area": por_area
    }


@router.post("/visitas")
def registrar_visita(db: Session = Depends(get_db)):
    visita = Visita()

    db.add(visita)
    db.commit()
    db.refresh(visita)

    return {
        "msg": "Visita registrada",
        "id": visita.id
    }