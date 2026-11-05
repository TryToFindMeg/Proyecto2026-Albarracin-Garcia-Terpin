import { leerTextoLocal } from "@/utils/almacenamiento.js";

/**
 * Recupera variantes guardadas sin depender de una copia local de los productos.
 * @returns {Array} Variantes con identificador, talle, color y cantidad válidos.
 */
export const leerCarrito = () => {
    try {
        const datos = JSON.parse(leerTextoLocal("retrowave-carrito"));
        if (!Array.isArray(datos)) return [];
        const carrito = [];
        for (const item of datos) {
            if (
                !item ||
                typeof item.id !== "string" ||
                !item.id ||
                typeof item.talle !== "string" ||
                !item.talle ||
                typeof item.color !== "string" ||
                !item.color ||
                !Number.isInteger(item.cantidad) ||
                item.cantidad < 1 ||
                item.cantidad > 10
            )
                continue;
            const existente = carrito.find(
                (actual) =>
                    actual.id === item.id && actual.talle === item.talle && actual.color === item.color,
            );
            if (existente) existente.cantidad = Math.min(10, existente.cantidad + item.cantidad);
            else carrito.push({ id: item.id, talle: item.talle, color: item.color, cantidad: item.cantidad });
        }
        return carrito;
    } catch {
        return [];
    }
};

/** Recupera el carrito y el código de descuento usados por las etapas anteriores. */
export const leerSeleccion = () => {
    const carrito = leerCarrito();
    return {
        carrito,
        codigo: carrito.length > 0 && leerTextoLocal("retrowave-descuento") === "RETRO10" ? "RETRO10" : "",
    };
};

/** Guarda ambas claves y conserva su contenido anterior si una escritura falla. */
export const guardarSeleccion = ({ carrito, codigo }) => {
    let anteriorCarrito;
    let anteriorCodigo;
    try {
        anteriorCarrito = localStorage.getItem("retrowave-carrito");
        anteriorCodigo = localStorage.getItem("retrowave-descuento");
    } catch {
        throw new Error("El navegador no permite acceder al carrito guardado.");
    }
    try {
        localStorage.setItem("retrowave-carrito", JSON.stringify(carrito));
        if (carrito.length > 0 && codigo === "RETRO10") localStorage.setItem("retrowave-descuento", codigo);
        else localStorage.removeItem("retrowave-descuento");
    } catch {
        try {
            if (anteriorCarrito === null) localStorage.removeItem("retrowave-carrito");
            else localStorage.setItem("retrowave-carrito", anteriorCarrito);
            if (anteriorCodigo === null) localStorage.removeItem("retrowave-descuento");
            else localStorage.setItem("retrowave-descuento", anteriorCodigo);
        } catch {
            /* El aviso permite informar también un bloqueo persistente del navegador. */
        }
        throw new Error("El navegador no pudo guardar el carrito. Revisá los permisos de almacenamiento.");
    }
};

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
