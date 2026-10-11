let filtrosActuales = {};
let ordenActual = "featured";
const nombresGeneros = {
    rock: "Rock", pop: "Pop", indie: "Indie", alternativo: "Alternativo", clasicos: "Clásicos"
};
const coloresFiltro = {
    black: "negro", cream: "crudo", coral: "coral", mint: "menta", mustard: "mostaza",
    orange: "naranja", brown: "marrón", gray: "gris"
};

/**
 * Lee un control del filtro o devuelve all si ese control no existe.
 * @method leerFiltro
 * @param {string} id - Identificador del control.
 * @return {string} Valor seleccionado.
 */
const leerFiltro = (id) => {
    const campo = document.getElementById(id);
    return campo === null ? "all" : campo.value;
};

/**
 * Comprueba si un producto coincide con la categoría y los filtros actuales.
 * @method cumpleFiltros
 * @param {object} producto - Producto a comprobar.
 * @return {boolean} Indica si se debe mostrar.
 */
const cumpleFiltros = (producto) => {
    if (filtrosActuales.categoria !== "all" && producto.categoria !== filtrosActuales.categoria) {
        return false;
    }
    if (filtrosActuales.genero !== "all" && producto.genero !== filtrosActuales.genero) {
        return false;
    }
    if (!producto.artista.toLowerCase().includes(filtrosActuales.artista)) {
        return false;
    }
    if (producto.precio < filtrosActuales.minimo || producto.precio > filtrosActuales.maximo) {
        return false;
    }
    if (filtrosActuales.disponibilidad === "available" && !producto.disponible) {
        return false;
    }
    if (filtrosActuales.disponibilidad === "sold-out" && producto.disponible) {
        return false;
    }
    if (filtrosActuales.color !== "all") {
        let encontrado = false;
        for (const color of producto.colores) {
            if (color.toLowerCase() === coloresFiltro[filtrosActuales.color]) {
                encontrado = true;
            }
        }
        if (!encontrado) {
            return false;
        }
    }
    if (filtrosActuales.talle !== "all" && !producto.talles.includes(filtrosActuales.talle)) {
        return filtrosActuales.talle === "unico" && producto.talles.includes("Único");
    }
    return true;
};

/**
 * Compara dos productos según el orden elegido en el catálogo.
 * @method compararProductos
 * @param {object} primero - Primer producto.
 * @param {object} segundo - Segundo producto.
 * @return {number} Diferencia usada por sort.
 */
const compararProductos = (primero, segundo) => {
    if (ordenActual === "lowest") {
        return primero.precio - segundo.precio;
    }
    if (ordenActual === "highest") {
        return segundo.precio - primero.precio;
    }
    if (ordenActual === "newest" && primero.nuevo !== segundo.nuevo) {
        return primero.nuevo ? -1 : 1;
    }
    if (ordenActual === "name-asc" || ordenActual === "name-desc") {
        const nombrePrimero = primero.nombre.toLowerCase();
        const nombreSegundo = segundo.nombre.toLowerCase();
        let comparacion = 0;
        if (nombrePrimero < nombreSegundo) {
            comparacion = -1;
        } else if (nombrePrimero > nombreSegundo) {
            comparacion = 1;
        }
        return ordenActual === "name-desc" ? -comparacion : comparacion;
    }
    return primero.orden - segundo.orden;
};

/**
 * Crea las tarjetas de los productos filtrados y actualiza el contador.
 * @method mostrarProductos
 * @param {Array} seleccion - Productos que se mostrarán.
 * @return {void}
 */
const mostrarProductos = (seleccion) => {
    let tarjetas = "";
    for (const producto of seleccion) {
        const estado = !producto.disponible ? '<p class="estado agotado">Agotado</p>'
            : producto.nuevo ? '<p class="estado">Nuevo</p>' : "";
        const claseFoto = producto.categoria === "accesorios" ? ' class="foto-tote"' : "";
        tarjetas += `<article class="producto" id="tarjeta-${producto.id}">
            <h3>${producto.nombre}</h3>
            <img${claseFoto} src="${producto.imagen}" alt="${producto.alt}" width="280">
            ${estado}
            <p><strong>${formatearPrecio(producto.precio)}</strong></p>
            <p>Colores: ${producto.colores.join(" y ")}.</p>
            <p class="clasificacion-producto">${nombresGeneros[producto.genero]} · ${producto.artista}</p>
            <p class="enlace-producto"><a class="boton boton-secundario" href="productos/${producto.id}.html">Ver ${producto.nombre}</a></p>
        </article>`;
    }
    const lista = document.getElementById("lista-catalogo");
    lista.innerHTML = tarjetas;
    document.getElementById("cantidad-resultados").innerText = seleccion.length + " "
        + (seleccion.length === 1 ? "producto" : "productos") + ". Precios expresados en pesos argentinos.";
    if (seleccion.length === 0) {
        lista.innerHTML = '<p class="sin-resultados">No encontramos productos con esas preferencias. Probá cambiar o limpiar los filtros.</p>';
    }
};

/**
 * Valida los precios, filtra dentro de la categoría actual y ordena las tarjetas.
 * @method aplicarFiltros
 * @return {boolean} Siempre false para evitar enviar el formulario.
 */
const aplicarFiltros = () => {
    const minimo = document.getElementById("precio-minimo");
    const maximo = document.getElementById("precio-maximo");
    if (minimo.validity.badInput) {
        return marcarError(minimo, "Ingresá un precio mínimo numérico.");
    }
    if (maximo.validity.badInput) {
        return marcarError(maximo, "Ingresá un precio máximo numérico.");
    }
    if (minimo.value !== "" && !validarNumeroCampo(minimo, 0, 100000, false)) {
        return false;
    }
    if (maximo.value !== "" && !validarNumeroCampo(maximo, 0, 100000, false)) {
        return false;
    }
    if (minimo.value !== "" && maximo.value !== "" && Number(minimo.value) > Number(maximo.value)) {
        return marcarError(maximo, "El precio máximo debe ser mayor o igual al mínimo.");
    }
    const categoriaPagina = document.body.getAttribute("data-categoria");
    filtrosActuales = {
        categoria: categoriaPagina === "all" ? leerFiltro("categoria") : categoriaPagina,
        genero: leerFiltro("genero"), artista: leerFiltro("artista").trim().toLowerCase(),
        minimo: minimo.value === "" ? 0 : Number(minimo.value),
        maximo: maximo.value === "" ? 100000 : Number(maximo.value),
        disponibilidad: leerFiltro("disponibilidad"), color: leerFiltro("color"), talle: leerFiltro("talle")
    };
    ordenActual = leerFiltro("orden");
    const seleccion = productos.filter(cumpleFiltros);
    seleccion.sort(compararProductos);
    mostrarProductos(seleccion);
    return false;
};

/**
 * Restablece los controles y vuelve a mostrar toda la categoría actual.
 * @method limpiarFiltros
 * @return {void}
 */
const limpiarFiltros = () => {
    document.getElementById("formulario-filtros").reset();
    if (nombresGeneros[window.location.hash.slice(1)] !== undefined) {
        window.location.hash = "";
    }
    aplicarFiltros();
};

/**
 * Aplica el género del enlace del inicio al cargar el catálogo.
 * @method iniciarCatalogo
 * @return {void}
 */
const iniciarCatalogo = () => {
    const genero = window.location.hash.slice(1);
    if (nombresGeneros[genero] !== undefined) {
        document.getElementById("genero").value = genero;
    }
    aplicarFiltros();
};

/**
 * Presenta precio, clasificación y disponibilidad en una ficha individual.
 * @method iniciarFicha
 * @param {string} id - Identificador del producto.
 * @return {void}
 */
const iniciarFicha = (id) => {
    const producto = buscarProducto(id);
    document.querySelector(".informacion-producto strong").innerText = formatearPrecio(producto.precio);
    document.getElementById("descripcion-producto").innerText = producto.descripcion;
    document.getElementById("clasificacion-producto").innerText = "Clasificación de ejemplo: "
        + nombresGeneros[producto.genero] + " · " + producto.artista;
    const agregar = document.getElementById("agregar-producto");
    agregar.disabled = !producto.disponible;
    if (!producto.disponible) {
        agregar.innerText = "Producto agotado";
    }
    actualizarImporteFicha(id);
};

/**
 * Calcula el importe por la cantidad seleccionada en la ficha.
 * @method actualizarImporteFicha
 * @param {string} id - Identificador del producto.
 * @return {boolean} Indica si la cantidad es válida.
 */
const actualizarImporteFicha = (id) => {
    const campo = document.getElementById("cantidad-" + id);
    if (!validarNumeroCampo(campo, 1, 10, true)) {
        document.getElementById("importe-producto").innerText = "—";
        return false;
    }
    document.getElementById("importe-producto").innerText = formatearPrecio(buscarProducto(id).precio * Number(campo.value));
    return true;
};

/**
 * Restablece talle, color, cantidad y el importe de una ficha.
 * @method restablecerFicha
 * @param {string} id - Identificador del producto.
 * @return {void}
 */
const restablecerFicha = (id) => {
    document.getElementById("formulario-" + id).reset();
    document.getElementById("mensaje-producto").innerText = "";
    actualizarImporteFicha(id);
};
