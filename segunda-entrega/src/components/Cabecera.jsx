import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { crearEnlaceHTML } from "@/utils/rutas.js";
import { leerUnidadesCarrito } from "@/utils/carrito.js";

/**
 * Muestra la navegación fija y las unidades del carrito compartido con HTML.
 * @returns {import("react").ReactElement} Encabezado de RetroWave.
 */
const Cabecera = () => {
    const [unidades, setUnidades] = useState(leerUnidadesCarrito);

    useEffect(() => {
        /** Actualiza el contador al volver al sitio o cambiar el almacenamiento. */
        const actualizarUnidades = () => setUnidades(leerUnidadesCarrito());
        window.addEventListener("storage", actualizarUnidades);
        window.addEventListener("focus", actualizarUnidades);
        return () => {
            window.removeEventListener("storage", actualizarUnidades);
            window.removeEventListener("focus", actualizarUnidades);
        };
    }, []);

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
                            <a href={crearEnlaceHTML("productos.html?categoria=remeras")}>Tienda</a>
                        </li>
                        <li>
                            <Link to="/#estilos">Artistas y estilos</Link>
                        </li>
                        <li>
                            <NavLink to="/nosotros">Nosotros</NavLink>
                        </li>
                        <li>
                            <a href={crearEnlaceHTML("contacto.html")}>Contacto</a>
                        </li>
                        <li>
                            <a href={crearEnlaceHTML("cuenta.html")}>Mi cuenta</a>
                        </li>
                        <li>
                            <a href={crearEnlaceHTML("carrito.html")}>
                                Carrito{" "}
                                <span
                                    className="contador-carrito"
                                    aria-live="polite"
                                    aria-label={`${unidades} unidades en el carrito`}
                                >
                                    {unidades}
                                </span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Cabecera;
