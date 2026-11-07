import { validarProductos } from "@/utils/productos.js";
import { URL_API } from "@/api/configuracion.js";

const URL_PRODUCTOS = URL_API ? `${URL_API}/productos` : `${import.meta.env.BASE_URL}api/productos.json`;

/** Consulta el servicio de desarrollo o el mock estático incluido en la publicación. */
export const obtenerProductos = async () => {
    const respuesta = await fetch(URL_PRODUCTOS);
    if (!respuesta.ok) throw new Error("No pudimos consultar el catálogo.");
    return validarProductos(await respuesta.json());
};
