from pydantic import BaseModel

class TicketCreate(BaseModel):
    nombre: str
    curp: str
    municipio_id: int

class TicketResponse(BaseModel):
    id: int
    nombre: str
    curp: str
    turno: int
    estatus: str

    class Config:
        orm_mode = True