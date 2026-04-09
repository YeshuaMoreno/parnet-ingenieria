from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.database import SessionLocal
from backend.models.municipio import Municipio
from backend.models.ticket import Ticket
from backend.schemas.ticket_schema import TicketCreate
from backend.services.ticket_service import TicketFactory
from backend.services.qr_service import generar_qr
from backend.services.pdf_service import generar_pdf
from pydantic import BaseModel

class TicketUpdate(BaseModel):
    curp: str
    turno: int
    nombre: str

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/municipios")
def obtener_municipios(db: Session = Depends(get_db)):
    municipios = db.query(Municipio).all()

    return [
        {
            "id": m.id,
            "nombre": m.nombre
        }
        for m in municipios
    ]

@router.post("/tickets")
def crear_ticket(data: TicketCreate, db: Session = Depends(get_db)):
    try:
        ticket = TicketFactory.crear_ticket(
            db,
            data.nombre,
            data.curp,
            data.municipio_id
        )

        qr_path = f"qr_{ticket.id}.png"
        pdf_path = f"ticket_{ticket.id}.pdf"

        generar_qr(ticket.curp, qr_path)
        generar_pdf(ticket, qr_path, pdf_path)

        return {
            "turno": ticket.turno,
            "pdf": f"/static/{pdf_path}"
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/tickets")
def modificar_ticket(data: TicketUpdate, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(
        Ticket.curp == data.curp,
        Ticket.turno == data.turno
    ).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    ticket.nombre = data.nombre
    db.commit()

    return {"mensaje": "Ticket actualizado"}

def cambiar_estatus(id: int, estatus: str, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="No encontrado")

    ticket.estatus = estatus
    db.commit()

    return {"mensaje": "Actualizado"}

@router.get("/tickets")
def obtener_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).all()

    return [
        {
            "id": t.id,
            "nombre": t.nombre,
            "curp": t.curp,
            "turno": t.turno,
            "estatus": t.estatus
        }
        for t in tickets
    ]

@router.delete("/tickets/{id}")
def eliminar_ticket(id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="No encontrado")

    db.delete(ticket)
    db.commit()

    return {"mensaje": "Eliminado"}
@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    total = db.query(func.count(Ticket.id)).scalar()

    pendientes = db.query(func.count(Ticket.id))\
        .filter(Ticket.estatus == "Pendiente")\
        .scalar()

    resueltos = db.query(func.count(Ticket.id))\
        .filter(Ticket.estatus == "Resuelto")\
        .scalar()

    return {
        "total": total,
        "pendientes": pendientes,
        "resueltos": resueltos
    }

@router.put("/tickets/update")
def actualizar_ticket(curp: str, turno: int, nombre: str, db: Session = Depends(get_db)):

    ticket = db.query(Ticket).filter(
        Ticket.curp == curp,
        Ticket.turno == turno
    ).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="No encontrado")

    ticket.nombre = nombre
    db.commit()

    return {"mensaje": "Actualizado"}

@router.get("/tickets/search")
def buscar(q: str, db: Session = Depends(get_db)):

    resultados = db.query(Ticket).filter(
        Ticket.curp.contains(q) |
        Ticket.nombre.contains(q)
    ).all()

    return resultados

@router.put("/tickets/status/{id}")
def cambiar_status(id: int, estatus: str, db: Session = Depends(get_db)):

    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="No encontrado")

    ticket.estatus = estatus
    db.commit()

    return {"mensaje": "ok"}