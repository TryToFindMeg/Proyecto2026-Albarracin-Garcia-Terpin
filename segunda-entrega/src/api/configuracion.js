const URL_CONFIGURADA = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

// En Pages se publica el catálogo estático; la API de escritura se ejecuta localmente.
export const URL_API = URL_CONFIGURADA || (import.meta.env.DEV ? "http://127.0.0.1:4000" : "");
