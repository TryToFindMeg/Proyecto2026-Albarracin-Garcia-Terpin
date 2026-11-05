import { Link } from "react-router-dom";
import Boton from "@/components/Boton.jsx";
import Tarjeta from "@/components/Tarjeta.jsx";
import fotoPresentacion from "@/assets/mujer-tienda-vinilos.jpeg";
import { destacados, estilos } from "@/data/inicio.js";
import { crearEnlaceHTML } from "@/utils/rutas.js";
import TarjetaProducto from "@/components/TarjetaProducto.jsx";
import EstadoProductos from "@/components/EstadoProductos.jsx";

/**
 * Muestra la presentación, los destacados y los estilos musicales de la tienda.
 * @returns {import("react").ReactElement} Página de Inicio.
 */
const Inicio = ({ productos, cargando, error, reintentar }) => {
    const productosDestacados = destacados
        .map((id) => productos.find((producto) => producto.id === id))
        .filter(Boolean);
    return (
        <div className="contenedor pagina-inicio">
            <header className="presentacion presentacion-inicio">
                <div className="presentacion-texto">
                    <p className="etiqueta-seccion">Ropa para llevar tu música</p>
                    <h1>Vestí la música</h1>
                    <p>Prendas y accesorios para quienes llevan una canción en la piel.</p>
                    <Boton to="/productos?categoria=remeras">Explorar la tienda</Boton>
                </div>
                <img
                    className="foto-presentacion"
                    src={fotoPresentacion}
                    alt="Mujer mirando discos de vinilo en una disquería"
                    width="620"
                    height="470"
                />
            </header>
            <section className="seccion-inicio" id="destacados">
                <h2>Productos destacados</h2>
                <EstadoProductos cargando={cargando} error={error} reintentar={reintentar} />
                {!cargando && !error && (
                    <div className="lista-destacados">
                        {productosDestacados.map((producto) => (
                            <TarjetaProducto key={producto.id} producto={producto} />
                        ))}
                    </div>
                )}
                <p className="ver-todos">
                    <Boton to="/productos" secundario>
                        Ver todos los productos
                    </Boton>
                </p>
            </section>
            <section className="seccion-inicio" id="estilos" tabIndex="-1">
                <h2>Comprá por estilo</h2>
                <p>Explorá las colecciones por género musical.</p>
                <div className="lista-estilos">
                    {estilos.map((estilo) => (
                        <Tarjeta
                            key={estilo.id}
                            titulo={estilo.nombre}
                            imagen={crearEnlaceHTML(`imagenes/${estilo.imagen}`)}
                            alt={estilo.alt}
                            clase="tarjeta-estilo"
                        >
                            <Boton to={`/productos?genero=${estilo.id}`} secundario>
                                Explorar {estilo.nombre}
                            </Boton>
                        </Tarjeta>
                    ))}
                </div>
                <p className="otros-estilos">
                    También podés explorar <Link to="/productos?genero=metal">Metal</Link>,{" "}
                    <Link to="/productos?genero=punk">Punk</Link> y{" "}
                    <Link to="/productos?genero=grunge">Grunge</Link>.
                </p>
            </section>
            <section className="bloque-historia seccion-inicio" id="historia">
                <img
                    src={crearEnlaceHTML("imagenes/vinilos-apilados.jpeg")}
                    alt="Discos de vinilo apilados"
                    width="560"
                    height="360"
                    loading="lazy"
                />
                <div>
                    <h2>Más que ropa. Una forma de vivir.</h2>
                    <p>
                        RetroWave nace del amor por los discos, las portadas inolvidables y la gente que
                        convierte la música en parte de su identidad.
                    </p>
                    <Boton to="/nosotros">Conocé RetroWave</Boton>
                </div>
            </section>
            <section className="seccion-inicio" id="servicios">
                <h2>Tu experiencia RetroWave</h2>
                <div className="lista-servicios">
                    <Tarjeta titulo="Envíos">
                        <p>Consultá las opciones para recibir tu pedido.</p>
                        <Link to="/contacto#envios">Información de envíos</Link>
                    </Tarjeta>
                    <Tarjeta titulo="Cambios">
                        <p>Encontrá tu calce ideal.</p>
                        <Link to="/contacto#cambios">Consultar por un cambio</Link>
                    </Tarjeta>
                    <Tarjeta titulo="Pasión por la música">
                        <p>Prendas para fans y coleccionistas.</p>
                        <Link to="/nosotros#valores">Lo que nos mueve</Link>
                    </Tarjeta>
                </div>
            </section>
        </div>
    );
};

export default Inicio;
