import datos from "@/data/db.json";

/**
 * Lee las variantes válidas guardadas por el carrito actual.
 * @returns {Array} Productos, talles, colores y cantidades conservados.
 */
export const leerCarrito = () => {
    try {
        const carrito = JSON.parse(localStorage.getItem("retrowave-carrito"));
        if (!Array.isArray(carrito)) return [];
        return carrito.filter((item) => {
            if (item === null || typeof item !== "object") return false;
            const producto = datos.productos.find((actual) => actual.id === item.id);
            return (
                producto?.disponible &&
                producto.talles.includes(item.talle) &&
                producto.colores.includes(item.color) &&
                Number.isInteger(item.cantidad) &&
                item.cantidad >= 1 &&
                item.cantidad <= 10
            );
        });
    } catch {
        return [];
    }
};

/**
 * Cuenta las unidades del carrito compartido durante la migración.
 * @returns {number} Cantidad total de unidades.
 */
export const leerUnidadesCarrito = () => leerCarrito().reduce((total, item) => total + item.cantidad, 0);

/**
 * Valida una cantidad escrita en la ficha.
 * @param {string} valor - Valor del campo de cantidad.
 * @returns {string} Mensaje de error o texto vacío.
 */
export const validarCantidad = (valor) => {
    if (valor.trim() === "" || !Number.isInteger(Number(valor)) || Number(valor) < 1 || Number(valor) > 10) {
        return "Ingresá una cantidad entera entre 1 y 10.";
    }
    return "";
};

/**
 * Guarda una variante o acumula unidades para que el carrito HTML pueda leerla.
 * @param {object} producto - Producto de la API.
 * @param {string} talle - Talle elegido.
 * @param {string} color - Color elegido.
 * @param {number} cantidad - Unidades solicitadas.
 * @returns {void}
 */
export const agregarProducto = (producto, talle, color, cantidad) => {
    if (!producto.disponible) throw new Error("Este producto está agotado.");
    if (!producto.talles.includes(talle) || !producto.colores.includes(color))
        throw new Error("Elegí opciones disponibles para este producto.");
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10)
        throw new Error("Ingresá una cantidad entera entre 1 y 10.");
    const carrito = leerCarrito();
    const existente = carrito.find(
        (item) => item.id === producto.id && item.talle === talle && item.color === color,
    );
    if (existente) {
        if (existente.cantidad + cantidad > 10)
            throw new Error(
                "Podés tener hasta 10 unidades de la misma combinación de producto, talle y color.",
            );
        existente.cantidad += cantidad;
    } else {
        carrito.push({ id: producto.id, talle, color, cantidad });
    }
    try {
        localStorage.setItem("retrowave-carrito", JSON.stringify(carrito));
    } catch {
        throw new Error("El navegador no pudo guardar el carrito. Revisá los permisos de almacenamiento.");
    }
};
