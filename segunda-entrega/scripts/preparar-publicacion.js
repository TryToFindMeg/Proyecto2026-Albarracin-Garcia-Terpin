import { mkdir, readdir, rename, writeFile, cp, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, basename, sep } from "node:path";
import { productos, contenido } from "./verificar-datos.js";

const raiz = fileURLToPath(new URL("../", import.meta.url));
const salida = resolve(raiz, "dist");
const segunda = resolve(salida, "segunda-entrega");
const primera = resolve(raiz, "../primera-entrega");
await access(resolve(salida, "index.html"));
await access(resolve(primera, "index.html"));
const archivos = await readdir(salida);
await mkdir(segunda);
for (const nombre of archivos) {
    const origen = resolve(salida, nombre);
    const destino = resolve(segunda, nombre);
    if (!origen.startsWith(salida + sep) || !destino.startsWith(segunda + sep))
        throw new Error("Destino de publicación incorrecto.");
    await rename(origen, destino);
}
await mkdir(resolve(segunda, "api"));
await writeFile(resolve(segunda, "api/productos.json"), JSON.stringify(productos, null, 2) + "\n");
await writeFile(resolve(segunda, "api/contenido.json"), JSON.stringify(contenido, null, 2) + "\n");
const excluidos = ["node_modules", "dist"];
await cp(primera, resolve(salida, "primera-entrega"), {
    recursive: true,
    filter: (ruta) => !basename(ruta).startsWith(".") && !excluidos.includes(basename(ruta)),
});
await writeFile(resolve(salida, ".nojekyll"), "");
await writeFile(
    resolve(salida, "index.html"),
    `<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0; url=./segunda-entrega/">
    <title>RetroWave</title>
</head>
<body>
    <p><a href="./segunda-entrega/">Abrir RetroWave — Segunda entrega</a></p>
    <p><a href="./primera-entrega/">Consultar primera entrega</a></p>
</body>
</html>
`,
);
console.log(
    "Publicación preparada en dist: primera entrega, segunda entrega y mocks GET de productos y contenido.",
);
