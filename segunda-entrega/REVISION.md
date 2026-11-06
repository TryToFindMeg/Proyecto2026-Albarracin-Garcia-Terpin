# Revisión de la segunda entrega

Revisión local: 5 de noviembre de 2026. Fuentes: Requerimientos.md aportado por el equipo y
[consignas de la profesora](https://ucc-tallerdesarrolloweb.github.io/filminas/Proyecto.html#/).
El documento original de requisitos se conserva sin cambios. Esta lista describe la copia local completa de etapa 5;
la integración en GitHub debe comprobarse después de unir los aportes.

## HTML y accesibilidad

| Revisión                                         | Resultado local                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Estructura semántica, título y h1 de cada página | Rutas principales y vistas inexistentes con título y un h1.                                            |
| Labels, alt e identificadores                    | Sin controles sin etiqueta, imágenes sin alt ni IDs duplicados en las vistas recorridas.               |
| HTML generado                                    | Nu HTML Checker sin errores en diez vistas principales y la vista de error de API.                     |
| Enlaces a secciones                              | Un componente compartido genera URLs válidas con ?seccion= y mueve el foco.                            |
| Teclado                                          | Saltar al contenido enfoca main; Volver arriba y Envíos enfocan su destino; Escape cancela el diálogo. |
| Contraste                                        | Combinaciones principales comprobadas entre 5.55:1 y 13.62:1; botón secundario con foco legible.       |

Se corrigió el doble # que producían los enlaces a secciones y se asignó role=status al contador.
El contraste mínimo de texto normal de referencia es 4.5:1 según
[WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
Son comprobaciones básicas: no equivalen a una auditoría completa con lector de pantalla ni a certificación WCAG.

## CSS / Sass

| Requisito                      | Evidencia                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Estilos .scss dentro de styles | Módulos en src/styles; no hay CSS antiguo de la segunda entrega en public.                             |
| Import con alias               | main.jsx importa @styles/estilos.scss.                                                                 |
| Variables y organización       | _variables.scss y módulos conectados con @use.                                                         |
| Diseño consistente             | Se conserva el diseño de escritorio, las fuentes retro, la navbar fija y el estado vacío del carrito.  |
| Corrección de hover            | Las reglas de hover/focus mantienen fondo y color de texto; se comprobó el botón con foco por teclado. |

El alcance de diseño acordado con el equipo es escritorio. No se presenta como una adaptación para celulares.

## React, JavaScript y datos

| Requisito                                   | Evidencia                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| Vite y React                                | package.json, vite.config.js y src/main.jsx.                                         |
| useState y useEffect                        | App, formularios, carrito y Layout.                                                  |
| useNavigate                                 | NoEncontrada permite volver con historial.                                           |
| react-router-dom y Outlet                   | Rutas de App y Layout compartido.                                                    |
| api, components, data, pages, styles, utils | Carpetas de src, más layouts y assets.                                               |
| Alias                                       | Imports del frontend con @/ y @styles/.                                              |
| Imagen en public y assets                   | Fotos estáticas en public e imagen de Inicio importada desde assets.                 |
| Validación onChange accesible               | Campo, Filtros y formularios controlados; mensajes asociados y foco al primer error. |
| Componente genérico reutilizado             | Boton, Tarjeta y Campo. Boton expone únicamente las propiedades usadas.              |
| localStorage                                | Carrito, descuento y preferencia de email; nunca contraseñas.                        |
| Servicio simulado y GET                     | json-server + src/data/db.json en desarrollo; mock JSON HTTP de lectura en el build. |
| fetch y async/await                         | src/api/productos.js.                                                                |
| Datos válidos                               | Campos, importes, opciones e IDs únicos revisados antes de renderizar y al compilar. |
| Catálogo y ficha compartidos                | Catalogo y Producto/FichaProducto; no una página por producto o categoría.           |
| Errores e imports innecesarios              | ESLint sin errores ni avisos y consola del compilado sin errores en el recorrido.    |

Se realizaron 25 comprobaciones adicionales de carrito, almacenamiento, validaciones, filtros, contrato HTTP
y publicación. Se probaron datos malformados usando una copia de db.json fuera del proyecto:
se muestra el error y el reintento recupera el catálogo al restaurar el servicio.

## Otros requisitos

| Requisito                       | Resultado                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| README actualizado              | README de raíz y de segunda-entrega con tecnologías, orden de ejecución y estado real.                      |
| Scripts                         | dev, services, check:datos, lint, format, build, preview y check.                                           |
| Vulnerabilidades                | npm audit: 0 dentro de segunda-entrega el 05/11/2026. Dependencias y lockfile sin cambios en esta etapa.    |
| Correcciones de primera entrega | Se mantienen la ficha y catálogo genéricos, contraste, carrito vacío y navbar fija.                         |
| Publicación                     | Build comprobado bajo /Proyecto2026-Albarracin-Garcia-Terpin/, con ambas entregas, fotos y JSON accesibles. |
| Workflow                        | Checks en PR/main y publicación solo manual desde main; no ejecutado todavía en GitHub.                     |
| Archivos innecesarios           | node_modules, dist y .env excluidos; se retiraron cinco .gitkeep de carpetas que ya contienen código.       |
| Trabajo en equipo               | Paquetes de diferencias y comandos separados para Emi, Clari y Octa; PR y revisiones a cargo del equipo.    |

La auditoría corresponde al package.json de segunda-entrega. No certifica proyectos npm antiguos de la raíz.

## Pendientes para cerrar la entrega

- [ ] Integrar en main los aportes completos de todas las etapas y ejecutar npm ci y npm run check sobre ese resultado.
- [ ] Revisar manualmente Chrome, Firefox y Edge: navegación, fotos, filtros, formularios, carrito y teclado.
- [ ] Configurar Pages con GitHub Actions y ejecutar el workflow manual desde main.
- [ ] Comprobar las direcciones públicas, recarga de rutas y catálogo desde otro equipo.
- [ ] Registrar aquí las versiones y resultados reales de esas pruebas y confirmar el último commit antes de la fecha límite.

| Navegador                    | Estado al preparar etapa 5                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| Navegador integrado de Codex | Probado en desarrollo y preview; no sustituye la prueba en los navegadores pedidos. |
| Chrome                       | Prueba manual pendiente.                                                            |
| Firefox                      | Prueba manual pendiente; no instalado durante este trabajo.                         |
| Edge                         | Prueba manual pendiente; no instalado durante este trabajo.                         |

No se hicieron commits, push, merges, cambios en la configuración de GitHub ni publicaciones durante la preparación.
