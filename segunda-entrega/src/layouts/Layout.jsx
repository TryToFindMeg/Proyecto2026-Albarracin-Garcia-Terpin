import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Cabecera from "@/components/Cabecera.jsx";
import Pie from "@/components/Pie.jsx";

/**
 * Mantiene encabezado y pie y muestra la página hija mediante Outlet.
 * @returns {import("react").ReactElement} Estructura común del sitio.
 */
const Layout = () => {
    const ubicacion = useLocation();

    useEffect(() => {
        const paginas = {
            "/": {
                titulo: "Inicio",
                descripcion: "Prendas y accesorios para quienes llevan una canción en la piel.",
            },
            "/nosotros": {
                titulo: "Nosotros",
                descripcion: "La historia, la música y las personas que inspiran a RetroWave.",
            },
        };
        const pagina = paginas[ubicacion.pathname] || {
            titulo: "Página no encontrada",
            descripcion: "Volvé a Inicio para seguir recorriendo RetroWave.",
        };
        document.title = `${pagina.titulo} | RetroWave`;
        document.querySelector('meta[name="description"]').setAttribute("content", pagina.descripcion);
        const seccion = ubicacion.hash.slice(1);
        const destino = document.getElementById(seccion || "contenido");
        if (!seccion || seccion === "encabezado") {
            window.scrollTo(0, 0);
        } else {
            destino?.scrollIntoView();
        }
        destino?.focus({ preventScroll: true });
    }, [ubicacion.pathname, ubicacion.hash]);

    return (
        <>
            <Link className="saltar-contenido" to={`${ubicacion.pathname}#contenido`}>
                Saltar al contenido
            </Link>
            <Cabecera />
            <main id="contenido" tabIndex="-1">
                <Outlet />
            </main>
            <Pie />
        </>
    );
};

export default Layout;
