import { readFile } from "node:fs/promises";

/** Lee la base JSON para las comprobaciones y la publicación ejecutadas con Node. */
export const leerBaseDatos = async () => {
    const archivo = new URL("../data/db.json", import.meta.url);
    return JSON.parse(await readFile(archivo, "utf8"));
};
