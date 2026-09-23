# RetroWave

**Música · Ropa · Identidad**

Proyecto de una tienda de indumentaria inspirada en la música, desarrollado para Taller de Desarrollo Web 2026.

## Índice

- [Autores](#autores)
- [Contenido](#contenido)
- [Tecnologías](#tecnologías)
- [Cómo abrir el sitio](#cómo-abrir-el-sitio)
- [Estructura](#estructura)
- [Diseño](#diseño)
- [GitHub y publicación](#github-y-publicación)
- [Estado de la entrega](#estado-de-la-entrega)

## Autores

- Albarracin
- Garcia
- Terpin

Se utilizan los apellidos que identifican al grupo en el repositorio de Classroom.

## Contenido

| Página | Contenido |
| --- | --- |
| [Inicio](primera-entrega/index.html) | Presentación, productos destacados y estilos musicales |
| [Remeras](primera-entrega/tienda.html) | Catálogo de 12 remeras y controles de filtros |
| [Buzos](primera-entrega/buzos.html) | Catálogo de 12 buzos y controles de filtros |
| [Productos](primera-entrega/productos.html) | Detalle de cada producto |
| [Accesorios](primera-entrega/accesorios.html) | Tote bag del prototipo |
| [Nosotros](primera-entrega/nosotros.html) | Historia, valores y colecciones |
| [Carrito](primera-entrega/carrito.html) | Tres productos de ejemplo y resumen de importes |
| [Carrito vacío](primera-entrega/carrito-vacio.html) | Estado alternativo del carrito |
| [Mi cuenta](primera-entrega/cuenta.html) | Estructura del acceso a cuentas |
| [Contacto](primera-entrega/contacto.html) | Formulario de consulta y preguntas frecuentes |

## Tecnologías

| Tecnología | Uso actual |
| --- | --- |
| HTML5 | Estructura, navegación, formularios, tablas e imágenes |
| Markdown | Documentación del proyecto |
| Git y GitHub | Versionado y colaboración |
| GitHub Actions | Configuración preparada para publicar con GitHub Pages |
| CSS | Archivo vacío reservado para la siguiente etapa |
| JavaScript | Archivo vacío reservado para la siguiente etapa |

La web todavía utiliza la apariencia predeterminada del navegador. Los archivos `css/estilos.css` y `js/main.js` no están enlazados ni implementados. La fuente **DM Sans** se incluye localmente con su licencia y se aplicará al desarrollar CSS.

## Cómo abrir el sitio

Abrí `primera-entrega/index.html` en un navegador. También podés abrir esta carpeta en Visual Studio Code. No hace falta instalar dependencias: las imágenes están guardadas dentro del proyecto.

### Funciones disponibles

Podés navegar entre páginas, seguir los enlaces a secciones, completar el formulario de práctica y restablecer sus campos. Los catálogos muestran todos los productos y permiten seleccionar opciones de muestra.

### Funciones pendientes

Filtros, ordenamiento, cantidades, carrito dinámico, compras, descuentos, inicio de sesión, suscripciones y envío de mensajes. Los botones que dependen de esas funciones permanecen deshabilitados. Los campos de contraseña tampoco están habilitados.

## Estructura

```text
README.md
.gitignore
.github/workflows/pages.yml
primera-entrega/
    index.html
    tienda.html
    buzos.html
    productos.html
    accesorios.html
    nosotros.html
    carrito.html
    carrito-vacio.html
    cuenta.html
    contacto.html
    imagenes/
    fuentes/
    css/estilos.css
    js/main.js
    Sketch/README.md
    Mockup/README.md
    REVISION-HTML.md
    Requerimientos.md
segunda-entrega/
    Requerimientos.md
```

## Diseño

- [Prototipo de Canva](https://canva.link/nj6srhxjpvdix0j).
- [Pendientes de Sketch](primera-entrega/Sketch/README.md).
- [Pendientes de Mockup](primera-entrega/Mockup/README.md).
- [Fuentes de las imágenes](primera-entrega/imagenes/FUENTES.md).

El HTML fue escrito para este proyecto, sin descargar una plantilla de sitio. Las páginas repetidas de “Nosotros” del prototipo se unificaron. Los precios e imágenes son de muestra; el prototipo tiene diferencias de precios entre inicio, catálogos y carrito, que deben unificarse antes de implementar la compra.

## GitHub y publicación

- [Repositorio de Classroom](https://github.com/TryToFindMeg/Proyecto2026-Albarracin-Garcia-Terpin).
- **GitHub Pages: pendiente de habilitar por la persona administradora del repositorio.**
- [Dirección prevista del sitio](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/). Este enlace todavía no confirma una publicación activa.

La cuenta utilizada en esta revisión tiene permisos para subir código, pero no para administrar el repositorio. Para completar la publicación, una persona administradora debe abrir **Settings → Pages → Build and deployment → Source → GitHub Actions**. Después se debe integrar la revisión en `main` y ejecutar el flujo **Publicar RetroWave en GitHub Pages**. El flujo publica únicamente el contenido de `primera-entrega` y lo presenta desde su `index.html`.

### Ramas y commits

Se preparan las ramas `albarracin`, `garcia` y `terpin` para que cada integrante trabaje en la suya. Los nombres de las ramas no acreditan aportes de sus integrantes: cada persona debe realizar y registrar su propio trabajo.

Usar mensajes de [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/), por ejemplo:

- `feat: agregar estructura del formulario de contacto`
- `fix: corregir enlaces del catálogo`
- `docs: actualizar revisión de requisitos`

El requisito de **10 commits distribuidos en al menos 4 días** todavía está pendiente. Se debe cumplir con avances reales del proyecto; no se cambian fechas ni se inventan contribuciones.

## Estado de la entrega

La estructura HTML, las imágenes y la accesibilidad básica se revisaron contra [Requerimientos.md](primera-entrega/Requerimientos.md). Consultá [REVISION-HTML.md](primera-entrega/REVISION-HTML.md) para ver el detalle de lo corregido y lo pendiente.

**No es una entrega completa del parcial:** faltan Sketch/Mockup exportados, publicación efectiva, historial de trabajo requerido, aplicar la fuente, desarrollar CSS y JavaScript y documentar las funciones futuras.
