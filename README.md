# 🚀 ParNet Ingeniería - Sistema Web

![Angular](https://img.shields.io/badge/Frontend-Angular-red)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)
![Status](https://img.shields.io/badge/Status-80%25%20Complete-yellow)

---

> Aplicación web completa desarrollada con Angular + FastAPI + MySQL  
> para la gestión de productos, servicios, sugerencias y reportes administrativos.

---

## 📌 Estado del proyecto

- 🟢 **Productos** → COMPLETO
- 🟢 **Sugerencias** → FUNCIONAL
- 🟡 **Dashboard** → PARCIAL
- 🟠 **Servicios** → EN PROCESO
- 🔴 **Noticias** → PENDIENTE

---

## 🧰 Tecnologías

### 🎨 Frontend
- Angular (Standalone Components)
- TypeScript
- Tailwind CSS

### ⚙️ Backend
- FastAPI
- SQLAlchemy (ORM)
- Uvicorn

### 🗄️ Base de Datos
- MySQL / MariaDB (Navicat)

### 📦 Otros
- ReportLab (PDF)
- OpenPyXL (Excel)
- Manejo de imágenes

---

## 🏗️ Arquitectura

Sistema basado en arquitectura **Cliente - Servidor**:


Angular (Frontend) → FastAPI (Backend) → MySQL (Database)


### Backend


backend/
├── models/
├── routes/
├── schemas/
├── services/
├── static/
└── main.py


### Frontend


frontend-clean/
└── src/app/
├── admin-productos/
├── admin-sugerencias/
├── dashboard/
├── login/
├── sugerencias/
└── services/


---

## ⚙️ Funcionalidades principales

### 📦 Productos
- CRUD completo
- Subida de imágenes
- Búsqueda dinámica
- Generación de PDF individual
- Reporte general en PDF y Excel
- Dashboard por categorías

### 💬 Sugerencias
- Registro desde frontend
- Panel administrativo
- Cambio de estatus (Pendiente / Revisada)
- Eliminación
- Exportación PDF y Excel

### 📊 Dashboard
- Total de registros
- Productos en existencia / agotados
- Conteo por categorías

---

## 🔗 API Endpoints

### 📦 Productos
```bash
GET    /api/productos
POST   /api/productos
PUT    /api/productos/{id}
DELETE /api/productos/{id}
GET    /api/productos/buscar?q=
GET    /api/productos/{id}/pdf
GET    /api/productos/reporte/pdf
GET    /api/productos/reporte/excel
💬 Sugerencias
GET    /api/sugerencias
POST   /api/sugerencias
PUT    /api/sugerencias/{id}
DELETE /api/sugerencias/{id}
GET    /api/sugerencias/reporte/pdf
GET    /api/sugerencias/reporte/excel
📊 Dashboard
GET /api/dashboard/general
GET /api/dashboard/productos
GET /api/dashboard/servicios
▶️ Cómo ejecutar el proyecto
🔹 Backend
uvicorn backend.main:app --reload

📌 Documentación automática:

http://127.0.0.1:8000/docs
🔹 Frontend
cd frontend-clean
npm install
ng serve

📌 Aplicación:

http://localhost:4200
🚧 Pendiente por completar
Dashboard con gráficas (Chart.js)
Módulo completo de servicios
Sistema de noticias dinámicas
Contador de visitas
Autenticación real con JWT (no fake)
Mejora de UI responsiva
Página pública (landing / home)
👨‍💻 Autor

Roberto Moreno
Ingeniería en Sistemas Computacionales

⭐ Notas

Este proyecto fue desarrollado como parte del Proyecto Final Ordinario - ParNet Ingeniería, integrando frontend moderno, backend robusto y buenas prácticas de desarrollo.