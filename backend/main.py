from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.models import solicitud_servicio
from backend.database import engine, Base

from backend.routes import (
    auth_routes,
    producto_routes,
    servicio_routes,
    sugerencia_routes,
    noticia_routes,
    dashboard_routes
)

from backend.models import (
    usuario,
    producto,
    servicio,
    sugerencia,
    noticia,
    visita
)

app = FastAPI(
    title="ParNet Ingeniería API",
    description="API REST para sistema web ParNet Ingeniería",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="backend/static"), name="static")

Base.metadata.create_all(bind=engine)

app.include_router(auth_routes.router, prefix="/api")
app.include_router(producto_routes.router, prefix="/api")
app.include_router(servicio_routes.router, prefix="/api")
app.include_router(sugerencia_routes.router, prefix="/api")
app.include_router(noticia_routes.router, prefix="/api")
app.include_router(dashboard_routes.router, prefix="/api")
