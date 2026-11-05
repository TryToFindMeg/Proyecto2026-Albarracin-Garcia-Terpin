import datos from "@/data/db.json";

/**
 * Cuenta las unidades válidas del carrito que todavía utiliza el sitio HTML.
 * @returns {number} Cantidad de unidades guardadas en este navegador.
 */
export const leerUnidadesCarrito = () => {
    try {
        const carrito = JSON.parse(localStorage.getItem("retrowave-carrito"));
        if (!Array.isArray(carrito)) {
            return 0;
        }
        let unidades = 0;
        for (const item of carrito) {
            if (item === null || typeof item !== "object") {
                continue;
            }
            const producto = datos.productos.find((productoActual) => productoActual.id === item.id);
            if (
                producto?.disponible &&
                producto.talles.includes(item.talle) &&
                producto.colores.includes(item.color) &&
                Number.isInteger(item.cantidad) &&
                item.cantidad >= 1 &&
                item.cantidad <= 10
            ) {
                unidades += item.cantidad;
            }
        }
        return unidades;
    } catch {
        return 0;
    }
};
