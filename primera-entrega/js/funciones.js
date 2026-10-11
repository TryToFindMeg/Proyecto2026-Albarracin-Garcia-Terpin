const formatoPesos = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

/**
 * Presenta un aviso en el cuadro de diálogo de la página.
 * @method mostrarAviso
 * @param {string} mensaje - Texto que se mostrará.
 * @return {void}
 */
const mostrarAviso = (mensaje) => {
    document.getElementById("texto-aviso").innerText = mensaje;
    document.getElementById("dialogo-aviso").showModal();
};

/**
 * Cierra el aviso y devuelve el foco al control que lo abrió.
 * @method cerrarAviso
 * @return {void}
 */
const cerrarAviso = () => {
    document.getElementById("dialogo-aviso").close();
};

/**
 * Busca los datos de un producto por su identificador.
 * @method buscarProducto
 * @param {string} id - Identificador del producto.
 * @return {object|null} Producto encontrado o null.
 */
const buscarProducto = (id) => {
    for (const producto of productos) {
        if (producto.id === id) {
            return producto;
        }
    }
    return null;
};

/**
 * Presenta un importe en pesos argentinos con dos decimales.
 * @method formatearPrecio
 * @param {number} importe - Importe a presentar.
 * @return {string} Precio formateado.
 */
const formatearPrecio = (importe) => formatoPesos.format(importe);

/**
 * Recupera un dato local sin interrumpir la página si el almacenamiento falla.
 * @method leerDatoLocal
 * @param {string} clave - Nombre del dato de RetroWave.
 * @return {string|null} Texto guardado o null.
 */
const leerDatoLocal = (clave) => {
    try {
        return localStorage.getItem(clave);
    } catch {
        return null;
    }
};

/**
 * Guarda un dato de RetroWave o elimina su clave cuando el valor es null.
 * @method guardarDatoLocal
 * @param {string} clave - Nombre del dato.
 * @param {string|null} valor - Texto a guardar o null para eliminarlo.
 * @return {boolean} Indica si pudo guardar el cambio.
 */
const guardarDatoLocal = (clave, valor) => {
    try {
        if (valor === null) {
            localStorage.removeItem(clave);
        } else {
            localStorage.setItem(clave, valor);
        }
        return true;
    } catch {
        mostrarAviso("El navegador no permite guardar estos datos. Abrí el sitio con un servidor local, por ejemplo Live Server.");
        return false;
    }
};

/**
 * Recupera el carrito y conserva solamente productos y opciones válidos.
 * @method leerCarrito
 * @return {Array} Productos elegidos con talle, color y cantidad.
 */
const leerCarrito = () => {
    const texto = leerDatoLocal("retrowave-carrito");
    if (texto === null) {
        return [];
    }
    let guardado;
    try {
        guardado = JSON.parse(texto);
    } catch {
        return [];
    }
    if (!Array.isArray(guardado)) {
        return [];
    }
    const carrito = [];
    for (const item of guardado) {
        if (item === null || typeof item !== "object") {
            continue;
        }
        const producto = buscarProducto(item.id);
        if (producto !== null && producto.disponible && producto.talles.includes(item.talle)
            && producto.colores.includes(item.color) && typeof item.cantidad === "number"
            && item.cantidad >= 1 && item.cantidad <= 10 && Math.round(item.cantidad) === item.cantidad) {
            carrito.push({ id: item.id, talle: item.talle, color: item.color, cantidad: item.cantidad });
        }
    }
    return carrito;
};

/**
 * Guarda el carrito y actualiza su contador en la navegación.
 * @method guardarCarrito
 * @param {Array} carrito - Productos y cantidades elegidos.
 * @return {boolean} Indica si se guardó el carrito.
 */
const guardarCarrito = (carrito) => {
    if (!guardarDatoLocal("retrowave-carrito", JSON.stringify(carrito))) {
        return false;
    }
    actualizarContador();
    return true;
};

/**
 * Muestra la cantidad total de unidades del carrito en la navegación.
 * @method actualizarContador
 * @return {void}
 */
const actualizarContador = () => {
    let unidades = 0;
    for (const item of leerCarrito()) {
        unidades += item.cantidad;
    }
    const contador = document.getElementById("contador-carrito");
    if (contador !== null) {
        contador.innerText = unidades;
        contador.setAttribute("aria-label", unidades + " unidades en el carrito");
    }
};

/**
 * Informa un error, limpia el campo incorrecto y le devuelve el foco.
 * @method marcarError
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} campo - Campo incorrecto.
 * @param {string} mensaje - Explicación del error.
 * @return {boolean} Siempre false para detener la acción.
 */
const marcarError = (campo, mensaje) => {
    campo.setAttribute("aria-invalid", "true");
    campo.value = "";
    campo.focus();
    mostrarAviso(mensaje);
    return false;
};

/**
 * Comprueba un número dentro de un rango y, si corresponde, que sea entero.
 * @method validarNumeroCampo
 * @param {HTMLInputElement} campo - Campo numérico.
 * @param {number} minimo - Menor valor permitido.
 * @param {number} maximo - Mayor valor permitido.
 * @param {boolean} entero - Indica si acepta solamente enteros.
 * @return {boolean} Indica si el valor es válido.
 */
const validarNumeroCampo = (campo, minimo, maximo, entero) => {
    const valor = Number(campo.value);
    if (campo.value.trim() === "" || isNaN(valor) || valor < minimo || valor > maximo
        || (entero && Math.round(valor) !== valor)) {
        return marcarError(campo, "Ingresá " + (entero ? "un número entero" : "un número") + " entre " + minimo + " y " + maximo + ".");
    }
    campo.removeAttribute("aria-invalid");
    return true;
};

/**
 * Limpia los avisos del formulario cuando el usuario restablece sus campos.
 * @method limpiarMensajeFormulario
 * @param {HTMLFormElement} formulario - Formulario restablecido.
 * @return {void}
 */
const limpiarMensajeFormulario = (formulario) => {
    const mensaje = document.getElementById("mensaje-" + formulario.id);
    if (mensaje !== null) {
        mensaje.innerText = "";
    }
    for (const campo of formulario.elements) {
        campo.removeAttribute("aria-invalid");
    }
};

/**
 * Inicializa los controles que correspondan a la página abierta.
 * @method iniciarPagina
 * @return {void}
 */
const iniciarPagina = () => {
    actualizarContador();
    for (const tarjeta of document.querySelectorAll("#destacados .producto")) {
        const producto = buscarProducto(tarjeta.id);
        tarjeta.querySelector("strong").innerText = formatearPrecio(producto.precio);
    }
    if (document.getElementById("formulario-filtros") !== null) {
        iniciarCatalogo();
    }
    const ficha = document.querySelector(".detalle-producto");
    if (ficha !== null) {
        iniciarFicha(ficha.id);
    }
    if (document.getElementById("formulario-carrito") !== null) {
        mostrarCarrito();
    }
    if (document.getElementById("formulario-ingreso") !== null) {
        completarEmailRecordado();
    }
    if (document.body.classList.contains("pagina-carrito-vacio") && leerCarrito().length > 0) {
        window.location.replace("carrito.html");
    }
};
