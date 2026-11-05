const email = { nombre: "email", etiqueta: "Email", tipo: "email", maximo: 100, completar: "email" };
const contrasena = {
    nombre: "contrasena",
    etiqueta: "Contraseña",
    tipo: "password",
    maximo: 64,
    ayuda: "Entre 8 y 64 caracteres. Usá datos de prueba.",
};

export const formulariosCuenta = {
    ingreso: {
        id: "iniciar-sesion",
        titulo: "Ingresá a tu cuenta",
        boton: "Iniciar sesión",
        aviso: "Validación de prueba. No se inicia una sesión real. Recordarme guarda solamente el email.",
        campos: [
            { ...email, completar: "username" },
            { ...contrasena, completar: "current-password" },
        ],
        inicial: { email: "", contrasena: "" },
        exito: "Datos válidos para la demostración. No se inició una sesión real.",
    },
    recuperacion: {
        id: "recuperar-contrasena",
        titulo: "Recuperar contraseña",
        boton: "Recuperar acceso",
        aviso: "Validación de prueba. No se envía un correo.",
        campos: [{ ...email, etiqueta: "Email de tu cuenta" }],
        inicial: { email: "" },
        exito: "Email válido para la demostración. No se envió un correo de recuperación.",
    },
    registro: {
        id: "crear-cuenta",
        titulo: "Crear cuenta",
        boton: "Crear cuenta de prueba",
        aviso: "Formulario de prueba. No se crean cuentas reales ni se guardan contraseñas.",
        campos: [
            { nombre: "nombre", etiqueta: "Nombre", maximo: 40, completar: "given-name" },
            { nombre: "apellido", etiqueta: "Apellido", maximo: 40, completar: "family-name" },
            email,
            { ...contrasena, completar: "new-password" },
            {
                nombre: "confirmacion",
                etiqueta: "Repetir contraseña",
                tipo: "password",
                maximo: 64,
                completar: "new-password",
            },
        ],
        inicial: { nombre: "", apellido: "", email: "", contrasena: "", confirmacion: "" },
        exito: "Registro validado como demostración. No se creó una cuenta ni se guardaron contraseñas.",
    },
};
