# RetroWave — React

**Música · Ropa · Identidad**

Base de la segunda entrega de Taller de Desarrollo Web 2026.
Integrantes: Octavio Albarracin, Emi Garcia y Clari Terpin.

## Estado de esta etapa

La etapa 1 prepara Vite con React y JavaScript, dependencias, alias, Sass y el servicio simulado.
La pantalla inicial muestra la identidad de RetroWave para verificar React, las imágenes y los estilos.
La navegación, las páginas completas, los filtros, el carrito y los formularios se migrarán en las próximas etapas.
React Router está instalado; todavía no se configuraron las rutas ni los Hooks de la tienda.
El servicio de productos funciona, pero esta presentación todavía no consume la API.

El sitio HTML completo con los fixes se conserva en `public/sitio-html`.
Con Vite iniciado, abrir http://127.0.0.1:5173/sitio-html/index.html para seguir usándolo.
También puede abrirse su `index.html` con Live Server.
La primera entrega se conserva sin cambios.

## Requisitos

- Node.js 22.13 o posterior dentro de una versión compatible con el campo `engines` de `package.json`.
- npm, que viene con Node.js.
- Probado en esta PC con Node.js 26.10.0 y npm 12.2.0.

## Instalación

Desde la raíz del repositorio:

```powershell
cd segunda-entrega
npm ci
```

`npm ci` instala las versiones exactas de `package-lock.json`.
No es necesario instalar React ni Sass globalmente.
La URL prevista para la API figura en `.env.example`; se conectará al frontend en la etapa del catálogo.

## Ejecución

En una terminal, ubicada en `segunda-entrega`:

```powershell
npm run dev
```

Abrir la dirección local que informa Vite, normalmente http://127.0.0.1:5173/.

Para iniciar el servicio simulado, abrir una segunda terminal en la misma carpeta:

```powershell
npm run services
```

Consultar http://127.0.0.1:4000/productos para obtener los 26 productos.
Los datos están en `src/data/db.json`. Se conserva el mismo catálogo del sitio HTML.
Las rutas de las fotos en esos datos se adaptarán al conectar la tienda en React.
El servicio simulado devuelve JSON; las fotos actuales están en `public/sitio-html/imagenes`.

## Comandos

| Comando                | Uso                                                |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Iniciar Vite para desarrollo.                      |
| `npm run services`     | Iniciar json-server en el puerto 4000.             |
| `npm run build`        | Generar la versión compilada dentro de `dist`.     |
| `npm run preview`      | Probar localmente la versión compilada.            |
| `npm run lint`         | Revisar el código con ESLint.                      |
| `npm run format:check` | Comprobar el formato con Prettier.                 |
| `npm run format`       | Aplicar el formato con Prettier.                   |
| `npm audit`            | Consultar avisos de seguridad de las dependencias. |

## Organización

| Carpeta o archivo  | Contenido                                                   |
| ------------------ | ----------------------------------------------------------- |
| `src/components`   | Componentes compartidos; se crearán al migrar las páginas.  |
| `src/pages`        | Páginas de React; pendientes de migración.                  |
| `src/layouts`      | Estructura compartida para la navegación con Outlet.        |
| `src/api`          | Funciones de acceso al servicio; pendientes de implementar. |
| `src/data/db.json` | Datos del catálogo para json-server.                        |
| `src/utils`        | Funciones auxiliares que se reutilizarán.                   |
| `src/styles`       | Estilos `.scss` y variables de Sass.                        |
| `src/assets`       | Imágenes importadas desde el código.                        |
| `public`           | Recursos estáticos, como la imagen del favicon.             |

Los archivos `.gitkeep` permiten subir las carpetas que todavía están vacías.
`@/` apunta a `src` y `@styles/` a `src/styles`, tanto en Vite como en el editor.
Sass se compila automáticamente mediante Vite.

## Tecnologías

- React, React DOM y JavaScript con JSX.
- Vite y el plugin oficial de React.
- React Router DOM, preparado para la próxima etapa.
- Sass, ESLint y Prettier.
- json-server para simular el servicio de productos.
- Google Fonts: Shrikhand y DM Sans.

Se usa la versión publicada `1.0.0-beta.15` de json-server, fijada en el lockfile.
El script `services` utiliza su sintaxis actual; no requiere `--watch`.

## Dependencias y seguridad

Se mantienen ESLint y Prettier como herramientas de revisión y formato.
En `package.json` se fija `minimatch` 11.0.1 para ESLint y `@eslint/config-array` mediante `overrides`.
La versión evita el [aviso GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).
La compatibilidad se comprueba ejecutando ESLint, la compilación y las pruebas de arranque.
Al actualizar dependencias, repetir estos controles y `npm audit`.

Verificación del 2 de noviembre de 2026: instalación limpia con `npm ci`, revisión con ESLint y
compilación correctas. `npm audit` informó 0 vulnerabilidades en este proyecto.
La pantalla se comprobó en el navegador integrado, en desarrollo y en la versión compilada,
sin errores de consola ni imágenes rotas. El servicio respondió con los 26 productos.
Estas pruebas no sustituyen una revisión en otros navegadores al completar la migración.

## Control de versiones

Subir el código fuente, los archivos de configuración y `package-lock.json`.
`node_modules`, `dist`, los archivos locales `.env` y las configuraciones personales del editor se excluyen con `.gitignore`.
La publicación de React en GitHub Pages se preparará al finalizar la migración.
Todavía no corresponde reemplazar la publicación del sitio HTML por esta base.

## Referencias

- [Clases de React](https://ucc-tallerdesarrolloweb.github.io/filminas/U6_react.html#/).
- [Consignas del proyecto](https://ucc-tallerdesarrolloweb.github.io/filminas/Proyecto.html#/).
- [Clases de APIs simuladas](https://ucc-tallerdesarrolloweb.github.io/filminas/U7_mock-api.html#/).

## Carpeta principal de trabajo

Esta base se ejecuta directamente desde `segunda-entrega` del repositorio principal.
`package.json`, el lockfile, `jsconfig.json`, la configuración de Vite y la de ESLint están en esa carpeta.
Los archivos de ejercicios Node que existían en la raíz del repositorio no se usan para iniciar esta aplicación.
Los estilos y scripts del sitio HTML conservado quedan excluidos de ESLint y Prettier para preservar sus archivos.
El README general del repositorio enlaza esta guía de ejecución.
