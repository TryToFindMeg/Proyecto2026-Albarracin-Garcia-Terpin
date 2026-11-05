import { useNavigate } from "react-router-dom";

/**
 * Ofrece una salida cuando la dirección no coincide con una página de React.
 * @returns {import("react").ReactElement} Mensaje de página no encontrada.
 */
const NoEncontrada = () => {
    const navegar = useNavigate();
    /** Regresa a Inicio desde una dirección inexistente. */
    const volverAlInicio = () => navegar("/");
    return (
        <section className="contenedor pagina-no-encontrada">
            <p className="etiqueta-seccion">404</p>
            <h1>Esta canción no está en el disco</h1>
            <p>No encontramos la página que buscás. Volvé a Inicio para seguir recorriendo RetroWave.</p>
            <button className="boton" type="button" onClick={volverAlInicio}>
                Volver a Inicio
            </button>
        </section>
    );
};

export default NoEncontrada;
