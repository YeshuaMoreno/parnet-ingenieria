# 🚀 ParNet Ingeniería - Sistema Web

> Aplicación web desarrollada con Angular, FastAPI y MySQL para la gestión de productos, servicios, sugerencias y reportes administrativos.

---

## 📌 Estado del proyecto

🟢 **Avance actual:** 80% aproximadamente  
🎯 **Proyecto:** Final Ordinario ParNet Ingeniería  
👨‍💻 **Autor:** Roberto Moreno  

---

## 🧰 Tecnologías

### Frontend
- Angular
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- SQLAlchemy ORM
- Uvicorn

### Base de datos
- MySQL / MariaDB
- Navicat Premium

### Reportes y archivos
- ReportLab para PDF
- OpenPyXL para Excel
- Carga de imágenes en productos

---

## ✅ Funcionalidades implementadas

### Productos
- CRUD completo
- Búsqueda dinámica
- Subida de imágenes
- PDF individual por producto
- Reporte general en PDF
- Reporte general en Excel
- Estatus: Existencia / Agotado

### Sugerencias
- Formulario público con captcha
- Registro en base de datos
- Panel administrativo
- Cambio de estatus
- Eliminación
- Paginación
- Exportación PDF y Excel

### Administración
- Login de administrador
- Consumo de API REST
- Panel administrativo
- Dashboard general básico

---

## 🧩 Funcionalidades pendientes

### Alta prioridad
- Dashboard con gráficas
- Módulo completo de servicios
- Noticias dinámicas
- Contador de visitas

### Media prioridad
- Formulario de contacto
- JWT real
- Mejoras responsivas

### Baja prioridad
- Slider en home
- Video explicativo
- Sección de clientes

---

## 🏗️ Arquitectura

El sistema utiliza una arquitectura cliente-servidor:

```txt
Angular Frontend  →  FastAPI Backend  →  MySQL Database

El backend está organizado por:

backend/
├── models/
├── routes/
├── schemas/
├── services/
├── static/
└── main.py

El frontend está organizado por:

frontend-clean/
└── src/app/
    ├── admin-productos/
    ├── admin-sugerencias/
    ├── dashboard/
    ├── login/
    ├── sugerencias/
    └── services/
▶️ Cómo ejecutar
Backend
uvicorn backend.main:app --reload

Documentación API:

http://127.0.0.1:8000/docs
Frontend
cd frontend-clean
npm install
ng serve

Aplicación web:

http://localhost:4200
📡 Endpoints principales
Autenticación
POST /api/login
Productos
GET    /api/productos
POST   /api/productos
PUT    /api/productos/{id}
DELETE /api/productos/{id}
GET    /api/productos/buscar/?q=
GET    /api/productos/{id}/pdf
GET    /api/productos/reporte/pdf
GET    /api/productos/reporte/excel
Sugerencias
GET    /api/sugerencias
POST   /api/sugerencias
PUT    /api/sugerencias/{id}
DELETE /api/sugerencias/{id}
GET    /api/sugerencias/reporte/pdf
GET    /api/sugerencias/reporte/excel
Dashboard
GET /api/dashboard/general
GET /api/dashboard/productos
GET /api/dashboard/servicios
📄 Entregables relacionados
Análisis de requerimientos
Diseño y arquitectura
Modelo físico de base de datos
Programación
Pruebas
Implementación
Diagrama de Gantt
👨‍💻 Autor

Roberto Moreno
Ingeniería en Sistemas Computacionales