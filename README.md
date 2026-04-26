ParNet Ingeniería - Sistema Web

Proyecto desarrollado como aplicación web completa para la materia de Desarrollo Web, integrando frontend, backend y base de datos bajo arquitectura moderna.

Basado en los requisitos del proyecto académico

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
Manejo de archivos (imágenes)
🏗️ Arquitectura
Arquitectura Cliente-Servidor
API REST desacoplada
Patrón tipo MVC (Angular + FastAPI)
ORM con SQLAlchemy
Uso de buenas prácticas y modularización
🔐 Autenticación
Login de administrador
Manejo de roles (admin)
Protección de rutas en frontend
📦 Módulos implementados
🟢 Productos (COMPLETO ✅)
CRUD completo
Búsqueda dinámica
Subida de imágenes
Generación de PDF individual
Reporte PDF general
Reporte Excel
Dashboard de productos:
Total
Existencia
Agotado
Por categoría
🟡 Sugerencias (COMPLETO FUNCIONAL ✅)
Registro de sugerencias
Listado en panel admin
Cambio de estatus (Pendiente / Revisada)
Eliminación
Exportación:
Excel
PDF
Paginación básica
🟡 Servicios (EN PROCESO ⚠️)
Modelo creado
API parcialmente implementada
Pendiente:
Formulario público
Dashboard por tipo de servicio
🟡 Noticias (EN PROCESO ⚠️)
Modelo creado
API creada
Pendiente:
Consumo en frontend
Render dinámico tipo "blog"
🟡 Dashboard General (PARCIAL ⚠️)
Dashboard de productos funcionando
Pendiente:
Dashboard de servicios
Dashboard global con gráficas
🟡 Visitas (PENDIENTE ⚠️)
Endpoint creado
Pendiente:
Contador en frontend
Usuarios conectados
📊 Funcionalidades clave

✔ CRUD completo de productos
✔ Subida de imágenes
✔ Exportación PDF y Excel
✔ Búsqueda dinámica
✔ Panel administrativo
✔ API REST funcional
✔ ORM implementado
✔ Separación frontend/backend

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

👉 http://127.0.0.1:8000/docs

Frontend
cd frontend-clean
npm install
ng serve

👉 http://localhost:4200

📌 Pendiente para completar al 100%

Según la rúbrica oficial:

🔥 PRIORIDAD ALTA
 Dashboard con gráficas (Chart.js)
 Módulo completo de Servicios (formulario + dashboard)
 Noticias dinámicas en frontend
 Contador de visitas
 Usuarios conectados
🟠 MEDIA
 Formulario de contacto (correo)
 Mejorar UI responsiva
 Validaciones más robustas
 Manejo real de JWT (no fake)
🟡 BAJA
 Video explicativo (2-4 min)
 Slider en home
 Sección clientes con logos
🧪 Evaluación (criterios importantes)

✔ Programación orientada a objetos
✔ Uso de ORM
✔ API REST funcional
✔ Buenas prácticas
✔ Estructura limpia
✔ Integración completa frontend-backend

👨‍💻 Autor

Roberto Moreno
Ingeniería en Sistemas Computacionales