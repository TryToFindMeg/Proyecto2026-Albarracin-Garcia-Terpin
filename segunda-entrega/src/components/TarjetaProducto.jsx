import Tarjeta from "@/components/Tarjeta.jsx";
import Boton from "@/components/Boton.jsx";
import { crearEnlaceHTML } from "@/utils/rutas.js";
import { formatearPrecio } from "@/utils/precios.js";
import { generos } from "@/data/catalogo.js";

/**
 * Reutiliza la misma tarjeta de producto en Inicio y en el catálogo.
 * @param {object} props - Producto y filtros que se conservarán en su ficha.
 * @returns {import("react").ReactElement} Tarjeta con precio y enlace al detalle.
 */
const TarjetaProducto = ({ producto, busqueda = "" }) => {
    const genero = generos.find((item) => item.id === producto.genero)?.nombre || producto.genero;
    return (
        <Tarjeta
            titulo={producto.nombre}
            imagen={crearEnlaceHTML(producto.imagen)}
            alt={producto.alt}
            clase="tarjeta-producto"
        >
            {!producto.disponible ? (
                <p className="estado agotado">Agotado</p>
            ) : (
                producto.nuevo && <p className="estado">Nuevo</p>
            )}
            <p className="precio">
                <strong>{formatearPrecio(producto.precio)}</strong>
            </p>
            <p>Colores: {producto.colores.join(" y ")}.</p>
            <p className="clasificacion-producto">
                {genero} · {producto.artista}
            </p>
            <div className="enlace-tarjeta">
                <Boton to={`/producto/${encodeURIComponent(producto.id)}${busqueda}`} secundario>
                    Ver {producto.nombre}
                </Boton>
            </div>
        </Tarjeta>
    );
};

export default TarjetaProducto;
