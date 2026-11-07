import { leerTextoLocal, guardarTextoLocal } from "@/utils/almacenamiento.js";

/** Recupera solamente la preferencia de cupón; las filas se consultan a la API. */
export const leerCodigo = () => (leerTextoLocal("retrowave-api-descuento") === "RETRO10" ? "RETRO10" : "");

/** Conserva el cupón sin modificar las claves del carrito de primera entrega. */
export const guardarCodigo = (codigo) =>
    guardarTextoLocal("retrowave-api-descuento", codigo === "RETRO10" ? codigo : null);

/** Valida una cantidad del formulario sin borrar lo que está escribiendo el usuario. */
export const validarCantidad = (valor) => {
    if (
        String(valor).trim() === "" ||
        !Number.isInteger(Number(valor)) ||
        Number(valor) < 1 ||
        Number(valor) > 10
    )
        return "Ingresá una cantidad entera entre 1 y 10.";
    return "";
};

/** Comprueba una variante contra los productos que llegaron desde la API. */
export const varianteDisponible = (item, productos) => {
    const producto = productos.find((actual) => actual.id === item.id);
    return (
        !!producto?.disponible &&
        producto.talles.includes(item.talle) &&
        producto.colores.includes(item.color)
    );
};

/** Devuelve una copia del carrito con la compra agregada, sin mutar el estado de React. */
export const sumarProducto = (carrito, producto, talle, color, cantidad) => {
    if (!producto.disponible) throw new Error("Este producto está agotado.");
    if (!producto.talles.includes(talle) || !producto.colores.includes(color))
        throw new Error("Elegí opciones disponibles para este producto.");
    if (!Number.isInteger(cantidad) || validarCantidad(cantidad))
        throw new Error("Ingresá una cantidad entera entre 1 y 10.");
    const existente = carrito.find(
        (item) => item.id === producto.id && item.talle === talle && item.color === color,
    );
    if (existente && existente.cantidad + cantidad > 10)
        throw new Error("Podés tener hasta 10 unidades de la misma combinación de producto, talle y color.");
    if (!existente) return [...carrito, { id: producto.id, talle, color, cantidad }];
    return carrito.map((item) =>
        item === existente ? { ...item, cantidad: item.cantidad + cantidad } : item,
    );
};

/** Calcula importes con los precios de la API y redondea a centavos. */
export const calcularTotales = (carrito, productos, codigo) => {
    const subtotal =
        Math.round(
            carrito.reduce(
                (total, item) =>
                    total + (productos.find((p) => p.id === item.id)?.precio || 0) * item.cantidad,
                0,
            ) * 100,
        ) / 100;
    const descuento = codigo === "RETRO10" ? Math.round(subtotal * 10) / 100 : 0;
    return { subtotal, descuento, total: Math.round((subtotal - descuento) * 100) / 100 };
};

/** Valida el cupón mientras se escribe; el texto vacío permite quitarlo. */
export const validarCodigo = (valor) =>
    valor.trim() === "" || valor.trim().toUpperCase() === "RETRO10"
        ? ""
        : "Ese código no es válido. Para esta prueba podés usar RETRO10.";
