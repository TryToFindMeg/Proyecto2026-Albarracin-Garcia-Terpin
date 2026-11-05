import { leerTextoLocal, guardarTextoLocal } from "@/utils/almacenamiento.js";
import { validarEmail } from "@/utils/validaciones.js";

/** Recupera solo el email que el usuario eligió recordar en este navegador. */
export const leerEmailRecordado = () => {
    const email = leerTextoLocal("retrowave-email-recordado") || "";
    return validarEmail(email) ? "" : email;
};

/** Guarda exclusivamente el email; nunca recibe ni almacena contraseñas. */
export const recordarEmail = (email) =>
    guardarTextoLocal("retrowave-email-recordado", email ? email.trim() : null);
