import EnlaceSeccion from "@/components/EnlaceSeccion.jsx";
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
                                <EnlaceSeccion
                                    to="/productos"
                                    consulta={{ categoria: "remeras" }}
                                    seccion="titulo-catalogo"
                                >
                                    Remeras
                                </EnlaceSeccion>
                            </li>
                            <li>
                                <EnlaceSeccion
                                    to="/productos"
                                    consulta={{ categoria: "buzos" }}
                                    seccion="titulo-catalogo"
                                >
                                    Buzos
                                </EnlaceSeccion>
                            </li>
                            <li>
                                <EnlaceSeccion
                                    to="/productos"
                                    consulta={{ categoria: "accesorios" }}
                                    seccion="titulo-catalogo"
                                >
                                    Accesorios
                                </EnlaceSeccion>
                            </li>
                            <li>
                                <EnlaceSeccion to="/contacto" seccion="preguntas">
                                    Preguntas frecuentes
                                </EnlaceSeccion>
                            </li>
                            <li>
                                <EnlaceSeccion to="/contacto" seccion="envios">
                                    Envíos
                                </EnlaceSeccion>
                            </li>
                            <li>
                                <EnlaceSeccion to="/contacto" seccion="cambios">
                                    Cambios
                                </EnlaceSeccion>
                            </li>
                        </ul>
                    </nav>
                    <Novedades />
                </div>
                <div className="cierre-pie">
                    <small>© 2026 RetroWave</small>
                    <EnlaceSeccion to={ubicacion.pathname} seccion="encabezado">
                        Volver arriba
                    </EnlaceSeccion>
                </div>
            </div>
        </footer>
    );
};

export default Pie;
