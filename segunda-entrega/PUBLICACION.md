# Publicar RetroWave

La etapa 5 prepara la publicación; estos pasos los realiza el equipo después de integrar sus PR.
No hay que subir dist o node_modules ni instalar paquetes globales.

## 1. Integrar y comprobar

Integrar las etapas 1 a 4 de los tres integrantes. Después integrar etapa 5 en orden Emi, Clari y Octa.
La raíz debe conservar primera-entrega junto a segunda-entrega y .github/workflows/retrowave.yml.
Comprobar el resultado final desde una copia actualizada de main:

```powershell
cd segunda-entrega
npm ci
npm run check
npm audit
npm run preview
```

Abrir la dirección de preview. La raíz redirige al React de segunda-entrega y el catálogo debe cargar
sin iniciar json-server. Comprobar también /primera-entrega/.

## 2. Configurar GitHub Pages

En el repositorio, abrir Settings → Pages → Build and deployment.
En Source elegir GitHub Actions. Si hay una publicación anterior por rama, este cambio
sustituye ese método cuando se ejecute el nuevo workflow. No borrar la primera entrega.

La configuración sigue [la guía oficial de Vite para GitHub Pages](https://vite.dev/guide/static-deploy.html).
La aplicación usa base relativa y HashRouter para conservar los recursos y las rutas bajo la carpeta del repositorio.

## 3. Ejecutar la publicación

Abrir Actions → Revisar y publicar RetroWave → Run workflow.
Seleccionar main y confirmar Run workflow. No ejecutarlo desde las ramas personales.
Si no aparece, comprobar que el workflow ya esté integrado en main y que Actions esté habilitado.

Los PR y push a main ejecutan solamente las comprobaciones. Publicar requiere esta ejecución manual.
El job revisar instala las versiones del lockfile, ejecuta check y audit y prepara el artefacto.
Solo si ese job termina correctamente, publicar envía el artefacto a GitHub Pages.
No se necesitan claves de API ni tokens personales; el workflow utiliza los permisos de GitHub Actions.
La automatización se comprobó localmente por su estructura, no se ejecutó en GitHub durante la preparación.

## 4. Comprobar las direcciones

Después de que el workflow termine, verificar en el navegador:

| Dirección prevista                                                                                                           | Resultado                          |
| ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [Raíz](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/)                                                | Redirige a segunda-entrega.        |
| [React](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/segunda-entrega/)                               | Abre Inicio.                       |
| [Mock de productos](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/segunda-entrega/api/productos.json) | Devuelve un array de 26 productos. |
| [Primera entrega](https://trytofindmeg.github.io/Proyecto2026-Albarracin-Garcia-Terpin/primera-entrega/)                     | Conserva la versión HTML.          |

Estas son las direcciones esperadas; hay que comprobarlas al publicar.
Probar recarga del catálogo y de una ficha, filtros, fotos y formularios de demostración.
Con VITE_API_URL vacío, comprobar que el carrito explique que se prueba en la versión local
y que no permita agregar compras. Las operaciones de compra, cupón y vaciado se prueban
localmente con json-server y Vite siguiendo el README.
Hacer la revisión en Chrome, Firefox y Edge y registrar versión, fecha y resultado en REVISION.md.
Una prueba local no reemplaza esta comprobación pública.

## Catálogo publicado

GitHub Pages sirve archivos y no ejecuta json-server. Por eso el build genera un mock de lectura
en segunda-entrega/api/productos.json desde src/data/db.json, consultado con fetch y async/await.
También genera api/contenido.json con opciones, destacados y configuración de formularios;
React lo obtiene con obtenerContenido desde src/api/contenido.js.
El visitante no depende de la PC del equipo ni del puerto 4000. Cambiar db.json requiere otro build y despliegue.
El carrito se conecta a json-server en la ejecución local. La publicación estática no ofrece
ese servicio de escritura: muestra un aviso y no utiliza localStorage como sustituto del carrito API.
No se ofrecen escrituras de catálogo, autenticación, correos ni pagos.

El workflow deja VITE_API_URL vacío para usar este mock publicado. Para una API externa, modificar
esa configuración deliberadamente con una dirección pública HTTPS que responda a GET /productos, GET /contenido
y GET, POST, PATCH y DELETE del recurso /carrito. Ese alojamiento no forma parte del fix local.
Las [variables VITE_ son públicas](https://vite.dev/guide/env-and-mode.html); no deben contener secretos.

## Si falla

- Revisar el primer error del job revisar: no publicar si check o audit falla.
- Si faltan fotos, ejecutar npm run check:datos y revisar las rutas y mayúsculas de los archivos.
- Si el navegador solicita localhost:4000 en producción, revisar VITE_API_URL y recompilar.
- Si falla Pages, comprobar Source: GitHub Actions y ejecutar manualmente desde main.
- Si una ruta no abre, utilizar la dirección que incluye /segunda-entrega/#/.
- Para volver al código anterior, preparar un commit de reversión revisado por el equipo y publicar de nuevo;
  evitar force push y no borrar el historial.
