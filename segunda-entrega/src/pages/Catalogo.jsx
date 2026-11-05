import { Link, useLocation, useSearchParams } from "react-router-dom";
import Filtros from "@/components/Filtros.jsx";
import TarjetaProducto from "@/components/TarjetaProducto.jsx";
import EstadoProductos from "@/components/EstadoProductos.jsx";
import { categorias } from "@/data/catalogo.js";
import { leerFiltros, validarPrecios, filtrarProductos } from "@/utils/filtros.js";

/**
 * Comparte un catálogo para todas las categorías y conserva sus filtros en la URL.
 * @param {object} props - Productos y estado de la API.
 * @returns {import("react").ReactElement} Catálogo filtrable de RetroWave.
 */
const Catalogo = ({ productos, cargando, error, reintentar }) => {
    const [parametros, setParametros] = useSearchParams();
    const ubicacion = useLocation();
    const filtros = leerFiltros(parametros);
    const errores = validarPrecios(filtros);
    const preciosValidos = !errores.minimo && !errores.maximo;
    const seleccion = preciosValidos ? filtrarProductos(productos, filtros) : [];
    const categoria = categorias.find((item) => item.id === filtros.categoria);

    /** Actualiza un filtro sin abandonar la categoría seleccionada. */
    const cambiarFiltro = (nombre, valor) => {
        const nuevos = nombre === "categoria" ? new URLSearchParams() : new URLSearchParams(parametros);
        if (valor === "" || valor === "all" || (nombre === "orden" && valor === "featured")) {
            nuevos.delete(nombre);
        } else {
            nuevos.set(nombre, valor);
        }
        setParametros(nuevos, { replace: true });
    };
    /** Limpia las preferencias y conserva la categoría actual. */
    const limpiarFiltros = () => {
        setParametros(filtros.categoria === "all" ? {} : { categoria: filtros.categoria }, { replace: true });
    };

    return (
        <div className="contenedor pagina-catalogo">
            <header className="titulo-catalogo">
                <h1>{categoria.nombre}</h1>
                <p>Encontrá la prenda que lleva tu música.</p>
            </header>
            <nav className="categorias" aria-label="Categorías de productos">
                <ul>
                    {categorias.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={item.id === "all" ? "/productos" : `/productos?categoria=${item.id}`}
                                aria-current={filtros.categoria === item.id ? "page" : undefined}
                            >
                                {item.nombre}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="catalogo-con-filtros">
                <Filtros
                    filtros={filtros}
                    errores={errores}
                    productos={productos}
                    deshabilitado={cargando || !!error}
                    alCambiar={cambiarFiltro}
                    alLimpiar={limpiarFiltros}
                />
                <section className="resultados-catalogo" aria-labelledby="titulo-resultados">
                    <h2 id="titulo-resultados">
                        {filtros.categoria === "all"
                            ? "Todos los productos"
                            : `Catálogo de ${categoria.nombre.toLowerCase()}`}
                    </h2>
                    <EstadoProductos cargando={cargando} error={error} reintentar={reintentar} />
                    {!cargando && !error && (
                        <>
                            <p role="status">
                                {preciosValidos
                                    ? `${seleccion.length} ${seleccion.length === 1 ? "producto" : "productos"}. Precios expresados en pesos argentinos.`
                                    : "Revisá los precios para aplicar los filtros."}
                            </p>
                            {preciosValidos && seleccion.length === 0 && (
                                <p className="sin-resultados">
                                    No encontramos productos con esas preferencias. Probá cambiar o limpiar
                                    los filtros.
                                </p>
                            )}
                            <div className="lista-catalogo">
                                {seleccion.map((producto) => (
                                    <TarjetaProducto
                                        key={producto.id}
                                        producto={producto}
                                        busqueda={ubicacion.search}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Catalogo;
