/**
 * Muestra contenido con una misma estructura en Inicio y Nosotros.
 * @param {object} props - Título, imagen opcional y contenido de la tarjeta.
 * @returns {import("react").ReactElement} Tarjeta reutilizable.
 */
const Tarjeta = ({ titulo, imagen, alt, clase = "", children }) => {
    return (
        <article className={`tarjeta ${clase}`}>
            {imagen && <img src={imagen} alt={alt} width="280" height="250" loading="lazy" />}
            <div className="contenido-tarjeta">
                <h3>{titulo}</h3>
                {children}
            </div>
        </article>
    );
};

export default Tarjeta;
