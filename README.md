# RetroWave

**Música · Ropa · Identidad**

Proyecto de una tienda de ropa y accesorios inspirados en la música para Taller de Desarrollo Web 2026.

## Índice

- [Integrantes](#integrantes)
- [Estado de las entregas](#estado-de-las-entregas)
- [Correcciones de la primera entrega](#correcciones-de-la-primera-entrega)
- [Carrito conectado a la API local](segunda-entrega/README.md#carrito-conectado-a-la-api-local)
- [Ejecución de la segunda entrega](#ejecución-de-la-segunda-entrega)
- [Tecnologías](#tecnologías)
- [Contenido del sitio](#contenido-del-sitio)
- [Diseño](#diseño)
- [Pruebas](#pruebas)
- [Trabajo en equipo](#trabajo-en-equipo)
- [Conservación de versiones](#conservación-de-versiones)
- [Fixes de la revisión final](#fixes-de-la-revisión-final)
- [Sitio publicado](#sitio-publicado)

## Integrantes

- Octavio Albarracin.
- Emi Garcia.
- Clari Terpin.

## Estado de las entregas

| Ubicación | Estado |
| --- | --- |
| [primera-entrega](primera-entrega/index.html) | HTML, CSS y JavaScript: catálogo y ficha reutilizables, contraste y bocetos corregidos. |
| [segunda-entrega](segunda-entrega/README.md) | React con etapas 1 a 5 integradas y carrito conectado a la API local. |

La segunda entrega se desarrolla por etapas. Todas las páginas actuales funcionan en React:
Inicio, Nosotros, catálogo, ficha de producto, carrito, Cuenta y Contacto, además de Novedades en el pie.
El catálogo comparte una página para todas las categorías y una ficha reutilizable por identificador.
Los productos se obtienen mediante fetch y async/await: json-server durante el desarrollo y un mock JSON
publicado junto al sitio en producción. La aplicación valida la respuesta antes de mostrarla.
El carrito de segunda entrega guarda las variantes mediante GET, POST, PATCH y DELETE en
json-server local. El navegador conserva el identificador de sesión y la preferencia de cupón.
La compilación estática informa que el carrito con escritura se prueba en la versión local.
La profesora confirmó que para esta entrega alcanza con ejecutar la API localmente;
no se requiere alojar un servidor de escritura en internet.
Los formularios validan mientras se escribe y muestran mensajes accesibles.

| Etapa | Contenido | Estado |
| --- | --- | --- |
| 1 | Vite, dependencias, alias, Sass y servicio simulado. | Implementada. |
| 2 | Inicio, Nosotros, estructura compartida, rutas y navegación con HTML. | Implementada. |
| 3 | Catálogo y ficha de producto en React, conectados a la API con fetch y async/await. | Implementada. |
| 4 | Carrito y formularios en React, persistencia y validación en tiempo real. | Implementada. |
| 5 | Revisión final, validación de datos y preparación de la publicación. | Integrada en main; publicación manual. |

## Correcciones de la primera entrega

Las observaciones de duplicación de código y contraste se corrigen dentro de
`primera-entrega`, usando HTML, CSS y JavaScript sin React:

- `productos.html` comparte el catálogo de Remeras, Buzos, Camperas y Accesorios.
  La categoría se recibe en la URL, por ejemplo `productos.html?categoria=remeras`.
- `producto.html` muestra cualquiera de las 26 prendas a partir de su identificador,
  por ejemplo `producto.html?id=remera-highway-grooves`. JavaScript completa la foto,
  descripción, precio y opciones desde `js/datos-productos.js`.
- Inicio y catálogo usan una misma función para crear las tarjetas. Se retiran
  las 26 fichas individuales y las tres páginas que repetían el catálogo.
- Los enlaces de navegación y carrito apuntan a las páginas compartidas.
- Los botones secundarios y de restablecer conservan texto legible al pasar el
  mouse y al recibir el foco con el teclado.

Para probar esta versión, abrir `primera-entrega/index.html` con Live Server de
Visual Studio Code, o servir esa carpeta con otro servidor estático. Se necesita
JavaScript habilitado. No requiere React, instalar paquetes ni ejecutar una API.
El carrito de esta entrega conserva sus datos en el navegador con localStorage.

El fix se verificó el 6 de noviembre de 2026: ocho HTML sin mensajes del validador Nu,
26 fichas dinámicas comprobadas y pruebas de filtros, carrito y contraste en el navegador
integrado.

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
El recurso http://127.0.0.1:4000/carrito permite consultar, agregar, modificar y eliminar compras
y conserva sus cambios en el mismo archivo. Ver [ejecución y prueba del carrito local](segunda-entrega/README.md#carrito-conectado-a-la-api-local).
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
El catálogo de esta versión usa el JSON publicado y no requiere iniciar services.
El carrito con escritura se prueba con npm run dev y npm run services; sin una API
de producción configurada, la compilación muestra el aviso de alcance local.
El build prepara dist con ambas entregas, la redirección y el JSON de productos.
No modifica primera-entrega. No subir dist ni node_modules.

## Tecnologías

- React y React DOM con JavaScript y JSX.
- Vite y el plugin oficial de React.
- React Router DOM con HashRouter, rutas hijas, Outlet, Link y NavLink.
- Sass con archivos `.scss` dentro de `src/styles`.
- json-server para el servicio local de productos y carrito: GET, POST, PATCH y DELETE.
- ESLint y Prettier para revisión y formato del código.
- HTML semántico mediante JSX y JavaScript con funciones flecha.
- Formularios controlados con onChange y mensajes de error accesibles.
- fetch y async/await para consultar productos y gestionar las compras del carrito.
- localStorage para el carrito de primera entrega; en segunda entrega, para sesión del carrito,
  preferencia de descuento y email recordado. Las compras de segunda entrega quedan en db.json.
  No se guardan contraseñas.
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
Los [Sketch corregidos](primera-entrega/Sketch) están en primera-entrega: 12 JPG con bocetos
de las páginas y estados de error. Los [Mockup](primera-entrega/Mockup) se conservan en su carpeta.

## Pruebas

Se ejecutaron ESLint, Prettier, validación de datos y compilación. La revisión de
JavaScript y JSX incluyó 45 archivos y 142 imports, sin imports sobrantes detectados.
La auditoría de dependencias de segunda-entrega informó cero vulnerabilidades el 7/11/2026.

En el navegador integrado se comprobaron filtros, stock, formularios, cantidades,
cupón, compra, recarga, eliminación, vaciado y navegación con teclado. También se
probó el carrito contra json-server, incluyendo el reinicio del servicio, errores
de conexión y recuperación de los datos guardados.

Las verificaciones funcionales indicadas corresponden al navegador integrado.
El detalle de las comprobaciones realizadas está en [REVISION.md](segunda-entrega/REVISION.md).

## Trabajo en equipo

Cada integrante trabaja en su rama y abre un Pull Request hacia `main` para revisión del equipo.
Las ramas son `albarracin`, `garcia` y `terpin`. Las etapas 1 a 5 y los fixes de código
de ambas entregas ya están integrados en `main`.

Se utiliza conventional commits y las versiones de dependencias se conservan en `package-lock.json`.
`node_modules`, `dist` y los archivos locales de entorno se excluyen con `.gitignore`.

## Conservación de versiones

La primera entrega permanece separada. El HTML, CSS y JavaScript anteriores de la segunda entrega
se retiraron de public después de migrar todas sus páginas a React. Sus fotos locales se conservan
en public/sitio-html/imagenes. Los respaldos completos y los paquetes de cada etapa se guardan
aparte en el escritorio de trabajo y no se suben como carpetas del sitio.

## Sitio publicado

El proyecto ofrece ambas entregas con enlaces separados dentro de la misma publicación:

- **Primera entrega:** [HTML, CSS y JavaScript](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/primera-entrega/).
- **Segunda entrega:** [React](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/segunda-entrega/#/).

Los PR y los push ejecutan las comprobaciones; la publicación requiere esa ejecución manual.
El proceso incluye las dos carpetas y conserva sus direcciones.

Pages muestra el catálogo y la navegación de la segunda entrega mediante archivos estáticos.
El carrito con API se prueba localmente con `npm run services` y `npm run dev`.
Consultar [PUBLICACION.md](segunda-entrega/PUBLICACION.md) para más detalles.
