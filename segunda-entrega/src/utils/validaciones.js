/** Valida un texto obligatorio y su extensión máxima. */
export const validarTexto = (valor, nombre, maximo) => {
    if (!valor.trim()) return `Completá el campo ${nombre}.`;
    if (valor.length > maximo) return `Usá hasta ${maximo} caracteres en ${nombre}.`;
    return "";
};

/** Comprueba la forma del email de una demostración, sin consultar un servidor. */
export const validarEmail = (valor) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()) && valor.trim().length <= 100
        ? ""
        : "Ingresá un email válido, por ejemplo nombre@ejemplo.com.";

/** Comprueba una contraseña de prueba de entre 8 y 64 caracteres. */
export const validarContrasena = (valor) =>
    valor.trim() && valor.length >= 8 && valor.length <= 64
        ? ""
        : "La contraseña de prueba debe tener entre 8 y 64 caracteres.";

/** Valida los campos que corresponden al formulario de cuenta seleccionado. */
export const validarCuenta = (tipo, valores) => {
    const errores = { email: validarEmail(valores.email) };
    if (tipo !== "recuperacion") errores.contrasena = validarContrasena(valores.contrasena);
    if (tipo === "registro") {
        errores.nombre = validarTexto(valores.nombre, "Nombre", 40);
        errores.apellido = validarTexto(valores.apellido, "Apellido", 40);
        errores.confirmacion =
            valores.confirmacion && valores.confirmacion === valores.contrasena
                ? ""
                : "Las contraseñas deben coincidir.";
    }
    return errores;
};

/** Valida una consulta y su número de pedido opcional. */
export const validarContacto = (valores) => ({
    nombre: validarTexto(valores.nombre, "Nombre", 60),
    email: validarEmail(valores.email),
    motivo: ["product", "order", "exchange", "other"].includes(valores.motivo)
        ? ""
        : "Elegí el motivo de tu consulta.",
    pedido: valores.pedido.length <= 20 ? "" : "Usá hasta 20 caracteres en el número de pedido.",
    mensaje: validarTexto(valores.mensaje, "Mensaje", 2000),
});
