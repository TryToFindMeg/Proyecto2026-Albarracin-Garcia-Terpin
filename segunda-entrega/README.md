# RetroWave — Segunda entrega

**Música · Ropa · Identidad**

Integrantes: Octavio Albarracin, Emi Garcia y Clari Terpin.

## Estado: etapa 4

El sitio actual funciona en React: Inicio, Nosotros, catálogo, ficha de producto, carrito,
Cuenta, Contacto y el formulario de Novedades del pie. Se mantienen el diseño de escritorio,
la navbar fija, las fuentes Shrikhand y DM Sans y las fotografías locales.

La etapa 5 queda pendiente para la revisión final, otros navegadores y la publicación del sitio y su API.

## Instalación y orden de ejecución

Se necesitan Node.js compatible con engines de package.json y npm.
Las etapas 1, 2 y 3 completas del equipo deben estar integradas antes de subir la etapa 4.

### 1. Instalar dependencias

Desde la raíz del repositorio:

```powershell
cd segunda-entrega
npm ci
```

Si ya están instaladas y el lockfile no cambió, no hace falta repetirlo.
La etapa 4 no agrega dependencias ni cambia sus versiones.
En PowerShell se puede usar npm.cmd en lugar de npm. React y Sass no necesitan instalación global.

### 2. Iniciar la API

En una terminal ubicada en segunda-entrega:

```powershell
npm run services
```

Dejarla abierta. json-server responde en http://127.0.0.1:4000/productos y lee src/data/db.json.
La API es necesaria para mostrar productos y calcular el carrito con sus precios actuales.

### 3. Iniciar el sitio

En otra terminal ubicada en segunda-entrega:

```powershell
npm run dev
```

Abrir la dirección que indique Vite, normalmente http://127.0.0.1:5173/.
Dejar ambas terminales abiertas. Ctrl+C detiene cada servicio en su terminal.
No utilizar Live Server ni abrir index.html con doble clic: Vite procesa el JSX de React.
Usar la misma dirección y puerto para recuperar las preferencias de localStorage.

### Rutas habituales

| Página   | Dirección con Vite activo                               |
| -------- | ------------------------------------------------------- |
| Inicio   | http://127.0.0.1:5173/#/                                |
| Nosotros | http://127.0.0.1:5173/#/nosotros                        |
| Catálogo | http://127.0.0.1:5173/#/productos                       |
| Remeras  | http://127.0.0.1:5173/#/productos?categoria=remeras     |
| Ficha    | http://127.0.0.1:5173/#/producto/remera-highway-grooves |
| Carrito  | http://127.0.0.1:5173/#/carrito                         |
| Cuenta   | http://127.0.0.1:5173/#/cuenta                          |
| Contacto | http://127.0.0.1:5173/#/contacto                        |

Si el servicio está apagado, se presenta un error con botón de reintento. Las compras guardadas
no se borran por un error de la API. Cuenta, Contacto y Novedades funcionan sin consultar ese servicio.

Para otra dirección de API, copiar .env.example a .env, ajustar VITE_API_URL y reiniciar Vite.
Los archivos .env locales no se suben. VITE_ contiene información pública, nunca claves o contraseñas.

## Comandos

| Comando                | Uso                                                             |
| ---------------------- | --------------------------------------------------------------- |
| `npm run services`     | Iniciar json-server.                                            |
| `npm run dev`          | Iniciar React con Vite.                                         |
| `npm run build`        | Compilar en dist.                                               |
| `npm run preview`      | Probar la compilación; también requiere API para los productos. |
| `npm run lint`         | Revisar con ESLint.                                             |
| `npm run format:check` | Comprobar formato con Prettier.                                 |
| `npm run format`       | Aplicar formato.                                                |
| `npm audit`            | Consultar avisos de dependencias.                               |

## Organización

| Ubicación        | Contenido                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------ |
| `src/App.jsx`    | Rutas, productos y selección de compra compartida.                                         |
| `src/api`        | GET de productos mediante fetch y async/await.                                             |
| `src/pages`      | Inicio, Nosotros, Catalogo, Producto, Carrito, Cuenta, Contacto y NoEncontrada.            |
| `src/layouts`    | Layout con Outlet, metadatos, foco y desplazamiento.                                       |
| `src/components` | Cabecera, Pie, Boton, Tarjeta, Campo, filtros, ficha, carrito y formularios reutilizables. |
| `src/data`       | db.json, opciones de filtros, destacados y datos de formularios.                           |
| `src/utils`      | Precios, filtros, validaciones, almacenamiento y operaciones del carrito.                  |
| `src/styles`     | Todos los estilos, en módulos SCSS con variables y @use.                                   |
| `src/assets`     | Imagen importada desde Inicio.                                                             |
| `public`         | Favicon y fotografías estáticas locales.                                                   |

Los imports usan los alias @/ y @styles/. La configuración de React está junto a package.json,
directamente en segunda-entrega. El README general pertenece a la raíz del repositorio.
Los archivos HTML, CSS y JavaScript antiguos de public/sitio-html se retiraron al completar la migración.
Sus imágenes permanecen en public/sitio-html/imagenes; los enlaces actuales usan las rutas React.

## Carrito y persistencia

App mantiene la selección con useState y la comparte mediante props. Las operaciones del carrito
crean copias del estado. No se importa una copia local del catálogo en el frontend: los precios y
la disponibilidad se comprueban con los productos recibidos de la API.

- Una variante se identifica por producto, talle y color. La misma variante acumula hasta 10 unidades.
- Las cantidades se validan con onChange, deben ser enteras de 1 a 10 y se guardan con Actualizar carrito.
- Los importes reflejan las cantidades editadas; el contador de la navbar refleja las unidades guardadas.
- Eliminar una fila conserva las cantidades guardadas de las otras. Restablecer devuelve todas a 1.
- RETRO10 aplica un 10 %. Dejar el campo vacío y aplicar quita el cupón.
- Vaciar solicita confirmación. Escape o Cancelar conserva las compras.
- El resumen es una demostración: no crea pedidos ni pagos.
- Si una variante dejó de estar disponible, se informa y se puede eliminar. Un error de API no borra compras.
- Las pestañas se sincronizan mediante el evento storage y al volver a la ventana.

Se conserva retrowave-carrito como `{ id, talle, color, cantidad }[]` y retrowave-descuento como texto.
Los datos de las etapas anteriores siguen siendo compatibles si se usa el mismo origen del navegador.
Los errores de escritura se muestran sin anunciar un guardado exitoso. Si una de las dos claves falla,
se intenta restaurar su contenido anterior.

## Formularios y accesibilidad

Campo reutiliza label, ayudas y errores en Cuenta, Contacto y Novedades. Los controles son React
controlados; los errores aparecen al editar o al intentar enviar y se asocian mediante aria-invalid,
aria-describedby y role=alert. Un envío inválido enfoca el primer campo a corregir.

Ingreso valida email y contraseña de prueba de 8 a 64 caracteres. Recordarme guarda solo el email
en retrowave-email-recordado. Limpiar campos también elimina esa preferencia. El registro comprueba
la coincidencia de contraseñas. No se guardan contraseñas ni se crean cuentas o sesiones reales.
Recuperación, Contacto y Novedades muestran confirmaciones de demostración y no envían correos.

El diálogo de vaciado y resumen utiliza dialog con foco contenido y cierre por Escape.
Los botones mantienen contraste al pasar el mouse y foco visible. Las imágenes tienen alt,
las tablas tienen encabezados y el sitio ofrece un enlace para saltar al contenido.

## Verificación de esta etapa

El 5 de noviembre de 2026 se comprobaron ESLint, formato, compilación y el navegador integrado.
Se probaron variantes, límites y actualización de cantidades, cupón, recarga, eliminación,
restablecimiento, vaciado con cancelación, resumen, sincronización entre pestañas y recuperación de API.
También se verificaron los formularios, sus errores en tiempo real, el email recordado y su limpieza.
Se realizaron 15 comprobaciones adicionales de lógica, validaciones y almacenamiento.
La compilación se recorrió por las rutas principales y se revisó la consola por separado de la
prueba con la API apagada. Las pruebas en otros navegadores quedan para la etapa 5.
npm audit informó 0 vulnerabilidades dentro de segunda-entrega. Package y lockfile no cambiaron.

## Trabajo en equipo

Los paquetes de esta etapa contienen solo las diferencias respecto del sitio completo de etapa 3.
Cada integrante sube su parte desde su cuenta y su rama. Primero deben estar integradas las etapas
anteriores de los tres. Orden de merge de etapa 4: Emi, Clari y Octa.
Octa activa las páginas del conjunto y retira los 14 archivos antiguos; esas eliminaciones están
incluidas expresamente en sus instrucciones. Las fotos se conservan.
Los paquetes y copias de etapas anteriores permanecen separados para evitar mezclar versiones.
node_modules, dist, ZIP, respaldos y archivos .env locales no se suben.

## Pendiente: etapa 5

Revisión final de requisitos y accesibilidad, pruebas en otros navegadores y publicación.
GitHub Pages no ejecuta json-server: el despliegue necesita una dirección de API accesible.
El proyecto todavía no se considera publicado ni con la revisión final terminada.

## Material de clase

- [React](https://ucc-tallerdesarrolloweb.github.io/filminas/U6_react.html#/).
- [Sass](https://ucc-tallerdesarrolloweb.github.io/filminas/U5_preprocesadoresCSS.html#/).
- [APIs simuladas](https://ucc-tallerdesarrolloweb.github.io/filminas/U7_mock-api.html#/).
- [Consignas](https://ucc-tallerdesarrolloweb.github.io/filminas/Proyecto.html#/).
