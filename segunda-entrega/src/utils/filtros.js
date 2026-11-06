import { categorias, generos, ordenes } from "@/data/catalogo.js";

/**
 * Normaliza nombres para aceptar búsquedas como ACDC o Guns N Roses.
 * @param {string} texto - Texto a comparar.
 * @returns {string} Texto sin acentos, espacios o signos.
 */
export const normalizarTexto = (texto) =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

/**
 * Recupera los filtros de la dirección para conservarlos al navegar y recargar.
 * @param {URLSearchParams} parametros - Parámetros del catálogo.
 * @returns {object} Valores de los controles.
 */
export const leerFiltros = (parametros) => {
    const categoria = parametros.get("categoria") || "all";
    const genero = parametros.get("genero") || "all";
    const orden = parametros.get("orden") || "featured";
    return {
        categoria: categorias.some((item) => item.id === categoria) ? categoria : "all",
        genero: generos.some((item) => item.id === genero) ? genero : "all",
        artista: (parametros.get("artista") || "").slice(0, 80),
        minimo: parametros.get("minimo") || "",
        maximo: parametros.get("maximo") || "",
        disponibilidad: ["all", "available", "sold-out"].includes(parametros.get("disponibilidad"))
            ? parametros.get("disponibilidad")
            : "all",
        color: parametros.get("color") || "all",
        talle: parametros.get("talle") || "all",
        orden: ordenes.some((item) => item.id === orden) ? orden : "featured",
    };
};

/**
 * Comprueba los precios ingresados sin borrar lo que está escribiendo el usuario.
 * @param {object} filtros - Valores del formulario.
 * @returns {object} Mensajes de error de mínimo y máximo.
 */
export const validarPrecios = (filtros) => {
    const errores = { minimo: "", maximo: "" };
    for (const campo of ["minimo", "maximo"]) {
        const valor = filtros[campo];
        if (
            valor !== "" &&
            (!/^\d+(\.\d+)?$/.test(valor) || !Number.isFinite(Number(valor)) || Number(valor) > 100000)
        ) {
            errores[campo] = "Ingresá un precio entre 0 y 100000 pesos.";
        }
    }
    if (
        !errores.minimo &&
        !errores.maximo &&
        filtros.minimo !== "" &&
        filtros.maximo !== "" &&
        Number(filtros.minimo) > Number(filtros.maximo)
    ) {
        errores.maximo = "El precio máximo debe ser mayor o igual al mínimo.";
    }
    return errores;
};

/**
 * Combina los filtros y ordena una copia de los productos.
 * @param {Array} productos - Datos obtenidos de la API.
 * @param {object} filtros - Preferencias actuales.
 * @returns {Array} Productos coincidentes y ordenados.
 */
export const filtrarProductos = (productos, filtros) => {
    const artista = normalizarTexto(filtros.artista);
    const seleccion = productos.filter((producto) => {
        return (
            (filtros.categoria === "all" || producto.categoria === filtros.categoria) &&
            (filtros.genero === "all" || producto.genero === filtros.genero) &&
            normalizarTexto(producto.artista).includes(artista) &&
            (filtros.minimo === "" || producto.precio >= Number(filtros.minimo)) &&
            (filtros.maximo === "" || producto.precio <= Number(filtros.maximo)) &&
            (filtros.disponibilidad !== "available" || producto.disponible) &&
            (filtros.disponibilidad !== "sold-out" || !producto.disponible) &&
            (filtros.color === "all" ||
                producto.colores.some(
                    (color) => normalizarTexto(color) === normalizarTexto(filtros.color),
                )) &&
            (filtros.talle === "all" || producto.talles.includes(filtros.talle))
        );
    });
    return seleccion.sort((primero, segundo) => {
        if (filtros.orden === "lowest") return primero.precio - segundo.precio;
        if (filtros.orden === "highest") return segundo.precio - primero.precio;
        if (filtros.orden === "newest" && primero.nuevo !== segundo.nuevo) return primero.nuevo ? -1 : 1;
        if (filtros.orden === "name-asc") return primero.nombre.localeCompare(segundo.nombre, "es");
        if (filtros.orden === "name-desc") return segundo.nombre.localeCompare(primero.nombre, "es");
        return primero.orden - segundo.orden;
    });
};
