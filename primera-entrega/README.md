# RetroWave

**Música · Ropa · Identidad**

Proyecto de una tienda de ropa y accesorios inspirados en la música, desarrollado para Taller de Desarrollo Web 2026. La etapa actual comprende la estructura en HTML y el diseño con CSS para escritorio.

## Índice

- [Integrantes](#integrantes)
- [Contenido del sitio](#contenido-del-sitio)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Diseño](#diseño)
- [Cómo abrir el sitio](#cómo-abrir-el-sitio)
- [Estado del proyecto](#estado-del-proyecto)
- [HTML](#html)
- [GitHub Pages](#github-pages)

## Integrantes

- Albarracin
- Garcia
- Terpin

## Contenido del sitio

| Página | Contenido |
| --- | --- |
| [Inicio](primera-entrega/index.html) | Presentación de RetroWave, productos destacados y estilos musicales. |
| [Tienda](primera-entrega/tienda.html) | Catálogo de remeras y controles para filtrar productos. |
| [Buzos](primera-entrega/buzos.html) | Catálogo de buzos y controles para filtrar productos. |
| [Accesorios](primera-entrega/accesorios.html) | Catálogo de accesorios y controles para filtrar productos. |
| [Productos](primera-entrega/productos.html) | Catálogo general y controles visuales de filtros por categoría, género y artista. |
| [Fichas de productos](primera-entrega/productos/remera-highway-grooves.html) | Una página por producto, con imagen, precio, descripción y selección de talle, color y cantidad. |
| [Nosotros](primera-entrega/nosotros.html) | Historia e identidad de la marca. |
| [Carrito](primera-entrega/carrito.html) | Productos de ejemplo, cantidades y resumen de compra. |
| [Carrito vacío](primera-entrega/carrito-vacio.html) | Pantalla del carrito sin productos. |
| [Mi cuenta](primera-entrega/cuenta.html) | Formularios de ingreso, registro y recuperación de contraseña. |
| [Contacto](primera-entrega/contacto.html) | Formulario de consulta y preguntas frecuentes. |

## Tecnologías utilizadas

- **HTML5:** estructura de las páginas, enlaces, imágenes, tablas y formularios.
- **CSS3:** colores, tipografías, formularios y distribución con Flexbox y Grid.
- **Google Fonts:** Shrikhand para títulos y DM Sans para los textos.
- **Markdown:** documentación del proyecto.
- **Git y GitHub:** control de versiones y trabajo en equipo.

## Diseño

El sitio toma como referencia el [diseño de RetroWave en Canva](https://canva.link/nj6srhxjpvdix0j). Las imágenes utilizadas se encuentran en la carpeta `primera-entrega/imagenes`.

## Cómo abrir el sitio

1. Descargar o clonar el repositorio.
2. Abrir la carpeta `primera-entrega`.
3. Abrir `index.html` con un navegador.

No es necesario instalar dependencias. La carpeta de imágenes debe mantenerse junto a los archivos HTML para que las fotos se vean correctamente.

## Estado del proyecto

### HTML y CSS

Las páginas incluyen navegación, metadatos, etiquetas semánticas, imágenes con texto alternativo y formularios con etiquetas asociadas a sus campos. El carrito utiliza una tabla con título y encabezados.

Se puede navegar entre las páginas, completar campos, seleccionar opciones y restablecer los formularios. El carrito muestra importes fijos; el enlace al carrito vacío permite ver esa pantalla, pero no elimina productos.

Los botones de filtros, compras, cuentas, suscripción y envío de consultas están deshabilitados porque sus funciones todavía no están implementadas. También quedan pendientes las acciones de actualizar, eliminar y vaciar el carrito.

Los catálogos incluyen controles visuales de género musical y artista o banda. El catálogo general también permite seleccionar una categoría. Estas opciones todavía no filtran los productos; la selección por género del inicio queda deshabilitada hasta implementar su funcionamiento.

Las páginas comparten el archivo `primera-entrega/css/estilos.css`. El diseño está pensado para escritorio y toma los colores del Canva. Las fuentes de Google Fonts requieren conexión a Internet.

Cada enlace «Ver producto» abre una ficha individual dentro de `primera-entrega/productos`. El catálogo general contiene las 26 tarjetas y cada ficha permite volver a su catálogo.

**JavaScript se agregará en la próxima etapa.**

## GitHub Pages

La publicación todavía no está habilitada. La dirección prevista, publicando desde la raíz de `main`, es [RetroWave en GitHub Pages](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/primera-entrega/).
