/** Lee un texto local sin interrumpir la página si el navegador lo bloquea. */
export const leerTextoLocal = (clave) => {
    try {
        return localStorage.getItem(clave);
    } catch {
        return null;
    }
};

/** Guarda o elimina un texto local y comunica los errores al formulario. */
export const guardarTextoLocal = (clave, valor) => {
    try {
        if (valor === null) localStorage.removeItem(clave);
        else localStorage.setItem(clave, valor);
    } catch {
        throw new Error("El navegador no pudo guardar los datos. Revisá los permisos de almacenamiento.");
    }
};
