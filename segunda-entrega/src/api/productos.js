import { validarProductos } from "@/utils/productos.js";

const URL_CONFIGURADA = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
const URL_PRODUCTOS = URL_CONFIGURADA
    ? `${URL_CONFIGURADA}/productos`
    : import.meta.env.DEV
      ? "http://127.0.0.1:4000/productos"
      : `${import.meta.env.BASE_URL}api/productos.json`;

/** Consulta el servicio de desarrollo o el mock estático incluido en la publicación. */
export const obtenerProductos = async () => {
    const respuesta = await fetch(URL_PRODUCTOS);
    if (!respuesta.ok) throw new Error("No pudimos consultar el catálogo.");
    return validarProductos(await respuesta.json());
};
