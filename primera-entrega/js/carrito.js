/**
 * Agrega una variante al carrito o aumenta su cantidad si ya estaba elegida.
 * @method agregarAlCarrito
 * @param {string} id - Identificador del producto.
 * @return {boolean} Siempre false para evitar enviar el formulario.
 */
const agregarAlCarrito = (id) => {
    const producto = buscarProducto(id);
    if (producto === null || !producto.disponible) {
        mostrarAviso("Este producto está agotado.");
        return false;
    }
    if (!actualizarImporteFicha(id)) {
        return false;
    }
    const campoCantidad = document.getElementById("cantidad-" + id);
    const campoTalle = document.getElementById("talle-" + id);
    const campoColor = document.getElementById("color-" + id);
    const talle = campoTalle.value;
    const color = campoColor.options[campoColor.selectedIndex].text;
    if (!producto.talles.includes(talle)) {
        return marcarError(campoTalle, "Elegí un talle disponible.");
    }
    if (!producto.colores.includes(color)) {
        return marcarError(campoColor, "Elegí un color disponible.");
    }
    const cantidad = Number(campoCantidad.value);
    const carrito = leerCarrito();
    let existente = null;
    for (const item of carrito) {
        if (item.id === id && item.talle === talle && item.color === color) {
            existente = item;
        }
    }
    if (existente !== null) {
        if (existente.cantidad + cantidad > 10) {
            return marcarError(campoCantidad, "Podés tener hasta 10 unidades de este producto con el mismo talle y color.");
        }
        existente.cantidad += cantidad;
    } else {
        carrito.push({ id: id, talle: talle, color: color, cantidad: cantidad });
    }
    if (guardarCarrito(carrito)) {
        document.getElementById("mensaje-producto").innerText = "Agregaste " + cantidad + " "
            + (cantidad === 1 ? "unidad de " : "unidades de ") + producto.nombre + " al carrito.";
    }
    return false;
};

/**
 * Calcula subtotal, descuento y total usando los precios del catálogo.
 * @method calcularTotales
 * @param {Array} carrito - Productos con sus cantidades.
 * @param {string} codigo - Código de descuento aplicado.
 * @return {object} Subtotal, descuento y total en pesos.
 */
const calcularTotales = (carrito, codigo) => {
    let subtotal = 0;
    for (const item of carrito) {
        subtotal += buscarProducto(item.id).precio * item.cantidad;
    }
    const descuento = codigo === "RETRO10" ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
    return { subtotal: subtotal, descuento: descuento, total: subtotal - descuento };
};

/**
 * Actualiza subtotales, descuento y total en el resumen de compra.
 * @method mostrarTotales
 * @return {void}
 */
const mostrarTotales = () => {
    const carrito = leerCarrito();
    const codigo = leerDatoLocal("retrowave-descuento");
    const totales = calcularTotales(carrito, codigo);
    for (let indice = 0; indice < carrito.length; indice++) {
        const item = carrito[indice];
        document.getElementById("subtotal-carrito-" + indice).innerText = formatearPrecio(buscarProducto(item.id).precio * item.cantidad);
    }
    document.getElementById("subtotal-productos").innerText = formatearPrecio(totales.subtotal);
    document.getElementById("subtotal-resumen").innerText = formatearPrecio(totales.subtotal);
    document.getElementById("importe-descuento").innerText = formatearPrecio(totales.descuento);
    document.getElementById("total-carrito").innerText = formatearPrecio(totales.total);
    document.getElementById("mensaje-descuento").innerText = codigo === "RETRO10" ? "RETRO10 aplicado: 10 % de descuento." : "";
};

/**
 * Crea las filas del carrito o presenta su estado vacío.
 * @method mostrarCarrito
 * @return {void}
 */
const mostrarCarrito = () => {
    const carrito = leerCarrito();
    const vacio = carrito.length === 0;
    document.getElementById("formulario-carrito").hidden = vacio;
    document.getElementById("mensaje-carrito-vacio").hidden = !vacio;
    actualizarContador();
    if (vacio) {
        document.getElementById("cuerpo-carrito").innerHTML = "";
        guardarDatoLocal("retrowave-descuento", null);
        return;
    }
    let filas = "";
    for (let indice = 0; indice < carrito.length; indice++) {
        const item = carrito[indice];
        const producto = buscarProducto(item.id);
        const claseFoto = producto.categoria === "accesorios" ? ' class="foto-tote"' : "";
        filas += `<tr>
            <td><p><a href="productos/${producto.id}.html">${producto.nombre}</a></p>
                <img${claseFoto} src="${producto.imagen}" alt="${producto.alt}" width="120">
                <p>Color: ${item.color}. Talle: ${item.talle}.</p></td>
            <td>${formatearPrecio(producto.precio)}</td>
            <td><label for="cantidad-carrito-${indice}">Cantidad de ${producto.nombre}, talle ${item.talle}, color ${item.color}</label>
                <input type="number" id="cantidad-carrito-${indice}" name="cantidad${indice}" min="1" max="10" step="1" value="${item.cantidad}" required="required" onchange="cambiarCantidad(${indice}, this)"></td>
            <td id="subtotal-carrito-${indice}"></td>
            <td><button type="button" onclick="eliminarProducto(${indice})">Eliminar ${producto.nombre}</button></td>
        </tr>`;
    }
    document.getElementById("cuerpo-carrito").innerHTML = filas;
    document.getElementById("codigo-descuento").value = leerDatoLocal("retrowave-descuento") === "RETRO10" ? "RETRO10" : "";
    mostrarTotales();
};

/**
 * Guarda una cantidad válida sin reemplazar los controles de la tabla.
 * @method cambiarCantidad
 * @param {number} indice - Posición del producto en el carrito.
 * @param {HTMLInputElement} campo - Campo con la cantidad nueva.
 * @return {boolean} Indica si se pudo actualizar.
 */
const cambiarCantidad = (indice, campo) => {
    if (!validarNumeroCampo(campo, 1, 10, true)) {
        return false;
    }
    const carrito = leerCarrito();
    if (carrito[indice] === undefined) {
        mostrarCarrito();
        return false;
    }
    carrito[indice].cantidad = Number(campo.value);
    if (!guardarCarrito(carrito)) {
        return false;
    }
    mostrarTotales();
    return true;
};

/**
 * Valida todas las cantidades de la tabla antes de guardar los cambios.
 * @method actualizarCarrito
 * @return {boolean} Indica si se actualizaron todas las cantidades.
 */
const actualizarCarrito = () => {
    const carrito = leerCarrito();
    for (let indice = 0; indice < carrito.length; indice++) {
        const campo = document.getElementById("cantidad-carrito-" + indice);
        if (!validarNumeroCampo(campo, 1, 10, true)) {
            return false;
        }
        carrito[indice].cantidad = Number(campo.value);
    }
    if (!guardarCarrito(carrito)) {
        return false;
    }
    mostrarTotales();
    return true;
};

/**
 * Elimina el producto seleccionado y actualiza la tabla.
 * @method eliminarProducto
 * @param {number} indice - Posición de la variante que se elimina.
 * @return {void}
 */
const eliminarProducto = (indice) => {
    const carrito = leerCarrito();
    carrito.splice(indice, 1);
    if (guardarCarrito(carrito)) {
        mostrarCarrito();
    }
};

/**
 * Vacía las claves del carrito de RetroWave después de pedir confirmación.
 * @method vaciarCarrito
 * @return {void}
 */
const vaciarCarrito = () => {
    document.getElementById("dialogo-vaciar").showModal();
};

/**
 * Cancela el vaciado y conserva todos los productos del carrito.
 * @method cancelarVaciado
 * @return {void}
 */
const cancelarVaciado = () => {
    document.getElementById("dialogo-vaciar").close();
};

/**
 * Confirma el vaciado y abre la pantalla del carrito vacío.
 * @method confirmarVaciado
 * @return {void}
 */
const confirmarVaciado = () => {
    document.getElementById("dialogo-vaciar").close();
    if (guardarDatoLocal("retrowave-carrito", null)) {
        guardarDatoLocal("retrowave-descuento", null);
        window.location.href = "carrito-vacio.html";
    }
};

/**
 * Devuelve a una unidad la cantidad de cada variante del carrito.
 * @method restablecerCantidades
 * @return {void}
 */
const restablecerCantidades = () => {
    const carrito = leerCarrito();
    for (const item of carrito) {
        item.cantidad = 1;
    }
    if (guardarCarrito(carrito)) {
        mostrarCarrito();
    }
};

/**
 * Aplica RETRO10 o retira el descuento cuando el campo queda vacío.
 * @method aplicarDescuento
 * @return {boolean} Indica si el código ingresado es válido.
 */
const aplicarDescuento = () => {
    if (!actualizarCarrito()) {
        return false;
    }
    const campo = document.getElementById("codigo-descuento");
    const codigo = campo.value.trim().toUpperCase();
    if (codigo !== "" && codigo !== "RETRO10") {
        guardarDatoLocal("retrowave-descuento", null);
        mostrarTotales();
        return marcarError(campo, "Ese código no es válido. Para esta prueba podés usar RETRO10.");
    }
    if (!guardarDatoLocal("retrowave-descuento", codigo === "" ? null : codigo)) {
        return false;
    }
    campo.value = codigo;
    campo.removeAttribute("aria-invalid");
    mostrarTotales();
    return true;
};

/**
 * Muestra el importe de la demostración sin generar un pedido real.
 * @method verResumenCompra
 * @return {boolean} Siempre false para evitar enviar el formulario.
 */
const verResumenCompra = () => {
    if (leerCarrito().length === 0) {
        mostrarAviso("Agregá al menos un producto al carrito.");
        return false;
    }
    if (!actualizarCarrito()) {
        return false;
    }
    const totales = calcularTotales(leerCarrito(), leerDatoLocal("retrowave-descuento"));
    mostrarAviso("Resumen de prueba: " + formatearPrecio(totales.total) + " en productos. El envío no está incluido. No se genera un pedido ni un pago real.");
    return false;
};
