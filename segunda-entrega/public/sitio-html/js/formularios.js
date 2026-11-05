/**
 * Verifica que un campo de texto obligatorio contenga información.
 * @method validarTexto
 * @param {HTMLInputElement|HTMLTextAreaElement} campo - Campo a comprobar.
 * @param {string} nombre - Nombre del dato solicitado.
 * @return {boolean} Indica si el texto es válido.
 */
const validarTexto = (campo, nombre) => {
    const valor = campo.value.trim();
    if (valor === "" || (campo.maxLength > 0 && valor.length > campo.maxLength)) {
        return marcarError(campo, "Completá correctamente el campo " + nombre + ".");
    }
    campo.value = valor;
    campo.removeAttribute("aria-invalid");
    return true;
};

/**
 * Comprueba un email usando su tipo HTML y la posición del dominio.
 * @method validarEmail
 * @param {HTMLInputElement} campo - Campo de email.
 * @return {boolean} Indica si el email es válido.
 */
const validarEmail = (campo) => {
    const email = campo.value.trim();
    campo.value = email;
    const arroba = email.indexOf("@");
    const punto = email.lastIndexOf(".");
    if (email === "" || !campo.checkValidity() || arroba < 1 || punto <= arroba + 1 || punto === email.length - 1) {
        return marcarError(campo, "Ingresá un email válido, por ejemplo nombre@ejemplo.com.");
    }
    campo.removeAttribute("aria-invalid");
    return true;
};

/**
 * Comprueba que una contraseña de prueba tenga entre 8 y 64 caracteres.
 * @method validarContrasena
 * @param {HTMLInputElement} campo - Campo de contraseña.
 * @return {boolean} Indica si tiene una longitud válida.
 */
const validarContrasena = (campo) => {
    if (campo.value.trim() === "" || campo.value.length < 8 || campo.value.length > 64) {
        return marcarError(campo, "La contraseña de prueba debe tener entre 8 y 64 caracteres.");
    }
    campo.removeAttribute("aria-invalid");
    return true;
};

/**
 * Muestra un aviso de validación con texto, sin interpretar HTML del usuario.
 * @method mostrarMensajeFormulario
 * @param {HTMLFormElement} formulario - Formulario validado.
 * @param {string} texto - Aviso que se mostrará.
 * @return {void}
 */
const mostrarMensajeFormulario = (formulario, texto) => {
    document.getElementById("mensaje-" + formulario.id).innerText = texto;
};

/**
 * Completa solamente el email que el usuario eligió recordar en este navegador.
 * @method completarEmailRecordado
 * @return {void}
 */
const completarEmailRecordado = () => {
    const email = leerDatoLocal("retrowave-email-recordado");
    if (email !== null) {
        document.getElementById("email-ingreso").value = email;
        document.getElementById("recordarme").checked = true;
    }
};

/**
 * Valida los campos de ingreso de prueba y opcionalmente recuerda el email.
 * @method validarIngreso
 * @param {HTMLFormElement} formulario - Formulario de ingreso.
 * @return {boolean} Siempre false; no inicia una sesión real.
 */
const validarIngreso = (formulario) => {
    limpiarMensajeFormulario(formulario);
    const email = document.getElementById("email-ingreso");
    const contrasena = document.getElementById("contrasena-ingreso");
    if (!validarEmail(email) || !validarContrasena(contrasena)) {
        return false;
    }
    if (!guardarDatoLocal("retrowave-email-recordado", document.getElementById("recordarme").checked ? email.value : null)) {
        return false;
    }
    contrasena.value = "";
    mostrarMensajeFormulario(formulario, "Datos válidos para la demostración. No se inició una sesión real.");
    return false;
};

/**
 * Valida el email de recuperación de prueba sin enviar un correo.
 * @method validarRecuperacion
 * @param {HTMLFormElement} formulario - Formulario de recuperación.
 * @return {boolean} Siempre false para evitar el envío.
 */
const validarRecuperacion = (formulario) => {
    limpiarMensajeFormulario(formulario);
    if (validarEmail(document.getElementById("email-recuperacion"))) {
        mostrarMensajeFormulario(formulario, "Email válido para la demostración. No se envió un correo de recuperación.");
    }
    return false;
};

/**
 * Valida los datos personales y la coincidencia de contraseñas del registro.
 * @method validarRegistro
 * @param {HTMLFormElement} formulario - Formulario de registro.
 * @return {boolean} Siempre false; no crea una cuenta real.
 */
const validarRegistro = (formulario) => {
    limpiarMensajeFormulario(formulario);
    const contrasena = document.getElementById("contrasena-registro");
    const confirmacion = document.getElementById("confirmar-contrasena");
    if (!validarTexto(document.getElementById("nombre-registro"), "Nombre")
        || !validarTexto(document.getElementById("apellido-registro"), "Apellido")
        || !validarEmail(document.getElementById("email-registro")) || !validarContrasena(contrasena)) {
        return false;
    }
    if (contrasena.value !== confirmacion.value) {
        return marcarError(confirmacion, "Las contraseñas deben coincidir.");
    }
    formulario.reset();
    mostrarMensajeFormulario(formulario, "Registro validado como demostración. No se creó una cuenta ni se guardaron contraseñas.");
    return false;
};

/**
 * Valida una consulta de contacto y muestra una confirmación de prueba.
 * @method enviarContacto
 * @param {HTMLFormElement} formulario - Formulario de contacto.
 * @return {boolean} Siempre false; no envía el mensaje.
 */
const enviarContacto = (formulario) => {
    limpiarMensajeFormulario(formulario);
    if (!validarTexto(document.getElementById("nombre-contacto"), "Nombre")
        || !validarEmail(document.getElementById("email-contacto"))) {
        return false;
    }
    const motivo = document.getElementById("motivo-contacto");
    if (motivo.value === "") {
        return marcarError(motivo, "Elegí el motivo de tu consulta.");
    }
    if (!validarTexto(document.getElementById("mensaje-contacto"), "Mensaje")) {
        return false;
    }
    formulario.reset();
    mostrarMensajeFormulario(formulario, "Consulta validada como demostración. El mensaje no se envió.");
    return false;
};

/**
 * Valida el email del formulario de novedades sin registrar una suscripción real.
 * @method suscribirNovedades
 * @param {HTMLFormElement} formulario - Formulario de novedades.
 * @return {boolean} Siempre false para evitar el envío.
 */
const suscribirNovedades = (formulario) => {
    limpiarMensajeFormulario(formulario);
    if (validarEmail(formulario.elements.newsletterEmail)) {
        formulario.reset();
        mostrarMensajeFormulario(formulario, "Email validado para la demostración. No se registró una suscripción real.");
    }
    return false;
};
