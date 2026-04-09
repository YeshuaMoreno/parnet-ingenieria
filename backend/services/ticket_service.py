from sqlalchemy.orm import Session
from backend.models.ticket import Ticket
from backend.models.municipio import Municipio

class TicketFactory:

    @staticmethod
    def crear_ticket(db: Session, nombre: str, curp: str, municipio_id: int):
        
        # Validar municipio
        municipio = db.query(Municipio).filter(Municipio.id == municipio_id).first()

        if not municipio:
            raise Exception("Municipio no encontrado")

        # BLOQUEAR + INCREMENTAR TURNO (más seguro)
        municipio.contador = (municipio.contador or 0) + 1
        turno = municipio.contador

        # Crear ticket
        nuevo_ticket = Ticket(
            nombre=nombre,
            curp=curp,
            turno=turno,
            municipio_id=municipio_id,
            estatus = "Pendiente"
        )

        db.add(nuevo_ticket)

        db.commit()

        db.refresh(nuevo_ticket)

        return nuevo_ticket