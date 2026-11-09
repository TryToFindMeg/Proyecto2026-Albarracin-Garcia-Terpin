import { useLocation, useParams } from "react-router-dom";
import EstadoProductos from "@/components/EstadoProductos.jsx";
import FichaProducto from "@/components/FichaProducto.jsx";
import Boton from "@/components/Boton.jsx";

/**
 * Busca por identificador dentro de los productos obtenidos de la API.
 * @param {object} props - Datos, estado del servicio y actualización del carrito.
 * @returns {import("react").ReactElement} Ficha elegida o aviso de producto inexistente.
 */
const Producto = ({ productos, cargando, error, reintentar, alAgregar, estadoCarrito, generos }) => {
    const { id } = useParams();
    const ubicacion = useLocation();
    const producto = productos.find((item) => item.id === id);
    return (
        <div className="contenedor pagina-producto">
            {(cargando || error) && (
                <header className="titulo-catalogo">
                    <h1>Detalle del producto</h1>
                </header>
            )}
            <EstadoProductos cargando={cargando} error={error} reintentar={reintentar} />
            {!cargando &&
                !error &&
                (producto ? (
                    <FichaProducto
                        generos={generos}
                        key={producto.id}
                        producto={producto}
                        regreso={`/productos${ubicacion.search || `?categoria=${producto.categoria}`}`}
                        alAgregar={alAgregar}
                        estadoCarrito={estadoCarrito}
                    />
                ) : (
                    <section className="pagina-no-encontrada">
                        <h1>Producto no encontrado</h1>
                        <p>Elegí una prenda del catálogo para consultar sus detalles.</p>
                        <Boton to="/productos">Ver todos los productos</Boton>
                    </section>
                ))}
        </div>
    );
};

export default Producto;
