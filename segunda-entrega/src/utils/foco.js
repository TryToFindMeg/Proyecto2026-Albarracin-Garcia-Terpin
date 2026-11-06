/** Conserva el foco después de que React actualiza los controles de un formulario. */
export const enfocarTrasActualizar = (id) => {
    requestAnimationFrame(() => {
        if (document.querySelector("dialog[open]")) return;
        const control = document.getElementById(id);
        if (control) {
            control.focus({ preventScroll: true });
        } else {
            const contenido = document.getElementById("contenido");
            contenido?.focus({ preventScroll: true });
            contenido?.scrollIntoView();
        }
    });
};
