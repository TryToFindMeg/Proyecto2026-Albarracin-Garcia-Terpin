import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Cabecera from "@/components/Cabecera.jsx";
import Pie from "@/components/Pie.jsx";
import { categorias } from "@/data/catalogo.js";

/**
 * Mantiene encabezado y pie y muestra la página hija mediante Outlet.
 * @returns {import("react").ReactElement} Estructura común del sitio.
 */
const Layout = ({ productos, unidades }) => {
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
        const parametros = new URLSearchParams(ubicacion.search);
        const categoria = categorias.find((item) => item.id === parametros.get("categoria"));
        if (ubicacion.pathname === "/productos") {
            paginas["/productos"] = {
                titulo: categoria?.nombre || "Todos los productos",
                descripcion: "Explorá el catálogo de RetroWave por categoría, género y artista.",
            };
        }
        if (ubicacion.pathname.startsWith("/producto/")) {
            const id = ubicacion.pathname.slice("/producto/".length);
            const producto = productos.find((item) => item.id === id);
            paginas[ubicacion.pathname] = {
                titulo: producto?.nombre || "Detalle del producto",
                descripcion: producto?.descripcion || "Conocé los detalles de los productos de RetroWave.",
            };
        }
        const pagina = paginas[ubicacion.pathname] || {
            titulo: "Página no encontrada",
            descripcion: "Volvé a Inicio para seguir recorriendo RetroWave.",
        };
        document.title = `${pagina.titulo} | RetroWave`;
        document.querySelector('meta[name="description"]').setAttribute("content", pagina.descripcion);
    }, [ubicacion.pathname, ubicacion.search, productos]);

    useEffect(() => {
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
            <Link className="saltar-contenido" to={`${ubicacion.pathname}${ubicacion.search}#contenido`}>
                Saltar al contenido
            </Link>
            <Cabecera unidades={unidades} />
            <main id="contenido" tabIndex="-1">
                <Outlet />
            </main>
            <Pie />
        </>
    );
};

export default Layout;
