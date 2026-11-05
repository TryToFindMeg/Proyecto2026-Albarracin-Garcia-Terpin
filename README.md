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
| [segunda-entrega](segunda-entrega/README.md) | Etapas 1 y 2: React con Vite, Inicio, Nosotros, navegación y componentes compartidos. |
| [Sitio HTML con fixes](segunda-entrega/public/sitio-html/index.html) | Mantiene disponibles el catálogo, las fichas, cuenta, contacto y carrito durante la migración. |

La segunda entrega se desarrolla por etapas. Inicio y Nosotros ya están en React y comparten
el encabezado fijo, el pie y los componentes Boton y Tarjeta. React Router usa rutas hijas con Outlet.
Los enlaces de la tienda permiten seguir usando las páginas que todavía están en HTML y volver a React.
El contador del carrito conserva las unidades elegidas al navegar entre ambas versiones.

| Etapa | Contenido | Estado |
| --- | --- | --- |
| 1 | Vite, dependencias, alias, Sass y servicio simulado. | Preparada. |
| 2 | Inicio, Nosotros, estructura compartida, rutas y navegación con HTML. | Implementada. |
| 3 | Catálogo y ficha de producto en React, conectados a la API con fetch y async/await. | Pendiente. |
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

### Iniciar React

```powershell
npm run dev
```

Abrir la dirección que muestre Vite, normalmente http://127.0.0.1:5173/.
Para abrir el sitio HTML completo con sus correcciones durante la migración,
usar http://127.0.0.1:5173/sitio-html/index.html con ese mismo servidor activo.

### Iniciar el servicio simulado

Abrir otra terminal en `segunda-entrega`:

```powershell
npm run services
```

La API de productos está en http://127.0.0.1:4000/productos y obtiene sus datos de `src/data/db.json`.
Inicio toma sus productos destacados del JSON local. La conexión de la tienda con la API se implementará en la etapa 3.

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
- localStorage para el carrito HTML; el contador de React lee esas mismas unidades durante la migración.
- Google Fonts: Shrikhand y DM Sans.
- Git, GitHub y Markdown.

## Contenido del sitio

La versión HTML incluye Inicio, catálogo por categorías, una ficha compartida de producto,
Nosotros, carrito, Mi cuenta y Contacto. Su catálogo contiene 26 productos con fotografías locales,
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

La etapa 2 pasó la revisión con ESLint, la comprobación de formato con Prettier y la compilación de Vite.
Se verificaron 17 situaciones en el navegador integrado: navegación entre Inicio y Nosotros, recarga directa,
enlaces a secciones, historial, filtros por género al abrir el catálogo HTML, carrito compartido,
página inexistente, teclado y navegación en la versión compilada. No se observaron errores de consola.
Los botones conservan texto legible y foco visible. La navbar permanece fija al desplazarse.
`npm audit` informó 0 vulnerabilidades el 5 de noviembre de 2026.

Las pruebas de la migración completa y en otros navegadores se realizarán al terminar las siguientes etapas.

## Trabajo en equipo

Cada integrante prepara sus cambios en su rama y abre un Pull Request hacia `main` para revisión del equipo.
Se utiliza conventional commits y se conservan las versiones exactas en `package-lock.json`.
`node_modules`, `dist` y los archivos locales de entorno se excluyen con `.gitignore`.

La [publicación anterior en GitHub Pages](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/primera-entrega/)
se conserva mientras se prepara la migración. El despliegue de React se configurará al completar esa etapa.
