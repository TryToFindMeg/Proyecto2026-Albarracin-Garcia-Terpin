import { Link, useLocation } from "react-router-dom";

/** Navega a una sección con una URL válida y permite volver a enfocarla al repetir el clic. */
const EnlaceSeccion = ({ to, seccion, clase, children }) => {
    const ubicacion = useLocation();
    const parametros = new URLSearchParams(ubicacion.pathname === to ? ubicacion.search : "");
    parametros.set("seccion", seccion);
    /** En la misma página, mueve también el foco si el destino ya estaba seleccionado. */
    const enfocar = () => {
        if (ubicacion.pathname !== to) return;
        const destino = document.getElementById(seccion);
        if (seccion === "encabezado") window.scrollTo(0, 0);
        else destino?.scrollIntoView();
        destino?.focus({ preventScroll: true });
    };
    return (
        <Link className={clase} to={`${to}?${parametros}`} onClick={enfocar}>
            {children}
        </Link>
    );
};
export default EnlaceSeccion;
