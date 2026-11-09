import EnlaceSeccion from "@/components/EnlaceSeccion.jsx";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Cabecera from "@/components/Cabecera.jsx";
import Pie from "@/components/Pie.jsx";

/**
 * Mantiene encabezado y pie y muestra la página hija mediante Outlet.
 * @returns {import("react").ReactElement} Estructura común del sitio.
 */
const Layout = ({ productos, unidades, contenido, errorContenido, reintentarContenido }) => {
    const ubicacion = useLocation();
    const seccion = new URLSearchParams(ubicacion.search).get("seccion") || ubicacion.hash.slice(1);

    const categoriaDestino =
        seccion === "titulo-catalogo" ? new URLSearchParams(ubicacion.search).get("categoria") : "";

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
        paginas["/carrito"] = {
            titulo: "Carrito",
            descripcion: "Revisá tus prendas, cantidades y el total de tu selección.",
        };
        paginas["/cuenta"] = {
            titulo: "Mi cuenta",
            descripcion: "Tu espacio para seguir descubriendo música para vestir.",
        };
        paginas["/contacto"] = {
            titulo: "Contacto",
            descripcion: "Consultanos por prendas, talles, envíos y cambios.",
        };
        const parametros = new URLSearchParams(ubicacion.search);
        const categoria = contenido?.catalogo.categorias.find(
            (item) => item.id === parametros.get("categoria"),
        );
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
    }, [ubicacion.pathname, ubicacion.search, productos, contenido]);

    useEffect(() => {
        const destinoSeccion = document.getElementById(seccion);
        const destino = destinoSeccion || document.getElementById("contenido");
        if (!destinoSeccion || seccion === "encabezado") {
            window.scrollTo(0, 0);
        } else {
            destino?.scrollIntoView();
        }
        destino?.focus({ preventScroll: true });
    }, [ubicacion.pathname, seccion, categoriaDestino, contenido]);

    return (
        <>
            <EnlaceSeccion clase="saltar-contenido" to={ubicacion.pathname} seccion="contenido">
                Saltar al contenido
            </EnlaceSeccion>
            <Cabecera unidades={unidades} />
            <main id="contenido" tabIndex="-1">
                {contenido ? (
                    <Outlet />
                ) : (
                    <div className="contenedor aviso-catalogo">
                        {errorContenido ? (
                            <div role="alert">
                                <p>{errorContenido}</p>
                                <button className="boton" type="button" onClick={reintentarContenido}>
                                    Intentar de nuevo
                                </button>
                            </div>
                        ) : (
                            <p role="status">Cargando contenido…</p>
                        )}
                    </div>
                )}
            </main>
            <Pie />
        </>
    );
};

export default Layout;
