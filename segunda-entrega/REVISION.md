# Revisión final de la segunda entrega

Revisión local del 5 de noviembre de 2026, posterior a la etapa 5. Se contrastó la copia completa con
[las consignas del segundo parcial](https://ucc-tallerdesarrolloweb.github.io/filminas/Proyecto.html#/)
y con Requerimientos.md aportado por el equipo, que se conserva sin cambios.

La copia local cumple los requisitos técnicos comprobados. Se encontraron y corrigieron fallos de foco
y de validación de precios; las comprobaciones posteriores pasaron. La integración de los fixes en main,
la revisión en otros navegadores y el despliegue público se verifican por separado al finalizar los PR.

## 1. HTML y accesibilidad

| Aspecto revisado         | Resultado y evidencia                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Estructura semántica     | header, nav, main, section, formularios y footer compartidos mediante JSX.                                        |
| Títulos y encabezados    | Las doce rutas generales recorridas tienen título y un h1; incluyen 404 y producto inexistente.                   |
| Campos e imágenes        | Controles con label, imágenes con alt, ayudas y errores asociados; sin IDs duplicados en las vistas revisadas.    |
| HTML válido              | Nu HTML Checker sin errores en 41 vistas generadas: 26 fichas, 12 rutas y tres estados de error.                  |
| Navegación por secciones | EnlaceSeccion usa ?seccion=, preserva la categoría y mueve el foco sin generar un segundo #.                      |
| Teclado                  | Saltar al contenido enfoca main; las acciones del carrito conservan un destino de foco válido.                    |
| Diálogos                 | dialog contiene el foco; Escape y Cancelar conservan compras; cerrar devuelve el foco al control correspondiente. |
| Contraste                | Combinaciones principales comprobadas de 5.55:1 a 13.62:1; botón secundario enfocado con texto legible.           |

Las comprobaciones de contraste utilizan la referencia de
[WCAG para contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
No constituyen una auditoría completa con lector de pantalla ni certificación WCAG.

## 2. CSS / Sass

| Requisito                    | Resultado                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Estilos dentro de styles     | Diez archivos .scss dentro de src/styles.                                                                             |
| Import mediante alias        | main.jsx importa @styles/estilos.scss; los módulos usan @use.                                                         |
| Estilos exclusivamente SCSS  | Sin CSS de aplicación fuera de styles ni estilos inline en los componentes. El CSS de dist es el resultado del build. |
| Consistencia visual          | Se conservan fuentes retro, paleta, tarjetas, formularios, navbar fija y carrito vacío.                               |
| Corrección anterior de hover | Las reglas de botones definen texto y fondo para hover/focus; el foco comprobado mantiene contraste.                  |

Se mantiene el alcance de escritorio indicado por el equipo. No hizo falta modificar Sass en esta revisión.

## 3. React, JavaScript y servicio

| Requisito de la segunda entrega | Implementación comprobada                                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React instalado con Vite        | package.json, vite.config.js, main.jsx y App.jsx.                                                                                                                         |
| useState                        | Estado de productos, carrito y formularios controlados.                                                                                                                   |
| useEffect                       | Consulta de productos, sincronización local, metadatos, foco y diálogo.                                                                                                   |
| useNavigate                     | NoEncontrada vuelve a Inicio mediante navegar("/").                                                                                                                       |
| react-router-dom                | HashRouter, Routes, Route, Link, NavLink y parámetros de catálogo/producto.                                                                                               |
| Outlet                          | Layout representa las rutas hijas con estructura compartida.                                                                                                              |
| Carpetas requeridas             | api, components, data, pages, styles y utils en src; también layouts y assets.                                                                                            |
| Imports con alias               | 85 imports locales del frontend comprobados con @/ y su ruta exacta, además del alias de estilos. Los scripts Node usan rutas relativas porque se ejecutan fuera de Vite. |
| Imagen en public y assets       | Fotos estáticas en public y presentación importada desde src/assets.                                                                                                      |
| Validaciones con onChange       | Cuenta, contacto, novedades, cantidades, cupón y filtros con mensajes accesibles.                                                                                         |
| Componente genérico reutilizado | Boton, Tarjeta y Campo se reutilizan en la interfaz.                                                                                                                      |
| localStorage                    | Variantes de compra, cupón y email elegido; no se guardan contraseñas.                                                                                                    |
| Propiedades e imports usados    | Revisión de 42 archivos JS/JSX y 132 imports sin usos sobrantes detectados; los nuevos identificadores y callbacks participan del manejo de foco.                         |
| json-server y db.json           | Mock en desarrollo con GET /productos; base de 26 productos.                                                                                                              |
| Una operación de servicio       | El catálogo y los precios se leen con GET. La consigna permite una acción; no exige implementar todas las operaciones CRUD.                                               |
| fetch y async/await             | obtenerProductos consulta por HTTP y valida su respuesta antes de renderizar.                                                                                             |
| Renderizado dinámico            | Un catálogo para todas las categorías y una ficha para cualquier identificador.                                                                                           |
| Corrección de duplicación       | No hay HTML distinto para cada categoría o producto en la segunda entrega.                                                                                                |

Se recorrieron las 26 fichas: nombre e imagen correctos, opciones disponibles y compra deshabilitada
en los dos productos agotados. Las 26 fotos de producto tienen contenido distinto.
Se comprobaron doce remeras, doce buzos, una campera, una tote bag, ocho géneros y 22 artistas.

El servicio se probó con una fixture fuera del proyecto: un registro incompleto provocó el aviso de error
sin borrar el carrito; quitar ese registro y reintentar recuperó la compra. Con el servicio apagado,
desarrollo muestra el error y la compilación sigue leyendo su mock público de productos.
src/data/db.json no se modificó durante estas pruebas.

### Fallos encontrados y corregidos

| Caso reproducido antes del fix                                                                   | Resultado corregido                                                                                                  |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Escribir e en un filtro de precio dejaba el campo sin error accesible y mantenía los resultados. | El texto se conserva y se valida con JavaScript; aparecen ayuda y error asociados y no se aplica un filtro inválido. |
| Confirmar cantidad o cupón inválido dejaba el foco en el botón.                                  | El foco pasa al campo que debe corregirse.                                                                           |
| Actualizar, restablecer o eliminar recreaba controles y enviaba el foco a body.                  | Se recupera el control por su identificador; al quitar la última fila se enfoca el contenido.                        |
| Vaciar o cerrar el resumen después de actualizar podía perder el control de regreso.             | El diálogo devuelve el foco a su botón; al quedar vacío se muestra y enfoca el contenido principal.                  |
| La documentación describía un regreso con historial en la página 404.                            | Se documentó el comportamiento real: volver a Inicio con useNavigate.                                                |

El nuevo helper de foco espera un cuadro de renderizado para que React termine de actualizar los controles.
Utiliza APIs del navegador, funciones flecha y los hooks ya presentes; no agrega librerías.
Las pruebas posteriores confirmaron compra, límites, descuentos, persistencia, filtros, registro,
ingreso, recuperación, contacto, novedades, teclado y recuperación de API.
Se ejecutaron además 27 casos de lógica, almacenamiento, contrato HTTP y publicación.

## 4. Documentación, herramientas y entrega

| Requisito                          | Resultado                                                                                                                                      |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| README con ejecución y tecnologías | README general y de React actualizados; instalación, dos terminales para desarrollo, check, build y preview.                                   |
| Scripts del proyecto y mock        | dev, services, check:datos, lint, format:check, format, check, build y preview.                                                                |
| Dependencias                       | npm audit: cero vulnerabilidades en segunda-entrega el 05/11/2026. No se agregaron paquetes ni cambió el lockfile.                             |
| Código y consola                   | ESLint, Prettier y build correctos; consola del compilado sin errores ni avisos en el recorrido.                                               |
| Correcciones de la primera entrega | Se conservan ficha/catálogo genéricos, navbar fija, contraste y presentación del carrito vacío.                                                |
| Recursos y publicación             | JSON, las 26 fotos y los bundles responden bajo el prefijo del repositorio; el build conserva la primera entrega.                              |
| Archivos innecesarios              | node_modules, dist y .env excluidos con .gitignore; el HTML, CSS y JS viejos ya no están en public.                                            |
| Control de cambios                 | Fixes separados de los paquetes de etapas 1 a 5. Sin commits ni publicaciones automáticas.                                                     |
| Fecha de entrega                   | El equipo debe integrar todos los cambios antes del límite indicado por la profesora; el estado local no sustituye el último commit en GitHub. |

La auditoría indicada corresponde a la aplicación de segunda-entrega. Los ejercicios o herramientas anteriores
de la raíz y la primera entrega se conservaron sin modificaciones de esta revisión.

## Pendientes para cerrar la entrega

- [x] Integrar las etapas 1 a 5 completas del equipo.
- [ ] Subir e integrar estos once archivos de fixes en un único PR de Octavio desde albarracin.
- [ ] Ejecutar npm ci y npm run check sobre el main resultante de todos los aportes.
- [ ] Probar manualmente Chrome, Firefox y Edge y registrar versión, fecha y resultados reales.
- [ ] Configurar Pages y ejecutar la publicación manual desde main según [PUBLICACION.md](PUBLICACION.md).
- [ ] Verificar las direcciones públicas, recarga de rutas, fotos y catálogo desde otro equipo.
- [ ] Confirmar el último commit completo dentro del plazo de entrega.

| Navegador                    | Estado de esta revisión                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| Navegador integrado de Codex | Probado en desarrollo y compilación; no reemplaza las pruebas en los navegadores pedidos. |
| Chrome                       | Revisión manual pendiente.                                                                |
| Firefox                      | Revisión manual pendiente; no se instaló durante el trabajo.                              |
| Edge                         | Revisión manual pendiente; no se instaló durante el trabajo.                              |

El workflow está preparado para revisar PR/main y publicar solo al ejecutarlo manualmente desde main.
La ejecución real de GitHub Actions y el sitio público no se modificaron ni se dieron por comprobados
durante esta revisión local.
