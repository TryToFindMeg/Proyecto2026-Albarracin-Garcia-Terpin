import { Link, NavLink, useLocation } from "react-router-dom";

/**
 * Muestra la navegación fija y el contador que comparte la aplicación.
 * @param {object} props - Cantidad de unidades del carrito.
 * @returns {import("react").ReactElement} Encabezado de RetroWave.
 */
const Cabecera = ({ unidades }) => {
    const ubicacion = useLocation();
    return (
        <header className="barra-superior" id="encabezado" tabIndex="-1">
            <div className="contenedor barra-contenido">
                <div className="marca">
                    <Link to="/" aria-label="RetroWave, inicio">
                        <strong>RetroWave</strong>
                    </Link>
                    <p className="lema">Música · Ropa · Identidad</p>
                </div>
                <nav className="navegacion-principal" aria-label="Navegación principal">
                    <ul>
                        <li>
                            <NavLink to="/" end>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <Link
                                to="/productos?categoria=remeras"
                                aria-current={ubicacion.pathname.startsWith("/producto") ? "page" : undefined}
                            >
                                Tienda
                            </Link>
                        </li>
                        <li>
                            <Link to="/#estilos">Artistas y estilos</Link>
                        </li>
                        <li>
                            <NavLink to="/nosotros">Nosotros</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contacto">Contacto</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cuenta">Mi cuenta</NavLink>
                        </li>
                        <li>
                            <NavLink to="/carrito">
                                Carrito{" "}
                                <span
                                    className="contador-carrito"
                                    aria-live="polite"
                                    aria-label={`${unidades} unidades en el carrito`}
                                >
                                    {unidades}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Cabecera;
