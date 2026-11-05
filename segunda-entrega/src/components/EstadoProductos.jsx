/**
 * Informa la carga del catálogo y permite volver a intentar ante un error.
 * @param {object} props - Estado de la consulta y función para repetirla.
 * @returns {import("react").ReactElement|null} Aviso de carga o de error.
 */
const EstadoProductos = ({ cargando, error, reintentar }) => {
    if (cargando) {
        return (
            <p className="aviso-catalogo" role="status">
                Cargando productos…
            </p>
        );
    }
    if (error) {
        return (
            <div className="aviso-catalogo error-catalogo" role="alert">
                <p>{error}</p>
                <button className="boton" type="button" onClick={reintentar}>
                    Intentar de nuevo
                </button>
            </div>
        );
    }
    return null;
};

export default EstadoProductos;
