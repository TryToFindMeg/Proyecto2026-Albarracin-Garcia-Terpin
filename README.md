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
| [segunda-entrega](segunda-entrega/README.md) | Etapas 1 a 5 integradas; fixes de revisión final preparados. |

La segunda entrega se desarrolla por etapas. Todas las páginas actuales funcionan en React:
Inicio, Nosotros, catálogo, ficha de producto, carrito, Cuenta y Contacto, además de Novedades en el pie.
El catálogo comparte una página para todas las categorías y una ficha reutilizable por identificador.
Los productos se obtienen mediante fetch y async/await: json-server durante el desarrollo y un mock JSON
publicado junto al sitio en producción. La aplicación valida la respuesta antes de mostrarla.
El carrito conserva las variantes y el descuento de las etapas anteriores y se sincroniza entre pestañas.
Los formularios validan mientras se escribe y muestran mensajes accesibles.

| Etapa | Contenido | Estado |
| --- | --- | --- |
| 1 | Vite, dependencias, alias, Sass y servicio simulado. | Preparada. |
| 2 | Inicio, Nosotros, estructura compartida, rutas y navegación con HTML. | Implementada. |
| 3 | Catálogo y ficha de producto en React, conectados a la API con fetch y async/await. | Implementada. |
| 4 | Carrito y formularios en React, persistencia y validación en tiempo real. | Implementada. |
| 5 | Revisión final, validación de datos y preparación de la publicación. | Integrada en main; publicación y otros navegadores pendientes. |

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
Este servicio se utiliza al trabajar con npm run dev. La compilación de producción incluye
su propio mock GET de productos y puede consultarlo sin json-server encendido.

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

### Probar la versión de publicación

En segunda-entrega:

```powershell
npm run check
npm run preview
```

Abrir la dirección que muestre Vite: la raíz redirige a segunda-entrega.
Esta versión incluye el catálogo simulado y no requiere iniciar services.
El build prepara dist con ambas entregas, la redirección y el JSON de productos.
No modifica primera-entrega. No subir dist ni node_modules.

## Tecnologías

- React y React DOM con JavaScript y JSX.
- Vite y el plugin oficial de React.
- React Router DOM con HashRouter, rutas hijas, Outlet, Link y NavLink.
- Sass con archivos `.scss` dentro de `src/styles`.
- json-server para simular el servicio de productos.
- ESLint y Prettier para revisión y formato del código.
- HTML semántico mediante JSX y JavaScript con funciones flecha.
- Formularios controlados con onChange y mensajes de error accesibles.
- fetch y async/await para consultar la API de productos.
- localStorage para carrito, descuento y email recordado, sin guardar contraseñas.
- Google Fonts: Shrikhand y DM Sans.
- Git, GitHub, GitHub Actions y Markdown.

## Contenido del sitio

El sitio incluye Inicio, catálogo por categorías, una ficha compartida de producto,
Nosotros, carrito, Mi cuenta y Contacto. El catálogo contiene 26 productos con fotografías locales,
22 artistas o bandas y 8 géneros musicales.

Los filtros conservan la categoría seleccionada y sus preferencias en la URL. El carrito permite elegir
talle y color, editar cantidades, actualizar, eliminar o vaciar productos y aplicar **RETRO10**.
Las cantidades se validan al escribir y se guardan al presionar Actualizar carrito. El vaciado pide confirmación.
Ingreso, registro, recuperación, contacto y suscripción son demostraciones: no crean cuentas,
no envían correos ni procesan pagos. Las contraseñas no se guardan.

## Diseño

El diseño de escritorio parte de [RetroWave en Canva](https://canva.link/nj6srhxjpvdix0j).
Se conservan la paleta crema, coral, mostaza y marrón y la tipografía de estilo retro.
Los [Sketch](primera-entrega/Sketch) y [Mockup](primera-entrega/Mockup) de la primera entrega permanecen disponibles.

## Pruebas

La revisión final posterior a etapa 5 pasó ESLint, Prettier, validación de datos y compilación.
Se comprobaron 27 casos de lógica, almacenamiento, filtros, contrato HTTP y publicación,
y se validaron 41 vistas de HTML generado con Nu HTML Checker, incluidas las 26 fichas y los errores de formulario y API.
En el navegador integrado se probaron filtros, stock, compra, cupón, recarga, vaciado,
formularios, navegación por secciones, teclado y recuperación ante datos incorrectos.
Se corrigió el foco al actualizar, eliminar, restablecer o vaciar el carrito y al cerrar sus diálogos.
Cantidad y cupón inválidos enfocan su campo; los precios incompletos muestran un error accesible
sin aplicar filtros incorrectos. Las 26 fotos de productos son distintas y los 132 imports revisados están usados.
La compilación se recorrió bajo el prefijo real del repositorio, con consola sin errores.
Las combinaciones principales de texto y el botón secundario con foco superaron 4.5:1 de contraste.
`npm audit` informó 0 vulnerabilidades dentro de segunda-entrega el 5 de noviembre de 2026.

Estas comprobaciones no equivalen a una auditoría completa de accesibilidad ni a pruebas en todos los navegadores.
Chrome, Firefox y Edge deben comprobarse manualmente; no se instalaron navegadores nuevos.
Ver [la revisión y sus pendientes](segunda-entrega/REVISION.md).

## Trabajo en equipo

Cada integrante prepara sus cambios en su rama y abre un Pull Request hacia `main` para revisión del equipo.
Se utiliza conventional commits y se conservan las versiones exactas en `package-lock.json`.
`node_modules`, `dist` y los archivos locales de entorno se excluyen con `.gitignore`.

La [primera entrega](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/primera-entrega/)
se conserva en la preparación de la publicación. La dirección prevista para React es
[segunda entrega](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/segunda-entrega/).
Esta dirección debe verificarse después del despliegue: la etapa 5 no publica automáticamente.
Consultar [la guía de publicación](segunda-entrega/PUBLICACION.md).

El workflow revisa PR y cambios de main. Solo publica al ejecutar manualmente
Revisar y publicar RetroWave desde main. Primero integrar las etapas anteriores del equipo;
para la etapa 5, orden de merge: Emi, Clari y Octa.


## Conservación de versiones

La primera entrega permanece separada. El HTML, CSS y JavaScript anteriores de la segunda entrega
se retiraron de public después de migrar todas sus páginas a React. Sus fotos locales se conservan
en public/sitio-html/imagenes. Los respaldos completos y los paquetes de cada etapa se guardan
aparte en el escritorio de trabajo y no se suben como carpetas del sitio.


## Fixes de la revisión final

Estos cambios se prepararon después de la etapa 5, manteniendo sus paquetes anteriores separados.
Las etapas 1 a 5 ya están integradas en main. Los fixes de esta revisión se reúnen en un único aporte
de Octavio, desde la rama albarracin.
Se mantiene el mismo nivel de React y JavaScript y no se agregan dependencias.
El detalle de requisitos, resultados y tareas pendientes está en [REVISION.md](segunda-entrega/REVISION.md).
