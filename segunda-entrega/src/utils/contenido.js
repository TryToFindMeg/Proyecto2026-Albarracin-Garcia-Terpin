/** Comprueba las opciones y textos necesarios antes de mostrarlos en React. */
export const validarContenido = (datos) => {
    const opciones = ["categorias", "generos", "ordenes"];
    if (
        !datos ||
        opciones.some(
            (nombre) =>
                !Array.isArray(datos.catalogo?.[nombre]) ||
                !datos.catalogo[nombre].length ||
                datos.catalogo[nombre].some((item) => !item.id || !item.nombre),
        )
    )
        throw new Error("Las opciones del catálogo no son válidas.");
    if (
        !Array.isArray(datos.inicio?.destacados) ||
        !Array.isArray(datos.inicio?.estilos) ||
        !Array.isArray(datos.contacto?.motivosContacto) ||
        !Array.isArray(datos.contacto?.preguntas)
    )
        throw new Error("El contenido de Inicio o Contacto no es válido.");
    for (const tipo of ["ingreso", "recuperacion", "registro"]) {
        const formulario = datos.cuenta?.formulariosCuenta?.[tipo];
        if (!formulario?.id || !formulario.titulo || !Array.isArray(formulario.campos) || !formulario.inicial)
            throw new Error("La configuración de los formularios de cuenta no es válida.");
    }
    return datos;
};
