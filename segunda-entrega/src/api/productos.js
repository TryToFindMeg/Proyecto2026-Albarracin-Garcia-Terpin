const URL_API = (import.meta.env.VITE_API_URL || "http://127.0.0.1:4000").replace(/\/+$/, "");

/**
 * Consulta el catálogo del servicio simulado.
 * @returns {Promise<Array>} Productos devueltos por json-server.
 */
export const obtenerProductos = async () => {
    const respuesta = await fetch(`${URL_API}/productos`);
    if (!respuesta.ok) {
        throw new Error("No pudimos consultar el catálogo.");
    }
    const productos = await respuesta.json();
    if (!Array.isArray(productos)) {
        throw new Error("El servicio no devolvió una lista de productos.");
    }
    return productos;
};
