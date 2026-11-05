# RetroWave

**Música · Ropa · Identidad**

Proyecto de una tienda de ropa y accesorios inspirados en la música para Taller de Desarrollo Web 2026.

## Índice

- [Integrantes](#integrantes)
- [Estado de las entregas](#estado-de-las-entregas)
- [Ejecución de la segunda entrega](#ejecución-de-la-segunda-entrega)
- [Tecnologías](#tecnologías)
- [Contenido del sitio](#contenido-del-sitio)
- [Diseño](#diseño)
- [Pruebas](#pruebas)
- [Trabajo en equipo](#trabajo-en-equipo)

## Integrantes

- Octavio Albarracin.
- Emi Garcia.
- Clari Terpin.

## Estado de las entregas

| Ubicación | Estado |
| --- | --- |
| [primera-entrega](primera-entrega/index.html) | Versión anterior conservada. |
| [segunda-entrega](segunda-entrega/README.md) | Etapas 1, 2 y 3: Inicio, Nosotros, catálogo y ficha en React, conectados a la API. |
| [Sitio HTML con fixes](segunda-entrega/public/sitio-html/index.html) | Mantiene disponibles cuenta, contacto, suscripción y carrito durante la migración. |

La segunda entrega se desarrolla por etapas. Inicio, Nosotros, el catálogo y la ficha de producto
ya funcionan en React con una estructura compartida mediante Outlet. Un único catálogo muestra
todas las categorías y una ficha reutilizable muestra el producto elegido.
Los productos de Inicio, catálogo y ficha se obtienen con fetch y async/await desde json-server.
Los filtros conservan la categoría y quedan guardados en la URL al recargar o volver desde una ficha.
El carrito y los formularios siguen en HTML. La ficha React agrega productos al mismo localStorage
y actualiza el contador de la cabecera al comprar.

| Etapa | Contenido | Estado |
| --- | --- | --- |
| 1 | Vite, dependencias, alias, Sass y servicio simulado. | Preparada. |
| 2 | Inicio, Nosotros, estructura compartida, rutas y navegación con HTML. | Implementada. |
| 3 | Catálogo y ficha de producto en React, conectados a la API con fetch y async/await. | Implementada. |
| 4 | Carrito y formularios en React, persistencia y validación en tiempo real. | Pendiente. |
| 5 | Revisión final y preparación de la publicación. | Pendiente. |

## Ejecución de la segunda entrega

### Instalar dependencias

Se necesita una versión de Node.js compatible con `segunda-entrega/package.json` y npm.
Se comprobó el entorno con Node.js 26.10.0 y npm 12.2.0.

Desde la raíz del repositorio:

```powershell
cd segunda-entrega
npm ci
```

### Iniciar el servicio simulado

En una terminal ubicada en `segunda-entrega`:

```powershell
npm run services
```

La API queda en http://127.0.0.1:4000/productos y obtiene sus 26 productos de `src/data/db.json`.
Desde la etapa 3 este servicio es necesario para cargar los productos de React.

### Iniciar React

Abrir otra terminal en `segunda-entrega`:

```powershell
npm run dev
```

Abrir la dirección que muestre Vite, normalmente http://127.0.0.1:5173/.
Dejar ambas terminales abiertas. Para detenerlas, presionar Ctrl+C en cada una.
En PowerShell se puede usar `npm.cmd` en lugar de `npm`.
Live Server no procesa JSX: usar siempre el servidor de Vite para esta entrega.
Si la API está apagada, el sitio muestra un aviso y un botón para reintentar la carga.

Los archivos de configuración del proyecto React están junto a su `package.json`, dentro de `segunda-entrega`.
El README general y la carpeta `.git` pertenecen a la raíz del repositorio.
Consultar [la guía de React](segunda-entrega/README.md) para ver scripts, alias y estructura de carpetas.

## Tecnologías

- React y React DOM con JavaScript y JSX.
- Vite y el plugin oficial de React.
- React Router DOM con HashRouter, rutas hijas, Outlet, Link y NavLink.
- Sass con archivos `.scss` dentro de `src/styles`.
- json-server para simular el servicio de productos.
- ESLint y Prettier para revisión y formato del código.
- HTML5, CSS3 y JavaScript en el sitio corregido que se conserva durante la migración.
- fetch y async/await para consultar la API de productos.
- localStorage compartido por la ficha React y el carrito HTML durante la migración.
- Google Fonts: Shrikhand y DM Sans.
- Git, GitHub y Markdown.

## Contenido del sitio

El sitio incluye Inicio, catálogo por categorías, una ficha compartida de producto,
Nosotros, carrito, Mi cuenta y Contacto. El catálogo contiene 26 productos con fotografías locales,
22 artistas o bandas y 8 géneros musicales.

Los filtros conservan la categoría seleccionada. El carrito permite elegir talle y cantidad,
actualizar, eliminar o vaciar productos y aplicar el código de demostración **RETRO10**.
Ingreso, registro, recuperación, contacto y suscripción son demostraciones: no crean cuentas,
no envían correos ni procesan pagos. Las contraseñas no se guardan.

## Diseño

El diseño de escritorio parte de [RetroWave en Canva](https://canva.link/nj6srhxjpvdix0j).
Se conservan la paleta crema, coral, mostaza y marrón y la tipografía de estilo retro.
Los [Sketch](primera-entrega/Sketch) y [Mockup](primera-entrega/Mockup) de la primera entrega permanecen disponibles.

## Pruebas

La etapa 3 pasó ESLint, Prettier y la compilación de Vite. Se comprobaron las 26 fichas y sus imágenes,
filtros combinados, recarga, vuelta al catálogo, precios inválidos, productos agotados y producto inexistente.
También se probaron compras con variantes, cantidades acumuladas, compatibilidad con el carrito HTML,
descuento RETRO10 y recuperación desde un error del servicio mediante el botón de reintento.
Se realizaron 14 comprobaciones adicionales de lógica y del servicio de productos.
La compilación se recorrió en el navegador integrado. No hubo errores de consola en esa revisión;
la prueba separada con la API apagada generó los errores de conexión esperados.
No se observó desborde horizontal en las vistas de escritorio comprobadas.
`npm audit` informó 0 vulnerabilidades el 5 de noviembre de 2026, dentro de `segunda-entrega`.

Las pruebas de la migración completa y en otros navegadores se realizarán al terminar las siguientes etapas.

## Trabajo en equipo

Cada integrante prepara sus cambios en su rama y abre un Pull Request hacia `main` para revisión del equipo.
Se utiliza conventional commits y se conservan las versiones exactas en `package-lock.json`.
`node_modules`, `dist` y los archivos locales de entorno se excluyen con `.gitignore`.

La [publicación anterior en GitHub Pages](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/primera-entrega/)
se conserva mientras se prepara la migración. El despliegue de React se configurará al completar esa etapa.
