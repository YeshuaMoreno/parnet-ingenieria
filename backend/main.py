from fastapi import FastAPI
from backend.database import engine, Base
from backend.routes import ticket_routes
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.routes.ticket_routes import router

app = FastAPI()

# Agregar middleware para permitir CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/static", StaticFiles(directory="."), name="static")

# Crear tablas
Base.metadata.create_all(bind=engine)

# Registrar rutas
app.include_router(router, prefix="/api")