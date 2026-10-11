# RetroWave

**Música · Ropa · Identidad**

Proyecto de una tienda de ropa y accesorios inspirados en la música, desarrollado para Taller de Desarrollo Web 2026. La etapa actual comprende HTML, CSS para escritorio y JavaScript.

## Índice

- [Integrantes](#integrantes)
- [Contenido del sitio](#contenido-del-sitio)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Diseño](#diseño)
- [Cómo abrir el sitio](#cómo-abrir-el-sitio)
- [Estado del proyecto](#estado-del-proyecto)
- [HTML, CSS y JavaScript](#html-css-y-javascript)
- [Datos del catálogo](#datos-del-catálogo)
- [Pruebas](#pruebas)
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
| [Productos](primera-entrega/productos.html) | Catálogo general con filtros por categoría, género y artista, y ordenamiento. |
| [Fichas de productos](primera-entrega/productos/remera-highway-grooves.html) | Una página por producto, con imagen, precio, descripción y selección de talle, color y cantidad. |
| [Nosotros](primera-entrega/nosotros.html) | Historia e identidad de la marca. |
| [Carrito](primera-entrega/carrito.html) | Productos elegidos, cantidades, descuentos y total de compra. |
| [Carrito vacío](primera-entrega/carrito-vacio.html) | Pantalla del carrito sin productos. |
| [Mi cuenta](primera-entrega/cuenta.html) | Formularios de ingreso, registro y recuperación de contraseña. |
| [Contacto](primera-entrega/contacto.html) | Formulario de consulta y preguntas frecuentes. |

## Tecnologías utilizadas

- **HTML5:** estructura de las páginas, enlaces, imágenes, tablas y formularios.
- **CSS3:** colores, tipografías, formularios y distribución con Flexbox y Grid.
- **JavaScript:** funciones flecha, eventos, arrays, filtros, cálculos y validaciones.
- **localStorage:** conservación del carrito, del descuento y del email si se elige Recordarme.
- **Google Fonts:** Shrikhand para títulos y DM Sans para los textos.
- **Markdown:** documentación del proyecto.
- **Git y GitHub:** control de versiones y trabajo en equipo.

## Diseño

El sitio toma como referencia el [diseño de RetroWave en Canva](https://canva.link/nj6srhxjpvdix0j). Las imágenes utilizadas se encuentran en la carpeta `primera-entrega/imagenes`.

## Cómo abrir el sitio

1. Descargar o clonar el repositorio.
2. Abrir la carpeta `primera-entrega`.
3. Abrir `index.html` con un servidor local, por ejemplo Live Server, y navegar desde esa misma dirección.

No es necesario instalar dependencias. La carpeta de imágenes debe mantenerse junto a los archivos HTML para que las fotos se vean correctamente.

Usá siempre el mismo servidor, dirección y puerto para conservar el carrito entre páginas. El comportamiento de localStorage al abrir archivos con `file://` depende del navegador; por eso las pruebas se realizan con un servidor local.

## Estado del proyecto

### HTML, CSS y JavaScript

Las páginas incluyen navegación, metadatos, etiquetas semánticas, imágenes con texto alternativo y formularios con etiquetas asociadas a sus campos. El carrito utiliza una tabla con título y encabezados.

Las 36 páginas utilizan archivos JavaScript externos. Las funciones son flecha y tienen documentación JSDoc. Los eventos que llaman a las funciones están en el HTML.

Los filtros mantienen la categoría actual y permiten seleccionar género, artista, precio, disponibilidad, color y talle. En Todos los productos se puede elegir también una categoría. Se puede ordenar por precio o nombre, limpiar las preferencias y ver un mensaje cuando no hay coincidencias. Los enlaces por género del inicio abren el catálogo filtrado.

Cada ficha permite agregar un producto al carrito con talle, color y cantidad. La misma combinación acumula unidades y una combinación distinta queda en otra fila. Se permiten entre 1 y 10 unidades por combinación y no se agregan productos agotados. El contador de la navegación muestra las unidades elegidas.

El carrito conserva su contenido al navegar y recargar. Se pueden actualizar cantidades, restablecerlas a una unidad, eliminar filas y vaciarlo con confirmación. El código **RETRO10** aplica un descuento de ejemplo del 10 %. Subtotales, descuento y total se recalculan según las cantidades. El envío no está incluido. Ver resumen de prueba muestra el importe sin generar pedidos ni pagos. Las dos vistas de carrito vacío comparten una tarjeta centrada con una imagen circular de vinilo y enlaces al catálogo.

Los formularios validan campos obligatorios, emails y contraseñas de entre 8 y 64 caracteres, que deben coincidir en el registro. Los errores se muestran en diálogos y se limpia el campo incorrecto.

**Ingreso, registro, recuperación, contacto y suscripción son demostraciones de validación.** No crean cuentas ni envían mensajes o correos. Recordarme guarda solamente el email; las contraseñas no se almacenan.

Las páginas comparten el archivo `primera-entrega/css/estilos.css`. El diseño está pensado para escritorio y toma los colores del Canva. La barra superior permanece visible al desplazarse y los enlaces a secciones dejan espacio para que sus títulos no queden tapados. Las fuentes de Google Fonts requieren conexión a Internet.

Cada enlace «Ver producto» abre una ficha individual dentro de `primera-entrega/productos`. El catálogo general contiene las 26 tarjetas y cada ficha permite volver a su catálogo.

| Archivo JavaScript | Contenido |
| --- | --- |
| `js/datos-productos.js` | Datos de los 26 productos. |
| `js/funciones.js` | Precios, almacenamiento, validación numérica, contador y avisos. |
| `js/catalogo.js` | Filtros, ordenamiento y controles de las fichas. |
| `js/carrito.js` | Agregar, actualizar, eliminar, vaciar y calcular importes. |
| `js/formularios.js` | Validaciones de cuenta, contacto y novedades. |

## Datos del catálogo

El catálogo contiene **26 productos con 26 fotos diferentes y 22 artistas o bandas**. Las fotografías fueron aportadas para el proyecto y están guardadas dentro de `primera-entrega/imagenes` con nombres representativos.

Los nombres, descripciones, texto alternativo y colores corresponden a las prendas que aparecen en esas imágenes. Se muestran remeras y buzos de AC/DC, Radiohead, Nirvana, Queen, The Beatles y otras bandas, una campera de Guns N' Roses y una tote bag de My Chemical Romance.

Los filtros agrupan las prendas en Rock, Pop / rock, Indie, Rock alternativo, Rock clásico, Metal, Punk y Grunge. Son categorías de navegación para el catálogo; un artista puede abarcar más de un estilo. Las búsquedas de AC/DC y Guns N' Roses también aceptan el nombre sin barra o apóstrofo.

**Precios, talles y disponibilidad siguen siendo datos de demostración.** Se conservaron los valores del ejercicio. Las opciones de color muestran la familia de color que se ve en cada fotografía; no se ofrecen variantes de color que no estén representadas.

Los datos se mantienen en `primera-entrega/js/datos-productos.js`. Los identificadores y los nombres de archivo de las fichas se conservan para no romper enlaces ni referencias del carrito, aunque el nombre visible del producto haya cambiado.

## Pruebas

- Filtrar Metal o Grunge dentro de Remeras y comprobar que se conserve la categoría. Pop / rock muestra la remera de The 1975.
- Combinar artista, precio, disponibilidad, color y talle; probar preferencias sin coincidencias y limpiarlas.
- Ordenar por precio y nombre.
- Ingresar precios negativos o un máximo menor que el mínimo.
- Agregar varias veces el mismo producto y elegir otro talle para comprobar variantes distintas.
- Probar cantidades vacías, cero, negativas, decimales o mayores a 10.
- Recargar el carrito y verificar los productos, cantidades y descuento.
- Aplicar RETRO10, probar un código incorrecto y quitar el descuento dejando el campo vacío.
- Actualizar cantidades, eliminar un producto y cancelar o confirmar el vaciado.
- Probar formularios vacíos, emails incorrectos y contraseñas que no coinciden.
- Comprobar imágenes, navegación y ausencia de errores en la consola.

## GitHub Pages

La dirección del sitio, una vez configurada la publicación desde la raíz de `main`, es [RetroWave en GitHub Pages](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/primera-entrega/).
