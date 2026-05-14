from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import uuid

router = APIRouter()

# Usuarios activos en memoria:
# cliente_id -> última vez que hizo ping
conectados_activos = {}

# Si alguien no manda ping en 35 segundos, se considera desconectado
TIEMPO_LIMITE_SEGUNDOS = 35


class ConectadoPing(BaseModel):
    cliente_id: str | None = None


def limpiar_conectados():
    ahora = datetime.utcnow()

    expirados = [
        cliente_id
        for cliente_id, ultima_vez in conectados_activos.items()
        if (ahora - ultima_vez).total_seconds() > TIEMPO_LIMITE_SEGUNDOS
    ]

    for cliente_id in expirados:
        del conectados_activos[cliente_id]


@router.post("/conectados/ping")
def ping_conectado(data: ConectadoPing):
    limpiar_conectados()

    cliente_id = data.cliente_id or str(uuid.uuid4())

    conectados_activos[cliente_id] = datetime.utcnow()

    return {
        "cliente_id": cliente_id,
        "conectados": len(conectados_activos)
    }


@router.get("/conectados")
def obtener_conectados():
    limpiar_conectados()

    return {
        "conectados": len(conectados_activos)
    }