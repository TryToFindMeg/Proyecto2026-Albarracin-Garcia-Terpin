# RetroWave — Segunda entrega

**Música · Ropa · Identidad**

Integrantes: Octavio Albarracin, Emi Garcia y Clari Terpin.

## Descripción

Todo el sitio actual funciona en React: Inicio, Nosotros, catálogo, detalle, carrito,
Cuenta, Contacto y Novedades. Conserva el diseño de escritorio, la navbar fija, las fuentes
Shrikhand y DM Sans y las fotografías locales. El carrito se conecta a una API local y la
versión estática del sitio se publica mediante GitHub Pages.

- [Instalación y ejecución](#instalación-y-ejecución)
- [Comandos](#comandos)
- [Organización](#organización)
- [Catálogo y API](#catálogo-y-api)
- [Carrito conectado a la API local](#carrito-conectado-a-la-api-local)
- [Carrito y formularios](#carrito-y-formularios)
- [Revisión](#revisión)
- [Trabajo en equipo](#trabajo-en-equipo)

## Instalación y ejecución

### 1. Dependencias

Se necesita Node.js compatible con engines de package.json y npm.
Se comprobó el entorno con Node.js 26.10.0 y npm 12.2.0.
Desde la raíz del repositorio:

```powershell
cd segunda-entrega
npm ci
```

Si las dependencias ya están instaladas y el lockfile no cambió, no hace falta repetirlo.
En PowerShell se puede usar npm.cmd. React y Sass no necesitan instalación global.

### 2. Desarrollo: API y React

Abrir dos terminales, ambas en segunda-entrega.

Terminal 1:

```powershell
npm run services
```

json-server lee src/data/db.json y responde en http://127.0.0.1:4000/productos, /contenido y /carrito.
El recurso carrito permite GET, POST, PATCH y DELETE y guarda sus cambios en ese archivo.

Terminal 2:

```powershell
npm run dev
```

Abrir la dirección que muestre Vite, normalmente http://127.0.0.1:5173/.
Dejar ambas terminales abiertas. Ctrl+C detiene cada servicio.
Usar Vite: Live Server y el doble clic sobre index.html no procesan JSX.
Usar siempre el mismo origen del navegador para recuperar los datos guardados.

### 3. Versión de publicación

En segunda-entrega:

```powershell
npm run check
npm run preview
```

Abrir la dirección que indique preview, normalmente http://127.0.0.1:4173/.
La raíz redirige a http://127.0.0.1:4173/segunda-entrega/.
La compilación incluye mocks GET de productos y contenido: el sitio puede leerse sin json-server encendido.
El carrito con API se prueba con npm run dev y npm run services; en la publicación estática
queda informado como disponible en la versión local, sin simular escrituras en el navegador.
La versión anterior se puede consultar en /primera-entrega/.

El build prepara dist/segunda-entrega, dist/primera-entrega, un index de redirección y .nojekyll.
El segundo script del build requiere que primera-entrega siga junto a segunda-entrega dentro del repositorio.
Solo copia esa primera entrega al resultado; no modifica sus archivos originales.
Los pasos de GitHub Pages están en [PUBLICACION.md](PUBLICACION.md).

### Rutas

| Página   | Ruta después de la dirección base   |
| -------- | ----------------------------------- |
| Inicio   | `#/`                                |
| Nosotros | `#/nosotros`                        |
| Catálogo | `#/productos`                       |
| Remeras  | `#/productos?categoria=remeras`     |
| Detalle  | `#/producto/remera-highway-grooves` |
| Carrito  | `#/carrito`                         |
| Cuenta   | `#/cuenta`                          |
| Contacto | `#/contacto`                        |

HashRouter permite recargar las rutas en GitHub Pages. Los enlaces a secciones usan un parámetro
como `#/contacto?seccion=envios` y desplazan también el foco para navegar con teclado.
Los enlaces de categorías del pie agregan `seccion=titulo-catalogo` para mostrar el encabezado
del catálogo debajo de la barra fija, incluso al seleccionar otra vez la misma categoría.

## Comandos

| Comando                | Uso                                                              |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run services`     | Iniciar json-server para desarrollo.                             |
| `npm run dev`          | Iniciar React con Vite.                                          |
| `npm run check:datos`  | Validar los 26 productos y sus fotografías.                      |
| `npm run lint`         | Revisar errores e imports sin uso con ESLint.                    |
| `npm run format:check` | Comprobar formato con Prettier.                                  |
| `npm run format`       | Aplicar formato.                                                 |
| `npm run build`        | Compilar, validar datos y preparar ambas entregas para publicar. |
| `npm run preview`      | Servir localmente la compilación ya preparada.                   |
| `npm run check`        | Ejecutar lint, formato y build.                                  |
| `npm audit`            | Consultar vulnerabilidades del proyecto React.                   |

## Organización

| Ubicación        | Contenido                                                         |
| ---------------- | ----------------------------------------------------------------- |
| `src/App.jsx`    | Rutas, carga de productos y compra compartida mediante props.     |
| `src/api`        | Consulta HTTP con fetch y async/await.                            |
| `src/components` | Componentes reutilizables, filtros, formularios, ficha y carrito. |
| `src/pages`      | Las páginas React y la vista no encontrada.                       |
| `src/layouts`    | Layout con Outlet, metadatos, foco y desplazamiento.              |
| `src/data`       | Solo db.json: productos, carrito y contenido de la interfaz.      |
| `src/utils`      | Precios, filtros, validaciones y almacenamiento.                  |
| `src/styles`     | Todos los estilos en archivos .scss con variables y @use.         |
| `src/assets`     | Imagen importada desde Inicio.                                    |
| `public`         | Favicon y fotografías locales.                                    |
| `scripts`        | Verificación de datos y preparación de publicación con Node.      |

React usa los alias @/ y @styles/. Los scripts de Node usan rutas relativas porque no se ejecutan con Vite.
La configuración y package.json de React están en segunda-entrega. El README general está en la raíz del repo.
Las 58 imágenes de public/sitio-html/imagenes se conservan; el HTML, CSS y JS antiguos ya se retiraron.

## Catálogo y API

El catálogo contiene 26 productos: 12 remeras, 12 buzos, una campera y una tote bag.
Una sola página muestra las categorías y una sola ficha muestra el producto solicitado por id.
Los filtros combinan categoría, género, artista, precio, stock, color, talle y orden, conservando preferencias en la URL.

El frontend obtiene el catálogo por HTTP; no importa db.json directamente.
Antes de renderizarlo verifica campos, importes, opciones e identificadores únicos.
Un error HTTP o datos incompletos muestran un aviso y permiten reintentar, sin borrar el carrito.

| Modo        | GET usado de forma predeterminada                              |
| ----------- | -------------------------------------------------------------- |
| Desarrollo  | `http://127.0.0.1:4000/productos` mediante json-server.        |
| Compilación | `api/productos.json`, relativo a la segunda entrega publicada. |

El JSON público se genera desde src/data/db.json durante cada build. Es un mock de lectura;
no es un backend con usuarios, pedidos ni escritura remota. Cambiar db.json y volver a compilar actualiza el catálogo publicado.

Para usar otra API, copiar .env.example a .env y definir VITE_API_URL con su dirección base,
sin /productos al final. Esa API debe responder a GET /contenido con la configuración del sitio
y a GET /productos con un array de productos
y soportar también el recurso carrito con GET, POST, PATCH y DELETE, permitiendo las consultas del navegador. Reiniciar Vite y volver a compilar para aplicar la configuración.
Una API configurada que falla muestra el error: no se sustituye silenciosamente por el catálogo local.
No subir .env. Las variables VITE_ son públicas; nunca colocar claves o contraseñas.

## Carrito conectado a la API local

Las compras de la segunda entrega se guardan
en `segunda-entrega/src/data/db.json`, recurso `carrito`, mediante json-server.

| Operación | Petición                          | Comportamiento                                        |
| --------- | --------------------------------- | ----------------------------------------------------- |
| Consultar | GET /carrito?sesion=...           | Recuperar el carrito de este navegador.               |
| Agregar   | POST /carrito                     | Crear una fila con producto, talle, color y cantidad. |
| Modificar | PATCH /carrito/:id                | Actualizar la cantidad de una fila.                   |
| Eliminar  | DELETE /carrito/:id               | Quitar una variante.                                  |
| Vaciar    | DELETE /carrito/:id por cada fila | Quitar las filas de esa sesión después de confirmar.  |

Cada fila tiene un `id` asignado por la API y un `productoId` que identifica la prenda.
En React se usan `registroId` e `id`, respectivamente. El navegador conserva solo
`retrowave-api-sesion` y la preferencia `retrowave-api-descuento`; las compras no se
guardan en localStorage. El identificador separa navegadores de esta demostración:
no es un sistema de autenticación ni de cuentas.

La base entregada tiene `carrito: []`. Las compras que se hagan localmente se conservan
en ese archivo al cerrar y reiniciar json-server. El carrito anterior de primera entrega
no se borra ni se importa automáticamente; sus claves de almacenamiento se conservan.
No subir carritos de prueba al repositorio: entregar el recurso vacío.

Antes de confirmar una compra, React espera la escritura y vuelve a consultar el servicio.
Si falla, informa el error y recupera lo que realmente quedó guardado cuando la API responde.
json-server no ofrece transacciones: si una actualización de varias filas falla a mitad de camino,
puede haber cambios parciales. No se anuncia éxito y se vuelve a leer la selección real.
Se bloquean acciones repetidas mientras se guarda. Consultar carrito guardado permite
recuperar cambios realizados desde otra pestaña; recargar también consulta la API.

### Cómo probar el carrito

Desde la raíz del repositorio, instalar si hace falta:

```powershell
cd segunda-entrega
npm ci
```

Dejar una terminal en esa carpeta ejecutando `npm run services` y otra con `npm run dev`.
Abrir la dirección de Vite, agregar una prenda, cambiar cantidad, aplicar RETRO10,
eliminar y confirmar el vaciado. Verificar las filas en `src/data/db.json` o con
GET http://127.0.0.1:4000/carrito. Mantener siempre el mismo origen, por ejemplo
http://127.0.0.1:5173/, para recuperar la misma sesión de navegador.

Apagar la API debe producir un aviso, sin confirmar escrituras ni presentar un carrito
vacío como resultado de una consulta fallida. Reiniciar la API y usar Volver a consultar
el carrito recupera los datos. No hace falta instalar React, Sass ni json-server globalmente.

### GitHub Pages

El sitio publicado conserva el catálogo y la navegación mediante el mock GET estático.
El carrito con escritura se evalúa localmente: con `VITE_API_URL` vacío en una compilación,
se muestra ese aviso y se deshabilita Agregar al carrito. No se cambia a localStorage como
alternativa silenciosa ni se intenta escribir en `api/productos.json`.

Para usar una API externa en el futuro, `VITE_API_URL` debe apuntar a un servicio que soporte
productos y carrito con estos métodos. Eso requiere configurar y alojar ese servicio;
el proyecto no incluye ese alojamiento.

### Comprobaciones del carrito

El 7/11/2026 pasaron 26 comprobaciones de API con peticiones HTTP reales y 18
observaciones de navegador: variantes, cantidades, descuento, recarga, reinicio de
json-server, error de escritura, recuperación, eliminación, vaciado y alcance del build.
La base de prueba quedó separada del proyecto; el recurso carrito entregado está vacío.
Pasaron `npm run check` y `npm audit --audit-level=low`, con cero vulnerabilidades.
Cinco vistas renderizadas no tienen errores de Nu HTML Checker. Las tres vistas de
desarrollo tienen un aviso por `type="text/css"` que añade Vite a su etiqueta style;
las dos vistas compiladas no presentan ese aviso. No se modificó Sass ni la primera entrega.
Estas pruebas se realizaron en el navegador integrado; no acreditan pruebas en otros motores.

## Carrito y formularios

App comparte la selección con useState y props. Las operaciones crean copias del estado.
Los precios y la disponibilidad se toman de los productos recibidos por HTTP.

- Producto, talle y color identifican una variante; la misma variante acumula hasta 10 unidades.
- Las cantidades se validan al escribir y se guardan con Actualizar carrito, conservando el foco del teclado.
- Los importes muestran las cantidades editadas; el contador refleja las unidades guardadas.
- Eliminar una fila conserva las cantidades guardadas de las demás; Restablecer las devuelve a 1.
- RETRO10 aplica 10 %. Aplicar un código vacío quita el descuento.
- Vaciar pide confirmación; Cancelar o Escape conserva las compras y devuelve el foco al botón.
- Eliminar la última fila o confirmar el vaciado enfoca el contenido; cerrar el resumen devuelve el foco a su botón.
- La API conserva las filas del carrito; localStorage solo guarda sesión del carrito, cupón y email recordado.
- Consultar carrito guardado o recargar recupera cambios de otras pestañas. Los errores no anuncian compras exitosas.

Campo reutiliza etiquetas, ayudas y errores en formularios controlados con onChange.
Los errores se asocian con aria-invalid, aria-describedby y role=alert; enviar vacío enfoca el primer campo incorrecto.
Limpiar Cuenta vacía sus campos incluso si el navegador impide borrar la preferencia guardada; ese fallo se informa.
El diálogo usa dialog y admite Escape. Hay foco visible, salto al contenido, alt y encabezados de tabla.
Las cantidades y cupones inválidos reciben el foco al intentar confirmarlos. Los filtros de precio conservan
lo escrito y muestran error en tiempo real si no es un número decimal entre 0 y 100000.
Se escriben sin separadores de miles; el punto indica decimales. Esta validación se realiza en JavaScript.

Ingreso, registro, recuperación, contacto, suscripción y resumen son demostraciones:
no crean sesiones o cuentas, no envían correos ni generan pedidos o pagos. Usar datos de prueba.

## Revisión

El 5 de noviembre de 2026 pasaron lint, formato, validación de datos y build, con 27 comprobaciones
adicionales de lógica, almacenamiento, filtros, contrato HTTP y recursos publicados.
Se validaron 41 vistas de HTML generado con Nu HTML Checker: rutas principales, las 26 fichas
y estados de error de contacto, precio y API. Las 26 fotografías de productos son distintas.
Se revisaron 42 archivos JavaScript/JSX y sus 132 imports, sin imports sin uso.
Se recorrió el compilado bajo el prefijo del repositorio y se comprobó la recuperación ante datos incompletos.
En la revisión del compilado, la consola del navegador integrado no mostró errores ni avisos.
Las combinaciones principales de texto comprobadas superaron 4.5:1; esto no es una certificación de accesibilidad.
npm audit informó 0 vulnerabilidades dentro de segunda-entrega. Las dependencias y el lockfile no cambiaron.

Ver [REVISION.md](REVISION.md) para relacionar comprobaciones y requisitos.
Las pruebas manuales en Chrome, Firefox y Edge quedan fuera de las comprobaciones registradas.
Después de publicar, verificar los enlaces, recursos y navegación en la dirección de GitHub Pages.

## Trabajo en equipo

Cada integrante trabaja en su rama: `albarracin`, `garcia` o `terpin`.
Los cambios se integran mediante Pull Requests hacia `main`, con revisión del equipo.

El workflow de la raíz revisa los PR y los push a main. La publicación se ejecuta
manualmente desde main. `node_modules`, `dist` y `.env` se excluyen del repositorio.

## Material

- [Consignas](https://ucc-tallerdesarrolloweb.github.io/filminas/Proyecto.html#/).
- [React](https://ucc-tallerdesarrolloweb.github.io/filminas/U6_react.html#/).
- [APIs simuladas](https://ucc-tallerdesarrolloweb.github.io/filminas/U7_mock-api.html#/).
- [Publicación con Vite](https://vite.dev/guide/static-deploy.html).
- [Variables y modos de Vite](https://vite.dev/guide/env-and-mode.html).

## Datos de la interfaz

`src/data` contiene únicamente `db.json`. Además de `productos` y `carrito`, incluye
el recurso `contenido`, con cuatro grupos: `catalogo`, `inicio`, `cuenta` y `contacto`.
Se retiraron los antiguos archivos `catalogo.js`, `inicio.js`, `cuenta.js` y `contacto.js`.

La función `obtenerContenido` de `src/api/contenido.js` usa fetch y async/await para
consultar GET /contenido en desarrollo. App guarda la respuesta con useState y pasa
las opciones y textos mediante props. Mientras carga se informa el estado; si falla,
se muestra un aviso con la opción Intentar de nuevo. Las páginas y componentes no
importan directamente archivos de datos.

Los scripts de comprobación y publicación usan `leerBaseDatos`, de `src/api/archivos.js`,
para leer el JSON con Node. El build valida los datos y genera `api/contenido.json`
junto a `api/productos.json`. La versión publicada consulta ambos con funciones de api;
el carrito con escritura continúa disponible mediante json-server local.

No se agregaron dependencias. Para ver un cambio en contenido, guardar db.json y
recargar la página con json-server encendido. No se guardan contraseñas ni mensajes
reales de usuarios en ese recurso: los formularios siguen siendo una demostración.
