/** Comprueba los datos necesarios para mostrar un catálogo recibido por HTTP. */
export const validarProductos = (datos) => {
    if (!Array.isArray(datos)) throw new Error("El servicio no devolvió una lista de productos.");
    /** Comprueba que una lista de opciones tenga textos únicos y no esté vacía. */
    const opcionesValidas = (opciones) =>
        Array.isArray(opciones) &&
        opciones.length > 0 &&
        opciones.every((opcion) => typeof opcion === "string" && opcion.trim() !== "") &&
        new Set(opciones).size === opciones.length;
    const textos = ["id", "nombre", "descripcion", "categoria", "genero", "artista", "imagen", "alt"];
    const incorrecto = datos.some(
        (producto) =>
            !producto ||
            textos.some((campo) => typeof producto[campo] !== "string" || !producto[campo].trim()) ||
            !Number.isFinite(producto.precio) ||
            producto.precio < 0 ||
            !Number.isFinite(producto.orden) ||
            typeof producto.disponible !== "boolean" ||
            typeof producto.nuevo !== "boolean" ||
            !opcionesValidas(producto.talles) ||
            !opcionesValidas(producto.colores),
    );
    if (incorrecto || new Set(datos.map((producto) => producto.id)).size !== datos.length)
        throw new Error("El catálogo contiene productos incompletos o identificadores repetidos.");
    return datos;
};
