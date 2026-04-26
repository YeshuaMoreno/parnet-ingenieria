🚀 ParNet Ingeniería - Sistema Web

Aplicación web completa desarrollada para la materia de Desarrollo Web, integrando frontend, backend y base de datos bajo una arquitectura moderna.

📌 Basado en los requisitos del proyecto académico

🧠 Tecnologías utilizadas
🔵 Frontend
Angular (Standalone Components)
Tailwind CSS
TypeScript
🟣 Backend
FastAPI
SQLAlchemy (ORM)
Uvicorn
🟢 Base de Datos
MySQL / MariaDB (Navicat)
📦 Otros
ReportLab (PDF)
OpenPyXL (Excel)
Manejo de imágenes
🏗️ Arquitectura
Cliente - Servidor
API REST desacoplada
Patrón tipo MVC (Angular + FastAPI)
ORM con SQLAlchemy
Código modular y buenas prácticas
🔐 Autenticación
Login de administrador
Manejo de roles (admin)
Protección de rutas en frontend
📦 Módulos implementados
🟢 Productos (COMPLETO)
CRUD completo
Búsqueda dinámica
Subida de imágenes
PDF individual por producto
Reporte PDF general
Reporte Excel
Dashboard:
Total
Existencia
Agotado
Por categoría
🟢 Sugerencias (FUNCIONAL)
Registro de sugerencias
Panel administrativo
Cambio de estatus
Eliminación
Exportación a PDF y Excel
Paginación básica
🟡 Servicios (EN PROCESO)
Modelo creado
API parcial
Pendiente:
Formulario público
Dashboard
🟡 Noticias (EN PROCESO)
API creada
Pendiente:
Consumo en frontend
Render dinámico
🟡 Dashboard General (PARCIAL)
Dashboard de productos funcionando
Pendiente:
Servicios
Vista global con gráficas
🟡 Visitas (PENDIENTE)
Endpoint creado
Pendiente:
Contador en frontend
Usuarios conectados
📊 Funcionalidades clave
CRUD completo de productos
Subida de imágenes
Exportación PDF y Excel
Búsqueda dinámica
Panel administrativo
API REST funcional
ORM implementado
Separación frontend / backend
📁 Estructura del proyecto
backend/
 ├── models/
 ├── routes/
 ├── schemas/
 ├── services/
 ├── static/
 └── main.py

frontend-clean/
 ├── src/app/
 │   ├── admin-productos/
 │   ├── admin-sugerencias/
 │   ├── dashboard/
 │   ├── login/
 │   └── services/
▶️ Cómo ejecutar
Backend
uvicorn backend.main:app --reload

📍 http://127.0.0.1:8000/docs

Frontend
cd frontend-clean
npm install
ng serve

📍 http://localhost:4200

📌 Pendiente para completar
🔥 Alta prioridad
Dashboard con gráficas (Chart.js)
Módulo completo de servicios
Noticias dinámicas
Contador de visitas
🟠 Media
Formulario de contacto
Mejorar UI responsiva
JWT real (no fake)
🟡 Baja
Video explicativo
Slider en home
Sección clientes
👨‍💻 Autor

Roberto Moreno
Ingeniería en Sistemas Computacionales

🧠 Estado del proyecto

🟢 Aproximadamente 80% completo
