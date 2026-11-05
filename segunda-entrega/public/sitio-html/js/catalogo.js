let filtrosActuales = {};
let ordenActual = "featured";
let productoActual = null;
const nombresCategorias = {
    all: "Todos los productos", remeras: "Remeras", buzos: "Buzos",
    camperas: "Camperas", accesorios: "Accesorios"
};
const nombresGeneros = {
    rock: "Rock", pop: "Pop / rock", indie: "Indie", alternativo: "Rock alternativo",
    clasicos: "Rock clásico", metal: "Metal", punk: "Punk", grunge: "Grunge"
};
const coloresFiltro = {
    black: "negro", cream: "crudo", white: "blanco", gray: "gris",
    blue: "azul", navy: "azul marino"
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
    const artistaProducto = producto.artista.toLowerCase().replace("/", "").replace("'", "");
    const artistaBuscado = filtrosActuales.artista.replace("/", "").replace("'", "");
    if (!artistaProducto.includes(artistaBuscado)) {
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
 * Genera una tarjeta que se reutiliza en Inicio y en el catálogo.
 * @method crearTarjetaProducto
 * @param {object} producto - Datos de la prenda.
 * @return {string} HTML de una tarjeta.
 */
const crearTarjetaProducto = (producto) => {
    const estado = !producto.disponible ? '<p class="estado agotado">Agotado</p>'
        : producto.nuevo ? '<p class="estado">Nuevo</p>' : "";
    const claseFoto = producto.categoria === "accesorios" ? ' class="foto-tote"' : "";
    return `<article class="producto" id="tarjeta-${producto.id}">
        <h3>${producto.nombre}</h3>
        <img${claseFoto} src="${producto.imagen}" alt="${producto.alt}" width="280">
        ${estado}
        <p><strong>${formatearPrecio(producto.precio)}</strong></p>
        <p>Color: ${producto.colores.join(" y ")}.</p>
        <p class="clasificacion-producto">${nombresGeneros[producto.genero]} · ${producto.artista}</p>
        <p class="enlace-producto"><a class="boton boton-secundario" href="${enlaceFicha(producto.id)}">Ver ${producto.nombre}</a></p>
    </article>`;
};

/**
 * Completa Inicio usando la plantilla compartida de tarjetas.
 * @method mostrarDestacados
 * @return {void}
 */
const mostrarDestacados = () => {
    const destacados = ["remera-highway-grooves", "remera-spin-forever", "buzo-music-heals",
        "campera-soundtrack", "remera-stay-wild"];
    let tarjetas = "";
    for (const id of destacados) {
        tarjetas += crearTarjetaProducto(buscarProducto(id));
    }
    document.getElementById("lista-destacados").innerHTML = tarjetas;
};

/**
 * Crea las tarjetas filtradas con una única plantilla y actualiza el contador.
 * @method mostrarProductos
 * @param {Array} seleccion - Productos que se mostrarán.
 * @return {void}
 */
const mostrarProductos = (seleccion) => {
    let tarjetas = "";
    for (const producto of seleccion) {
        tarjetas += crearTarjetaProducto(producto);
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
    limpiarMensajeFormulario(document.getElementById("formulario-filtros"));
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
 * Restablece los controles, limpia sus errores y muestra toda la categoría.
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
 * Señala la categoría actual en la navegación compartida.
 * @method marcarCategoriaActual
 * @param {string} categoria - Categoría de la vista.
 * @return {void}
 */
const marcarCategoriaActual = (categoria) => {
    const destino = categoria === "all" ? "../index.html#/productos" : "../index.html#/productos?categoria=" + categoria;
    for (const enlace of document.querySelectorAll(".categorias a")) {
        const activo = enlace.getAttribute("href") === destino;
        enlace.classList.toggle("activo", activo);
        enlace.removeAttribute("aria-current");
        if (activo) {
            enlace.setAttribute("aria-current", "page");
        }
    }
};

/**
 * Completa los filtros de color y talle con las opciones de la categoría.
 * @method prepararOpcionesFiltros
 * @param {string} categoria - Categoría actual o all.
 * @return {void}
 */
const prepararOpcionesFiltros = (categoria) => {
    const colores = [];
    const talles = [];
    for (const producto of productos) {
        if (categoria === "all" || producto.categoria === categoria) {
            for (const color of producto.colores) {
                if (!colores.includes(color)) {
                    colores.push(color);
                }
            }
            for (const talle of producto.talles) {
                if (!talles.includes(talle)) {
                    talles.push(talle);
                }
            }
        }
    }
    let opcionesColor = '<option value="all">Todos</option>';
    for (const clave in coloresFiltro) {
        for (const color of colores) {
            if (color.toLowerCase() === coloresFiltro[clave]) {
                opcionesColor += `<option value="${clave}">${color}</option>`;
            }
        }
    }
    let opcionesTalle = '<option value="all">Todos</option>';
    for (const talle of talles) {
        const valor = talle === "Único" ? "unico" : talle;
        opcionesTalle += `<option value="${valor}">${talle}</option>`;
    }
    document.getElementById("color").innerHTML = opcionesColor;
    document.getElementById("talle").innerHTML = opcionesTalle;
};

/**
 * Configura el único catálogo según la categoría de la URL y el género del enlace.
 * @method iniciarCatalogo
 * @return {void}
 */
const iniciarCatalogo = () => {
    const parametros = new URLSearchParams(window.location.search);
    let categoria = parametros.get("categoria");
    if (!["all", "remeras", "buzos", "camperas", "accesorios"].includes(categoria)) {
        categoria = "all";
    }
    document.body.setAttribute("data-categoria", categoria);
    document.body.classList.toggle("pagina-accesorios", categoria === "accesorios");
    document.querySelector("h1").innerText = nombresCategorias[categoria];
    document.getElementById("titulo-catalogo").innerText = categoria === "all"
        ? "Catálogo de productos" : "Catálogo de " + nombresCategorias[categoria].toLowerCase();
    document.title = nombresCategorias[categoria] + " | RetroWave";
    document.getElementById("filtro-categoria").hidden = categoria !== "all";
    document.getElementById("categoria").value = categoria;
    marcarCategoriaActual(categoria);
    prepararOpcionesFiltros(categoria);
    const genero = window.location.hash.slice(1);
    if (nombresGeneros[genero] !== undefined) {
        document.getElementById("genero").value = genero;
    }
    aplicarFiltros();
};

/**
 * Completa la única ficha con el producto solicitado y prepara sus controles.
 * @method iniciarFicha
 * @return {void}
 */
const iniciarFicha = () => {
    const parametros = new URLSearchParams(window.location.search);
    productoActual = buscarProducto(parametros.get("id"));
    if (productoActual === null) {
        document.getElementById("titulo-producto").innerText = "Producto no encontrado";
        document.title = "Producto no encontrado | RetroWave";
        document.getElementById("producto-no-encontrado").hidden = false;
        return;
    }
    const producto = productoActual;
    const ficha = document.querySelector(".detalle-producto");
    ficha.id = producto.id;
    document.getElementById("titulo-producto").innerText = producto.nombre;
    document.title = producto.nombre + " | RetroWave";
    document.querySelector('meta[name="description"]').setAttribute("content", producto.descripcion);
    const imagen = ficha.querySelector("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.alt;
    imagen.classList.toggle("foto-tote", producto.categoria === "accesorios");
    ficha.querySelector(".informacion-producto strong").innerText = formatearPrecio(producto.precio);
    document.getElementById("descripcion-producto").innerText = producto.descripcion;
    document.getElementById("clasificacion-producto").innerText = nombresGeneros[producto.genero] + " · " + producto.artista;
    const estado = document.getElementById("estado-producto");
    estado.innerText = !producto.disponible ? "Agotado" : producto.nuevo ? "Nuevo" : "";
    estado.hidden = estado.innerText === "";
    estado.classList.toggle("agotado", !producto.disponible);
    const formulario = ficha.querySelector("form");
    formulario.id = "formulario-" + producto.id;
    formulario.querySelector("legend").innerText = "Elegí las opciones de " + producto.nombre;
    for (const nombre of ["talle", "color", "cantidad"]) {
        const campo = document.getElementById(nombre + "-producto");
        const etiqueta = formulario.querySelector('label[for="' + campo.id + '"]');
        campo.id = nombre + "-" + producto.id;
        etiqueta.setAttribute("for", campo.id);
        if (nombre !== "cantidad") {
            const opciones = nombre === "talle" ? producto.talles : producto.colores;
            let contenido = "";
            for (const opcion of opciones) {
                contenido += `<option value="${opcion}">${opcion}</option>`;
            }
            campo.innerHTML = contenido;
        }
    }
    const agregar = document.getElementById("agregar-producto");
    agregar.disabled = !producto.disponible;
    agregar.innerText = producto.disponible ? "Agregar al carrito" : "Producto agotado";
    document.getElementById("volver-catalogo").href = "../index.html#/productos?categoria=" + producto.categoria;
    marcarCategoriaActual(producto.categoria);
    actualizarImporteFicha(producto.id);
    document.getElementById("contenido-producto").hidden = false;
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
    const formulario = document.getElementById("formulario-" + id);
    formulario.reset();
    limpiarMensajeFormulario(formulario);
    document.getElementById("mensaje-producto").innerText = "";
    actualizarImporteFicha(id);
};
