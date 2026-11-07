import { URL_API } from "@/api/configuracion.js";
import { guardarTextoLocal } from "@/utils/almacenamiento.js";
import { validarCantidad } from "@/utils/carrito.js";

export const carritoDisponible = URL_API !== "";

/** Conserva un identificador de navegador, sin guardar las compras en localStorage. */
const obtenerSesion = () => {
    let sesion;
    try {
        sesion = localStorage.getItem("retrowave-api-sesion");
    } catch {
        throw new Error(
            "El navegador no permite identificar tu carrito. Revisá sus permisos de almacenamiento.",
        );
    }
    if (!sesion) {
        sesion = crypto.randomUUID();
        guardarTextoLocal("retrowave-api-sesion", sesion);
    }
    return sesion;
};

/** Comprueba la respuesta y distingue el id de la fila del identificador del producto. */
const leerRegistro = (registro, sesion) => {
    if (
        !registro ||
        typeof registro.id !== "string" ||
        !registro.id ||
        registro.sesion !== sesion ||
        typeof registro.productoId !== "string" ||
        !registro.productoId ||
        typeof registro.talle !== "string" ||
        !registro.talle ||
        typeof registro.color !== "string" ||
        !registro.color ||
        typeof registro.cantidad !== "number" ||
        validarCantidad(registro.cantidad)
    )
        throw new Error("El servicio devolvió un producto del carrito con datos incorrectos.");
    return {
        registroId: registro.id,
        id: registro.productoId,
        talle: registro.talle,
        color: registro.color,
        cantidad: registro.cantidad,
    };
};

/** Envía una operación y comprueba el estado HTTP antes de aceptar el resultado. */
const solicitar = async (ruta, metodo = "GET", datos) => {
    if (!carritoDisponible)
        throw new Error("El carrito con API está disponible en la versión local de esta entrega.");
    let respuesta;
    try {
        respuesta = await fetch(`${URL_API}/carrito${ruta}`, {
            method: metodo,
            ...(datos
                ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) }
                : {}),
        });
    } catch (causa) {
        throw new Error(
            "No pudimos contactar el servicio del carrito. Comprobá que esté encendido y volvé a intentar.",
            { cause: causa },
        );
    }
    if (!respuesta.ok)
        throw new Error(
            `No se pudo completar la operación del carrito (${respuesta.status}). Volvé a consultarlo e intentá nuevamente.`,
        );
    return metodo === "DELETE" ? null : respuesta.json();
};

/** GET: recupera las filas del carrito de este navegador desde json-server. */
export const obtenerCarrito = async () => {
    // Comprobar primero la configuración evita crear una sesión en el sitio estático.
    if (!carritoDisponible) return solicitar("");
    const sesion = obtenerSesion();
    const datos = await solicitar(`?sesion=${encodeURIComponent(sesion)}`);
    if (!Array.isArray(datos)) throw new Error("El servicio no devolvió una lista válida del carrito.");
    const carrito = datos.map((registro) => leerRegistro(registro, sesion));
    const variantes = carrito.map((item) => JSON.stringify([item.id, item.talle, item.color]));
    if (
        new Set(variantes).size !== variantes.length ||
        new Set(carrito.map((item) => item.registroId)).size !== carrito.length
    )
        throw new Error(
            "El servicio devolvió filas repetidas del carrito. Revisá los datos antes de continuar.",
        );
    return carrito;
};

/** POST: crea una fila para una variante nueva y conserva el id asignado por la API. */
export const agregarProducto = async (item) => {
    const sesion = obtenerSesion();
    const registro = await solicitar("", "POST", {
        sesion,
        productoId: item.id,
        talle: item.talle,
        color: item.color,
        cantidad: item.cantidad,
    });
    return leerRegistro(registro, sesion);
};

/** PATCH: modifica solamente la cantidad de una fila guardada. */
export const actualizarCantidad = async (item) => {
    const sesion = obtenerSesion();
    const registro = await solicitar(`/${encodeURIComponent(item.registroId)}`, "PATCH", {
        cantidad: item.cantidad,
    });
    return leerRegistro(registro, sesion);
};

/** DELETE: elimina una fila utilizando su identificador de registro. */
export const eliminarProducto = async (item) => {
    await solicitar(`/${encodeURIComponent(item.registroId)}`, "DELETE");
};

/** DELETE: vacía la selección eliminando sus filas; otras sesiones se conservan. */
export const vaciarCarrito = async (carrito) => {
    for (const item of carrito) await eliminarProducto(item);
};

/** Aplica los cambios del formulario con POST, PATCH o DELETE, sin reemplazar toda la base. */
export const guardarCarrito = async (anterior, nuevo) => {
    if (nuevo.some((item) => validarCantidad(item.cantidad)))
        throw new Error("Ingresá cantidades enteras entre 1 y 10.");
    if (nuevo.length === 0) {
        await vaciarCarrito(anterior);
        return;
    }
    for (const item of nuevo) {
        const guardado = anterior.find((actual) => actual.registroId === item.registroId && item.registroId);
        if (!guardado) await agregarProducto(item);
        else if (guardado.cantidad !== item.cantidad) await actualizarCantidad(item);
    }
    for (const item of anterior) {
        if (!nuevo.some((actual) => actual.registroId === item.registroId)) await eliminarProducto(item);
    }
};
