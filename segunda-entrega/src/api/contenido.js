import { URL_API } from "@/api/configuracion.js";
import { validarContenido } from "@/utils/contenido.js";

const URL_CONTENIDO = URL_API ? `${URL_API}/contenido` : `${import.meta.env.BASE_URL}api/contenido.json`;

/** Obtiene del JSON las opciones, destacados y textos usados por las páginas. */
export const obtenerContenido = async () => {
    const respuesta = await fetch(URL_CONTENIDO);
    if (!respuesta.ok) throw new Error("No pudimos consultar el contenido del sitio.");
    return validarContenido(await respuesta.json());
};
