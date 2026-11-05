import { Link } from "react-router-dom";

/**
 * Reutiliza el estilo de los enlaces internos y los enlaces al sitio HTML.
 * @param {object} props - Destino, texto y variante visual del enlace.
 * @returns {import("react").ReactElement} Enlace con estilo de botón.
 */
const Boton = ({ to, href, secundario = false, children }) => {
    const clase = secundario ? "boton boton-secundario" : "boton";
    if (to) {
        return (
            <Link className={clase} to={to}>
                {children}
            </Link>
        );
    }
    return (
        <a className={clase} href={href}>
            {children}
        </a>
    );
};

export default Boton;
