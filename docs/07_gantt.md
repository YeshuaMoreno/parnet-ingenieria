# 7. Diagrama de Gantt

```mermaid
gantt
    title Proyecto ParNet Ingeniería
    dateFormat  YYYY-MM-DD
    section Planeación
    Análisis de requerimientos :a1, 2026-03-01, 3d
    Diseño del sistema        :a2, after a1, 4d
    section Desarrollo
    Backend                   :a3, 2026-03-08, 5d
    Frontend                  :a4, after a3, 5d
    section Final
    Integración               :a5, 2026-03-18, 2d
    Pruebas                   :a6, after a5, 2d
    Documentación             :a7, after a6, 2d