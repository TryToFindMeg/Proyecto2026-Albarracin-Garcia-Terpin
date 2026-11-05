# RetroWave — Segunda entrega

**Música · Ropa · Identidad**

Integrantes: Octavio Albarracin, Emi Garcia y Clari Terpin.

## Estado: etapa 3

Inicio, Nosotros, catálogo y ficha funcionan en React. Comparten cabecera fija, pie y Layout con Outlet.
Se conservan el diseño de escritorio, la paleta y las fuentes Shrikhand y DM Sans.
Un único catálogo muestra todas las categorías y la ruta `/producto/:id` muestra la ficha elegida,
sin crear una página por prenda. Los productos se obtienen de json-server con fetch y async/await.

Carrito, Cuenta, Contacto y suscripciones continúan en `public/sitio-html` hasta la etapa 4.
La ficha React guarda las mismas variantes en localStorage y actualiza el contador al comprar.
Los enlaces del HTML vuelven al catálogo y la ficha de React.

## Instalación y orden de ejecución

Se necesita Node.js compatible con `engines` de package.json y npm.
Las etapas 1 y 2 completas de los tres integrantes deben estar integradas antes de esta etapa.

### 1. Instalar dependencias

Desde la raíz del repositorio:

```powershell
cd segunda-entrega
npm ci
```

Si ya están instaladas y el lockfile no cambió, no hace falta repetirlo.
La etapa 3 no agrega dependencias ni cambia versiones. No se necesita instalar React o Sass globalmente.
En PowerShell se puede usar `npm.cmd` en lugar de `npm`.

### 2. Iniciar la API

En una terminal ubicada en `segunda-entrega`:

```powershell
npm run services
```

Dejarla abierta. La API responde en http://127.0.0.1:4000/productos y lee `src/data/db.json`.
Desde esta etapa el servicio es necesario para cargar los productos de React.

### 3. Iniciar el sitio

En otra terminal ubicada en `segunda-entrega`:

```powershell
npm run dev
```

Abrir la dirección que informa Vite, normalmente http://127.0.0.1:5173/.
Dejar abiertas ambas terminales. Para detener cada servidor, presionar Ctrl+C en su terminal.
Si Vite informa otro puerto, usar esa dirección. Live Server no procesa JSX.

### Direcciones habituales

| Página              | Dirección con Vite activo                               |
| ------------------- | ------------------------------------------------------- |
| Inicio              | http://127.0.0.1:5173/#/                                |
| Nosotros            | http://127.0.0.1:5173/#/nosotros                        |
| Todos los productos | http://127.0.0.1:5173/#/productos                       |
| Remeras             | http://127.0.0.1:5173/#/productos?categoria=remeras     |
| Ficha de ejemplo    | http://127.0.0.1:5173/#/producto/remera-highway-grooves |
| Carrito HTML        | http://127.0.0.1:5173/sitio-html/carrito.html           |
| API                 | http://127.0.0.1:4000/productos                         |

Si la API está apagada, aparece un aviso y un botón para reintentar.
Iniciar el servicio y presionar ese botón permite recuperar los productos.
El sitio no reemplaza una consulta fallida con un catálogo local.

### Otra dirección de API

Por defecto se usa http://127.0.0.1:4000. Para cambiarla, copiar `.env.example` a `.env`,
modificar `VITE_API_URL` y reiniciar Vite. Los archivos .env locales no se suben.
Las variables VITE_ son públicas: no deben contener claves ni contraseñas.

### 3. Iniciar la aplicación

| Comando                | Uso                                                    |
| ---------------------- | ------------------------------------------------------ |
| `npm run services`     | Iniciar json-server.                                   |
| `npm run dev`          | Iniciar React con Vite.                                |
| `npm run build`        | Compilar en dist.                                      |
| `npm run preview`      | Probar la compilación; también necesita la API activa. |
| `npm run lint`         | Revisar errores con ESLint.                            |
| `npm run format:check` | Comprobar formato con Prettier.                        |
| `npm run format`       | Aplicar formato.                                       |
| `npm audit`            | Consultar avisos de dependencias.                      |

```powershell
npm run dev
```

| Ubicación                | Contenido                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `src/App.jsx`            | Rutas, carga de productos y estado compartido.                                            |
| `src/api/productos.js`   | GET de productos con fetch y async/await.                                                 |
| `src/components`         | Cabecera, Pie, Boton, Tarjeta, TarjetaProducto, Filtros, EstadoProductos y FichaProducto. |
| `src/layouts/Layout.jsx` | Outlet, metadatos, foco y desplazamiento entre páginas.                                   |
| `src/pages`              | Inicio, Nosotros, Catalogo, Producto y NoEncontrada.                                      |
| `src/styles`             | Todos los estilos de React, separados en módulos Sass.                                    |
| `src/data/db.json`       | Los 26 productos del servicio simulado.                                                   |
| `src/data/catalogo.js`   | Categorías, géneros y órdenes disponibles.                                                |
| `src/data/inicio.js`     | Destacados y estilos de Inicio.                                                           |
| `src/utils`              | Filtros, precios, enlaces y compatibilidad del carrito.                                   |
| `src/assets`             | Imagen importada desde Inicio.                                                            |
| `public/sitio-html`      | Imágenes y secciones HTML conservadas durante la migración.                               |

Se usan los alias @/ para src y @styles/ para estilos. Las configuraciones de React
están junto a package.json, dentro de segunda-entrega. El README general está en la raíz del repositorio.

## Catálogo, ficha y estado

- App consulta GET /productos al iniciar. La ficha busca el identificador dentro de esa respuesta.
- useState mantiene productos, carga, errores, reintentos y el contador del carrito.
- useEffect consulta el servicio y sincroniza el contador al volver del HTML.
- HashRouter permite recargar rutas sin reglas especiales del servidor estático.
- useSearchParams conserva los filtros en la URL al recargar o regresar desde una ficha.
- Los controles actualizan resultados con onChange. Los precios muestran errores en tiempo real.
- Filtros: categoría, género, artista, precios, stock, color y talle, además del orden.
- Limpiar filtros conserva la categoría. Cambiar de categoría reinicia las demás preferencias.
- TarjetaProducto se reutiliza en Inicio y Catalogo, con props y children de Tarjeta.
- FichaProducto controla talle, color y cantidad mediante useState.
- Las cantidades deben ser enteras de 1 a 10. La misma variante puede acumular hasta 10 unidades.
- Las variantes con otro talle o color ocupan filas distintas. No se puede comprar un producto agotado.
- Un identificador inexistente muestra un aviso y el enlace al catálogo.

El carrito guarda retrowave-carrito como una lista de `{ id, talle, color, cantidad }`.
Se mantiene ese formato para que el carrito HTML lea las compras de React.
utils/carrito.js consulta la copia del catálogo local solo para validar el almacenamiento heredado;
la presentación de productos en React utiliza la API. Esta compatibilidad se revisará al migrar el carrito.
El código RETRO10 sigue aplicando un 10 % en el carrito HTML.
No hay pedidos, cobros ni cuentas reales, y no se guardan contraseñas.

## Estilos y accesibilidad

Los estilos de React están en src/styles y usan Sass con variables, anidación y @use.
El HTML pendiente conserva su CSS. La navbar sigue fija y los botones conservan contraste en hover y foco.
Las imágenes tienen alt, los campos tienen label y los errores usan aria-describedby y aria-invalid.
Los mensajes de carga y compra utilizan regiones de estado. Se puede saltar al contenido con teclado.
La posición y el foco cambian al navegar, sin saltar al inicio al escribir un filtro.

## Verificación de la etapa 3

El 5 de noviembre de 2026 se comprobaron ESLint, Prettier y la compilación de Vite.
Se revisaron las 26 fichas, sus fotos y títulos, filtros combinados, recarga, regreso al catálogo,
resultados vacíos, precios inválidos, producto inexistente y las dos prendas agotadas.
Se probaron compras con variantes, acumulación y límite de cantidades, contador,
carrito HTML, descuento RETRO10 y limpieza de los productos de prueba.
La prueba con la API apagada mostró el error esperado y permitió recuperar la carga mediante reintento.
Se realizaron 14 comprobaciones adicionales de lógica y del servicio.
La revisión del compilado en el navegador integrado no mostró errores de consola ni desborde horizontal.
Los fallos de conexión provocados al apagar la API se registraron por separado.
npm audit informó 0 vulnerabilidades dentro de segunda-entrega. Las versiones no cambiaron.
Las pruebas en otros navegadores quedan pendientes para la revisión final.

## Trabajo en equipo y próximos pasos

Los paquetes de la etapa 3 contienen solo sus diferencias respecto de la etapa 2 completa.
Los tres aportes de las etapas anteriores deben estar integrados antes de subir estos cambios.
Orden de integración de esta etapa: Emi, Clari y Octa. El último aporte activa las páginas preparadas.
Subir solo el código y documentación indicados en el paquete de cada persona.
node_modules, dist, ZIP, respaldos y archivos de entorno locales quedan fuera de los commits.

- Etapa 4: migrar carrito y formularios a React, con persistencia y validación en tiempo real.
- Etapa 5: revisión final y preparación de GitHub Pages y del servicio de productos.

La segunda entrega todavía no está terminada. GitHub Pages por sí solo no ejecuta json-server;
la publicación de React y la dirección de su API se prepararán en la etapa final.

## Material de clase

- [React](https://ucc-tallerdesarrolloweb.github.io/filminas/U6_react.html#/).
- [Sass](https://ucc-tallerdesarrolloweb.github.io/filminas/U5_preprocesadoresCSS.html#/).
- [APIs simuladas](https://ucc-tallerdesarrolloweb.github.io/filminas/U7_mock-api.html#/).
- [Consignas](https://ucc-tallerdesarrolloweb.github.io/filminas/Proyecto.html#/).
