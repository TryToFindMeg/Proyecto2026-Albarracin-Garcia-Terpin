import { Link, useLocation } from "react-router-dom";
import Boton from "@/components/Boton.jsx";
import { crearEnlaceHTML } from "@/utils/rutas.js";

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
                                <a href={crearEnlaceHTML("productos.html?categoria=remeras")}>Remeras</a>
                            </li>
                            <li>
                                <a href={crearEnlaceHTML("productos.html?categoria=buzos")}>Buzos</a>
                            </li>
                            <li>
                                <a href={crearEnlaceHTML("productos.html?categoria=accesorios")}>
                                    Accesorios
                                </a>
                            </li>
                            <li>
                                <a href={crearEnlaceHTML("contacto.html#preguntas")}>Preguntas frecuentes</a>
                            </li>
                            <li>
                                <a href={crearEnlaceHTML("contacto.html#envios")}>Envíos</a>
                            </li>
                            <li>
                                <a href={crearEnlaceHTML("contacto.html#cambios")}>Cambios</a>
                            </li>
                        </ul>
                    </nav>
                    <section className="novedades" id="novedades">
                        <h2>Quedate en la frecuencia</h2>
                        <p>Novedades, lanzamientos y música para vestir.</p>
                        <Boton href={crearEnlaceHTML("index.html#novedades")}>Suscribirme</Boton>
                    </section>
                </div>
                <div className="cierre-pie">
                    <small>© 2026 RetroWave</small>
                    <Link to={`${ubicacion.pathname}#encabezado`}>Volver arriba</Link>
                </div>
            </div>
        </footer>
    );
};

export default Pie;
