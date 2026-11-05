# RetroWave — Segunda entrega

**Música · Ropa · Identidad**

Integrantes: Octavio Albarracin, Emi Garcia y Clari Terpin.

## Estado: etapa 2

Inicio y Nosotros funcionan en React. Ambas páginas comparten una navbar fija, el pie y los
componentes Boton y Tarjeta. La navegación usa React Router, rutas hijas y Outlet.
Se conservan el diseño de escritorio, la paleta y las fuentes Shrikhand y DM Sans.

El catálogo, las fichas de producto, el carrito y los formularios continúan funcionando en HTML
dentro de `public/sitio-html`. Los enlaces de Inicio y del menú permiten acceder a esas secciones.
Los enlaces de Inicio y Nosotros del sitio HTML vuelven a React.
El contador de la cabecera de React lee el mismo carrito guardado por el sitio HTML.

## Requisitos previos

- Node.js compatible con el campo `engines` de `package.json`.
- npm, incluido con Node.js.
- Instalar los aportes de la etapa 1 antes de aplicar los de la etapa 2.

## Instalación y orden de ejecución

### 1. Instalar las dependencias

Desde la raíz del repositorio:

```powershell
cd segunda-entrega
npm ci
```

Si las dependencias ya están instaladas y el lockfile no cambió, se puede iniciar directamente.
No se necesita instalar React ni Sass globalmente.
En PowerShell también pueden utilizarse los comandos con `npm.cmd`.

### 2. Iniciar el servicio simulado

En una terminal ubicada en `segunda-entrega`:

```powershell
npm run services
```

El servicio queda en http://127.0.0.1:4000/productos y devuelve los 26 productos de `src/data/db.json`.
Esta terminal debe quedar abierta.
La etapa 2 usa el JSON local para los destacados y mantiene la tienda HTML, por lo que el servicio
todavía no es necesario para recorrer esas páginas. La etapa 3 conectará el catálogo de React a la API.

### 3. Iniciar la aplicación

Abrir otra terminal en `segunda-entrega`:

```powershell
npm run dev
```

Abrir la dirección que muestre Vite, normalmente http://127.0.0.1:5173/.
Dejar ambas terminales abiertas mientras se usan los servidores.
Para detener cada servidor, presionar `Ctrl+C` en su terminal.
Si Vite usa otro puerto, utilizar la dirección informada en la terminal.

### Direcciones

| Página                | Dirección habitual con Vite activo              |
| --------------------- | ----------------------------------------------- |
| Inicio React          | http://127.0.0.1:5173/#/                        |
| Nosotros React        | http://127.0.0.1:5173/#/nosotros                |
| Catálogo HTML         | http://127.0.0.1:5173/sitio-html/productos.html |
| Carrito HTML          | http://127.0.0.1:5173/sitio-html/carrito.html   |
| Sitio HTML conservado | http://127.0.0.1:5173/sitio-html/index.html     |
| Datos de la API       | http://127.0.0.1:4000/productos                 |

El sitio se inicia con Vite. Live Server no procesa los archivos JSX de React.

## Comandos disponibles

| Comando                | Uso                                   |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Iniciar Vite.                         |
| `npm run services`     | Iniciar json-server.                  |
| `npm run build`        | Compilar la aplicación en `dist`.     |
| `npm run preview`      | Probar la compilación localmente.     |
| `npm run lint`         | Revisar errores con ESLint.           |
| `npm run format:check` | Comprobar el formato con Prettier.    |
| `npm run format`       | Aplicar el formato del proyecto.      |
| `npm audit`            | Consultar avisos de las dependencias. |

## Organización del código

| Ubicación                | Contenido                                                               |
| ------------------------ | ----------------------------------------------------------------------- |
| `src/App.jsx`            | HashRouter y definición de las rutas.                                   |
| `src/components`         | Cabecera, Pie, Boton y Tarjeta.                                         |
| `src/layouts/Layout.jsx` | Estructura compartida que muestra las rutas hijas con Outlet.           |
| `src/pages`              | Inicio, Nosotros y NoEncontrada.                                        |
| `src/styles`             | Variables y módulos Sass de estructura, componentes y páginas.          |
| `src/data/db.json`       | Catálogo para el servicio y los destacados actuales.                    |
| `src/data/inicio.js`     | Identificadores de destacados y estilos musicales.                      |
| `src/utils`              | Enlaces al HTML, formato de precios y lectura del contador del carrito. |
| `src/api`                | Carpeta preparada para la conexión de la etapa 3.                       |
| `src/assets`             | Imagen importada desde Inicio.                                          |
| `public`                 | Favicon y recursos estáticos.                                           |
| `public/sitio-html`      | Páginas y recursos que siguen funcionando en HTML.                      |

Los imports utilizan `@/` para `src` y `@styles/` para los estilos.
Los archivos de configuración están junto a `package.json`, directamente en `segunda-entrega`.

## Navegación y componentes

- HashRouter conserva la ruta después de `#`, por ejemplo `/#/nosotros`.
- Layout conserva Cabecera y Pie y utiliza Outlet para mostrar la página elegida.
- Link y NavLink navegan entre las páginas de React. NavLink identifica la página actual.
- Los enlaces al HTML conservado mantienen disponibles las funciones pendientes de migración.
- Boton reutiliza el diseño de los enlaces de acción.
- Tarjeta recibe título, imagen opcional y contenido mediante children. Se utiliza en Inicio y Nosotros.
- La ruta desconocida muestra un mensaje y un botón para volver a Inicio con useNavigate.
- useEffect actualiza título, descripción, posición y foco al navegar.
- useState mantiene el contador de la cabecera. Se sincroniza con el carrito existente al volver a React.

Se usa HashRouter para que la recarga de las rutas no requiera reglas especiales del servidor estático.
Se puede consultar la [referencia de HashRouter](https://reactrouter.com/7.18.5/api/declarative-routers/HashRouter).

## Estilos y accesibilidad

Los estilos de React están en archivos `.scss` dentro de `src/styles`, importados mediante alias y `@use`.
El HTML conservado mantiene su CSS mientras se migran las páginas restantes.
La navbar es fija. Los enlaces a estilos y valores dejan espacio para que el encabezado no tape los títulos.
Las imágenes tienen alt, los botones conservan contraste y los enlaces muestran el foco al usar teclado.
Existe un enlace para saltar al contenido principal.
`.gitattributes` mantiene los saltos de línea LF para compartir los archivos entre equipos.

## Verificación de esta etapa

El 5 de noviembre de 2026 se comprobaron ESLint, Prettier y la compilación.
Se realizaron 17 comprobaciones en el navegador integrado, en desarrollo y compilado, incluyendo
recarga de rutas, historial, anclas, foco, enlaces por género y dos unidades del carrito HTML mostradas en React.
Después de vaciar el carrito de prueba, la cabecera volvió a mostrar cero.
No se observaron errores de consola ni desborde horizontal en las vistas de escritorio comprobadas.
`npm audit` informó 0 vulnerabilidades en las dependencias del proyecto.
Las pruebas en otros navegadores quedan pendientes para la revisión final.

## Seguridad de dependencias

Se mantienen ESLint y Prettier. El ajuste de `minimatch` 11.0.1 mediante overrides de la etapa 1 sigue vigente.
Ese ajuste evita el [aviso GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).
Al cambiar dependencias, repetir la revisión, la compilación y `npm audit`.

## Próximas etapas

- Etapa 3: catálogo y ficha en React, con fetch y async/await hacia json-server.
- Etapa 4: carrito y formularios en React, validación en tiempo real y persistencia del estado.
- Etapa 5: revisión completa y preparación de la publicación en GitHub Pages.

La segunda entrega todavía no está terminada. El carrito y los formularios continúan usando sus funciones HTML.
Ingreso, registro, recuperación, contacto y suscripción son demostraciones y no crean cuentas ni procesan pagos.
No se almacenan contraseñas.

## Archivos que se suben

Subir código, imágenes, datos, configuración y lockfile según la parte de cada integrante.
`node_modules`, `dist` y los archivos `.env` locales están excluidos mediante `.gitignore`.
Cada etapa tiene paquetes propios. Los de la etapa 2 contienen únicamente sus diferencias respecto de la etapa 1.
El README general del repositorio se mantiene en la raíz.

## Material de clase

- [React](https://ucc-tallerdesarrolloweb.github.io/filminas/U6_react.html#/).
- [Sass](https://ucc-tallerdesarrolloweb.github.io/filminas/U5_preprocesadoresCSS.html#/).
- [APIs simuladas](https://ucc-tallerdesarrolloweb.github.io/filminas/U7_mock-api.html#/).
- [Consignas](https://ucc-tallerdesarrolloweb.github.io/filminas/Proyecto.html#/).
