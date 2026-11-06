import { Link } from "react-router-dom";

/** Reutiliza el estilo de las acciones que navegan entre páginas del sitio. */
const Boton = ({ to, secundario = false, children }) => (
    <Link className={secundario ? "boton boton-secundario" : "boton"} to={to}>
        {children}
    </Link>
);
export default Boton;
