import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, sep } from "node:path";
import { validarProductos } from "../src/utils/productos.js";
import { leerBaseDatos } from "../src/api/archivos.js";
import { validarContenido } from "../src/utils/contenido.js";

const raiz = fileURLToPath(new URL("../", import.meta.url));
const datos = await leerBaseDatos();
export const contenido = validarContenido(datos.contenido);
const { categorias, generos } = contenido.catalogo;
export const productos = validarProductos(datos.productos);
if (!productos.length) throw new Error("El catálogo de la entrega debe tener productos.");
const carpetaFotos = resolve(raiz, "public/sitio-html/imagenes");
for (const producto of productos) {
    if (!categorias.some((item) => item.id !== "all" && item.id === producto.categoria))
        throw new Error(`Categoría desconocida: ${producto.nombre}`);
    if (!generos.some((item) => item.id !== "all" && item.id === producto.genero))
        throw new Error(`Género desconocido: ${producto.nombre}`);
    const imagen = resolve(raiz, "public/sitio-html", producto.imagen);
    if (!imagen.startsWith(carpetaFotos + sep))
        throw new Error(`Ruta de imagen incorrecta: ${producto.nombre}`);
    await access(imagen);
}
for (const id of contenido.inicio.destacados) {
    if (!productos.some((producto) => producto.id === id)) throw new Error(`Destacado desconocido: ${id}`);
}
for (const estilo of contenido.inicio.estilos) {
    if (!generos.some((genero) => genero.id === estilo.id))
        throw new Error(`Estilo desconocido: ${estilo.id}`);
    await access(resolve(carpetaFotos, estilo.imagen));
}
console.log(`Datos correctos: ${productos.length} productos, opciones y fotografías disponibles.`);
