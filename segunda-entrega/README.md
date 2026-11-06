# RetroWave — Segunda entrega

**Música · Ropa · Identidad**

Integrantes: Octavio Albarracin, Emi Garcia y Clari Terpin.

## Estado: etapa 5 integrada y fixes finales preparados

Todo el sitio actual funciona en React: Inicio, Nosotros, catálogo, detalle, carrito,
Cuenta, Contacto y Novedades. Conserva el diseño de escritorio, la navbar fija, las fuentes
Shrikhand y DM Sans y las fotografías locales. La publicación está preparada para ejecutarla
manualmente después de integrar los aportes del equipo. No se publicó desde esta copia local.

- [Instalación y ejecución](#instalación-y-ejecución)
- [Comandos](#comandos)
- [Organización](#organización)
- [Catálogo y API](#catálogo-y-api)
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
La etapa 5 no agrega dependencias ni cambia versiones: actualiza los scripts de comprobación y build.
En PowerShell se puede usar npm.cmd. React y Sass no necesitan instalación global.

### 2. Desarrollo: API y React

Abrir dos terminales, ambas en segunda-entrega.

Terminal 1:

```powershell
npm run services
```

json-server lee src/data/db.json y responde en http://127.0.0.1:4000/productos.

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
La compilación incluye un mock GET de productos: no necesita json-server encendido.
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
| `src/data`       | db.json y opciones/contenido de la interfaz.                      |
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
sin /productos al final. Esa API debe responder a GET /productos con un array de productos
y permitir las consultas del navegador. Reiniciar Vite y volver a compilar para aplicar la configuración.
Una API configurada que falla muestra el error: no se sustituye silenciosamente por el catálogo local.
No subir .env. Las variables VITE_ son públicas; nunca colocar claves o contraseñas.

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
- localStorage conserva carrito, cupón y el email que se pidió recordar. Nunca contraseñas.
- Las pestañas se sincronizan y los errores de guardado se informan sin anunciar un éxito falso.

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
Quedan pendientes las pruebas manuales en Chrome, Firefox y Edge, integrar los aportes en main,
ejecutar el workflow y comprobar el sitio publicado. No se instalaron otros navegadores ni se publicaron cambios.

## Trabajo en equipo

Las etapas 1 a 5 quedaron integradas mediante los aportes de Emi, Clari y Octa.
Los fixes posteriores de la revisión final se reúnen en un único paquete que sube Octavio
por la rama albarracin, después de actualizarla desde main. El PR de etapa 5 ya está mergeado.
Los paquetes anteriores permanecen separados y conservan sus versiones.

El workflow de la raíz revisa PR y push a main; la publicación se ejecuta solo manualmente desde main.
No subir node_modules, dist, .env, ZIP, respaldos ni instructivos. Se suben los once archivos
incluidos en el paquete de fixes, entre ellos los dos README y REVISION.md.

## Material

- [Consignas](https://ucc-tallerdesarrolloweb.github.io/filminas/Proyecto.html#/).
- [React](https://ucc-tallerdesarrolloweb.github.io/filminas/U6_react.html#/).
- [APIs simuladas](https://ucc-tallerdesarrolloweb.github.io/filminas/U7_mock-api.html#/).
- [Publicación con Vite](https://vite.dev/guide/static-deploy.html).
- [Variables y modos de Vite](https://vite.dev/guide/env-and-mode.html).
