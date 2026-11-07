/** Informa la carga, el guardado o un error de la API sin mostrar un carrito vacío falso. */
const EstadoCarrito = ({ cargando, guardando, error, reintentar }) => {
    if (cargando)
        return (
            <p className="aviso-catalogo" role="status">
                Cargando carrito…
            </p>
        );
    if (error)
        return (
            <div className="aviso-catalogo error-catalogo" role="alert">
                <p>{error}</p>
                {reintentar && (
                    <button className="boton" type="button" onClick={reintentar}>
                        Volver a consultar el carrito
                    </button>
                )}
            </div>
        );
    if (guardando)
        return (
            <p className="mensaje-formulario" role="status">
                Guardando cambios del carrito…
            </p>
        );
    return null;
};
export default EstadoCarrito;
