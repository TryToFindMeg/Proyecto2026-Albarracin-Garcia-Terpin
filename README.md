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
| [segunda-entrega](segunda-entrega/README.md) | Etapa 1: base de React con Vite, Sass y servicio simulado. |
| [Sitio HTML con fixes](segunda-entrega/public/sitio-html/index.html) | Versión completa corregida que se utiliza como base de la migración. |

La segunda entrega está en desarrollo. La base de React ya arranca y compila; las páginas completas,
las rutas, el carrito, los formularios y la conexión del frontend con el servicio se migrarán por etapas.
La presentación inicial de React permite comprobar el entorno, las imágenes y los estilos.
El sitio HTML conserva las correcciones del catálogo compartido, la ficha única y los estados de botones.

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
La presentación inicial todavía no consume ese servicio.

Los archivos de configuración del proyecto React están junto a su `package.json`, dentro de `segunda-entrega`.
El README general y la carpeta `.git` pertenecen a la raíz del repositorio.
Consultar [la guía de React](segunda-entrega/README.md) para ver scripts, alias y estructura de carpetas.

## Tecnologías

- React y React DOM con JavaScript y JSX.
- Vite y el plugin oficial de React.
- React Router DOM, instalado para la próxima etapa de navegación.
- Sass con archivos `.scss` dentro de `src/styles`.
- json-server para simular el servicio de productos.
- ESLint y Prettier para revisión y formato del código.
- HTML5, CSS3 y JavaScript en el sitio corregido que se conserva durante la migración.
- localStorage para el carrito y las preferencias del sitio HTML; pendiente de migración a React.
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

La etapa 1 se verificó con instalación limpia, ESLint, Prettier, compilación de Vite y arranque del servicio.
La presentación de React se comprobó en el navegador integrado, en desarrollo y compilada,
sin errores de consola ni imágenes rotas. `npm audit` informó 0 vulnerabilidades en las dependencias de la nueva base.
Al completar las siguientes etapas se volverán a probar filtros, cantidades, valores inválidos,
formularios, persistencia, navegación y compatibilidad en los navegadores de la entrega.

## Trabajo en equipo

Cada integrante prepara sus cambios en su rama y abre un Pull Request hacia `main` para revisión del equipo.
Se utiliza conventional commits y se conservan las versiones exactas en `package-lock.json`.
`node_modules`, `dist` y los archivos locales de entorno se excluyen con `.gitignore`.

La [publicación anterior en GitHub Pages](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/primera-entrega/)
se conserva mientras se prepara la migración. El despliegue de React se configurará al completar esa etapa.
