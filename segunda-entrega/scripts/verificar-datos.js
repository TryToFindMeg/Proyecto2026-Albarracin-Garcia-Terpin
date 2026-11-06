import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, sep } from "node:path";
import { validarProductos } from "../src/utils/productos.js";
import { categorias, generos } from "../src/data/catalogo.js";

const raiz = fileURLToPath(new URL("../", import.meta.url));
const datos = JSON.parse(await readFile(resolve(raiz, "src/data/db.json"), "utf8"));
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
console.log(`Datos correctos: ${productos.length} productos, opciones y fotografías disponibles.`);
