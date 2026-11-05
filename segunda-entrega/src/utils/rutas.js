/**
 * Crea un enlace al sitio HTML conservado dentro de public.
 * @param {string} pagina - Página o recurso relativo a sitio-html.
 * @returns {string} Dirección compatible con Vite y la compilación.
 */
export const crearEnlaceHTML = (pagina) => `${import.meta.env.BASE_URL}sitio-html/${pagina}`;
