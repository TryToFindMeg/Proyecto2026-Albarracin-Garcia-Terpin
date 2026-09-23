# Revisión de requisitos — etapa HTML

Revisión realizada el **23 de septiembre de 2026** contra [Requerimientos.md](Requerimientos.md).

**Resultado:** la estructura HTML, las imágenes y la accesibilidad básica cumplen los puntos revisados. El parcial completo todavía tiene requisitos pendientes. CSS y JavaScript se posponen por pedido del equipo.

La consigna original permanece sin modificar. Las casillas de ese documento no se marcaron automáticamente.

## HTML

| Requisito | Estado | Evidencia |
| --- | --- | --- |
| Etiquetas en minúscula y atributos con valores entre comillas | Cumple | Diez archivos HTML revisados; atributos booleanos con valor vacío entre comillas |
| `title` propio para cada página | Cumple | Título de sección seguido de RetroWave |
| Metadatos de autor, descripción y palabras clave | Corregido | `author`, `description` y `keywords` en las diez páginas |
| Al menos tres etiquetas semánticas diferentes | Cumple | `header`, `nav`, `main`, `section`, `article`, `aside` y `footer`, según el contenido |
| `h1` dentro del encabezado | Corregido | Un único `h1` por página, ubicado dentro de `header` |
| Estructura mediante `div` | Corregido | `div#pagina` y contenedores de encabezado, contenido y pie |
| Tres o más controles para ingresar o seleccionar valores | Cumple en formularios del sitio | Contacto tiene nombre, email, motivo, pedido y mensaje; ambos catálogos tienen opciones seleccionables. El procesamiento se implementará en JS |
| `placeholder` en al menos un campo | Cumple | Nombre, email, número de pedido y mensaje |
| `size` para los inputs | Corregido | `size="28"` en los tipos que admiten este atributo. No se aplica a checkbox o number |
| `maxlength` para limitar textos | Cumple | Límites en nombre, email, contraseña, código, pedido y mensaje; la cantidad numérica usa `min` y `max` |
| Sin exceso de `br` | Cumple | Se usa un salto puntual entre etiqueta y campo; sin cadenas de saltos para maquetar |
| Anidación y cierres correctos | Cumple | Nu Html Checker no detecta errores ni advertencias |
| Sin etiquetas obsoletas | Cumple | No se usan `font`, `center`, `marquee` ni equivalentes |
| IDs únicos | Cumple | No hay identificadores repetidos dentro de una misma página |

## Imágenes y accesibilidad

| Requisito | Estado | Evidencia |
| --- | --- | --- |
| Al menos una imagen en las páginas | Cumple | Todas tienen imagen de marca; los catálogos y páginas editoriales incluyen sus fotos |
| Imágenes dentro de `imagenes` | Cumple | 39 fotos y un favicon SVG, con referencias locales |
| Nombres de imágenes representativos | Corregido | Se reemplazaron nombres numéricos por `buzo-gris-madera.jpeg`, `mujer-tienda-vinilos.jpeg`, etc. |
| Sin videos pesados en el repositorio | Cumple | No se incorporaron videos |
| `alt` en todas las imágenes | Cumple | Descripción en las fotos; `alt=""` en el icono decorativo junto al nombre visible RetroWave para evitar una lectura duplicada |
| `label` con `for` correcto para inputs y selects | Cumple | Se verificaron todas las asociaciones, también en textarea |
| `caption` en tablas | Cumple | Tabla del carrito con título y encabezados `scope` |

## Proyecto general

| Requisito | Estado | Evidencia o pendiente |
| --- | --- | --- |
| Sin descargar una plantilla de sitio | Cumple | HTML específico del proyecto, basado en el contenido de Canva |
| Principal llamada `index` | Cumple | `primera-entrega/index.html` |
| Carpetas adecuadas | Corregido | `imagenes`, `Sketch`, `Mockup`, `fuentes`, `css`, `js` |
| Indentación y código sin errores detectados | Corregido y validado | Cuatro espacios por nivel; validación formal local de las diez páginas |
| Favicon | Corregido | `imagenes/favicon-retrowave.svg`, referenciado desde las diez páginas |
| Fuente externa | Parcial | DM Sans y su licencia están en `fuentes`; su aplicación visual queda pendiente hasta CSS |
| Navegación entre todas las páginas | Cumple | Todas son alcanzables desde el inicio y permiten volver; enlaces de catálogo a detalle y regreso |
| Ortografía y sin Lorem ipsum | Revisado | No se encontró texto Lorem ipsum; nombres de productos en inglés conservados del prototipo |
| Sin código comentado | Cumple | No hay comentarios ni fragmentos desactivados dentro de los HTML |

## Repositorio y documentación

| Requisito | Estado | Evidencia o pendiente |
| --- | --- | --- |
| Repositorio correcto de Classroom | Confirmado por el usuario | `TryToFindMeg/Proyecto2026-Albarracin-Garcia-Terpin`; clon local conectado mediante `origin` |
| README en la raíz | Corregido | Título, autores, contenido, tecnologías, instrucciones, enlace previsto de Pages y estado de publicación |
| Markdown con negrita, H1/H2/H3, enlaces, listas, tabla e índice | Cumple | `README.md` de la raíz |
| Una rama por integrante | Preparado | Ramas `albarracin`, `garcia` y `terpin`; cada integrante debe trabajar en la propia |
| Sin archivos de editor, dependencias o residuos | Corregido | `.gitignore` excluye `.idea`, `.vscode`, `.vsc`, `.DS_Store`, `node_modules` y otros residuos. Las herramientas de revisión quedan fuera del repositorio |
| Conventional Commits | Aplicado a los cambios de esta revisión | El commit original `Initial commit` se conserva sin reescribirlo |
| Al menos 10 commits en al menos 4 días | Pendiente | Al inicio solo existía el commit del 14/09. Se agregaron avances reales el 23/09; faltan más avances y días de trabajo |
| Código integrado en la rama de entrega | Pendiente de revisión e integración | Los cambios se suben a `albarracin`; no se reemplaza automáticamente la rama compartida `main` |
| GitHub Pages publicado | Pendiente de administración | La cuenta tiene permisos de escritura, pero no de administración. Pages no estaba habilitado. Se deja el flujo de publicación en `.github/workflows/pages.yml` |

## Sketch y Mockup

| Requisito | Estado | Acción necesaria |
| --- | --- | --- |
| Sketch desktop/mobile usando el template de la cátedra | Pendiente | Incorporar los dibujos reales hechos sobre ese template, que no está incluido en el repositorio |
| Sketch en PNG/JPG/PDF dentro de `Sketch` | Pendiente | La carpeta y las indicaciones están creadas; faltan los archivos gráficos |
| Mockup hecho con un programa | Referencia disponible | Existe el Canva aportado por el usuario |
| Mockup desktop/mobile en PNG/JPG/PDF dentro de `Mockup` | Pendiente | Exportar las pantallas y completar las variantes mobile; el enlace solo no alcanza |
| Mensajes de error representados en los diseños | Pendiente | Incluir estados de campos incompletos, email y cantidad inválidos, y acceso incorrecto |

## Para las etapas de CSS y JavaScript

Los archivos `css/estilos.css` y `js/main.js` están creados y vacíos. Su existencia **no significa que esos requisitos estén cumplidos**. Todavía no se enlazan al HTML.

- CSS: un archivo externo; selectores por etiqueta, ID y clase; pseudoclases; sin estilos incrustados ni `!important`; diseño consistente y aplicación de DM Sans.
- JavaScript: validación que avise errores y limpie el campo; cálculo o resultado a partir de entradas; funciones flecha en archivo externo; variables con alcance apropiado; sin funciones sin uso ni errores de consola.
- Al implementar JS, respetar la indicación específica de esta cátedra de colocar los manejadores de eventos en el HTML.
- Documentar cada función mediante el formato JSDoc que aparece en la consigna. Hoy no hay funciones JavaScript que documentar.

Los botones deshabilitados son límites explícitos de esta etapa. No se presentan cuentas, compras ni envíos como operaciones reales.

## Verificaciones realizadas

- **Nu Html Checker 26.9.16:** diez páginas, **0 errores y 0 advertencias**.
- **365 referencias locales:** todos los archivos y fragmentos HTML referenciados existen.
- **Navegación:** las diez páginas son alcanzables entre sí mediante los enlaces del sitio.
- **Formularios:** campos etiquetados, IDs únicos, límites de longitud y tamaños en los tipos compatibles.
- **Prueba en navegador:** recorrido de inicio a catálogo y detalle, imágenes cargadas, selección y restablecimiento de filtros, escritura y limpieza del formulario de contacto.
- **Imágenes:** 40 archivos gráficos locales; ninguna referencia sigue usando el nombre numérico anterior.
- Los archivos de requerimientos de primera y segunda entrega se conservaron intactos.

Esta revisión técnica no reemplaza la corrección de la cátedra ni acredita los prototipos, las contribuciones del equipo o la funcionalidad todavía pendiente.
