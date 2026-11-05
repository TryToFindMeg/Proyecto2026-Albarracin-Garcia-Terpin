import { Link, useLocation } from "react-router-dom";
import Novedades from "@/components/Novedades.jsx";

/**
 * Reutiliza los enlaces y la presentación del pie de las páginas de React.
 * @returns {import("react").ReactElement} Pie de página compartido.
 */
const Pie = () => {
    const ubicacion = useLocation();
    return (
        <footer className="pie-pagina">
            <div className="contenedor">
                <div className="columnas-pie">
                    <div>
                        <p className="marca-pie">RetroWave</p>
                        <p>La música también se lleva.</p>
                        <Link to="/nosotros">Conocé nuestra historia</Link>
                    </div>
                    <nav aria-label="Enlaces del pie de página">
                        <h2>Explorá la tienda</h2>
                        <ul>
                            <li>
                                <Link to="/productos?categoria=remeras">Remeras</Link>
                            </li>
                            <li>
                                <Link to="/productos?categoria=buzos">Buzos</Link>
                            </li>
                            <li>
                                <Link to="/productos?categoria=accesorios">Accesorios</Link>
                            </li>
                            <li>
                                <Link to="/contacto#preguntas">Preguntas frecuentes</Link>
                            </li>
                            <li>
                                <Link to="/contacto#envios">Envíos</Link>
                            </li>
                            <li>
                                <Link to="/contacto#cambios">Cambios</Link>
                            </li>
                        </ul>
                    </nav>
                    <Novedades />
                </div>
                <div className="cierre-pie">
                    <small>© 2026 RetroWave</small>
                    <Link to={`${ubicacion.pathname}${ubicacion.search}#encabezado`}>Volver arriba</Link>
                </div>
            </div>
        </footer>
    );
};

export default Pie;
