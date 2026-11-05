/**
 * Muestra un importe en pesos argentinos.
 * @param {number} importe - Precio que se desea mostrar.
 * @returns {string} Precio con el formato de Argentina.
 */
export const formatearPrecio = (importe) => {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(importe);
};
