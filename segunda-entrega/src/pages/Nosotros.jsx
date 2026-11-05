import Boton from "@/components/Boton.jsx";
import Tarjeta from "@/components/Tarjeta.jsx";
import { crearEnlaceHTML } from "@/utils/rutas.js";

/**
 * Cuenta la historia y los valores de RetroWave.
 * @returns {import("react").ReactElement} Página Nosotros.
 */
const Nosotros = () => {
    return (
        <div className="contenedor pagina-nosotros">
            <header className="presentacion presentacion-nosotros">
                <div className="presentacion-texto">
                    <p className="etiqueta-seccion">Nuestra historia</p>
                    <h1>Más que ropa. Una forma de vivir.</h1>
                    <p>
                        RetroWave nace de esos discos que todavía guardan una historia, de las prendas que se
                        vuelven parte de un recuerdo y de la energía que queda después de un gran show.
                    </p>
                </div>
                <img
                    className="foto-presentacion"
                    src={crearEnlaceHTML("imagenes/personas-disqueria.jpeg")}
                    alt="Personas recorriendo una tienda de discos"
                    width="620"
                    height="470"
                />
            </header>
            <section className="bloque-historia seccion-nosotros" id="historia">
                <img
                    src={crearEnlaceHTML("imagenes/remeras-perchero.jpeg")}
                    alt="Remeras estampadas colgadas en un perchero"
                    width="560"
                    height="380"
                    loading="lazy"
                />
                <div>
                    <h2>Prendas que conectan canciones, lugares y momentos</h2>
                    <p>
                        RetroWave es una marca nacida del vínculo entre la música, las prendas y los recuerdos
                        que se quedan con nosotros. Nos inspiran las tapas gastadas, los afiches guardados y
                        las remeras que cuentan dónde estuvimos.
                    </p>
                    <p>
                        Pensamos cada colección como una conversación abierta: un cruce entre sonidos que
                        vuelven, imágenes que llaman la atención y formas personales de armar estilo.
                    </p>
                    <p>Para quienes encuentran una canción y sienten que también encontraron algo propio.</p>
                </div>
            </section>
            <section className="seccion-nosotros" id="valores" tabIndex="-1">
                <h2>Lo que nos mueve</h2>
                <div className="lista-valores">
                    <Tarjeta titulo="Pasión por la música">
                        <p>
                            Nos guían los sonidos que acompañan una época, un viaje o una tarde de búsqueda
                            entre discos.
                        </p>
                    </Tarjeta>
                    <Tarjeta titulo="Estilo con identidad">
                        <p>
                            Elegimos referencias visuales que invitan a mezclar, reinterpretar y hacer propia
                            cada prenda.
                        </p>
                    </Tarjeta>
                    <Tarjeta titulo="Comunidad">
                        <p>
                            Celebramos los gustos compartidos, los descubrimientos recomendados y las
                            historias que se cruzan.
                        </p>
                    </Tarjeta>
                </div>
            </section>
            <section className="seccion-nosotros" id="colecciones">
                <h2>Colecciones que empiezan con una canción</h2>
                <div className="lista-colecciones">
                    <Tarjeta
                        titulo="El pulso de los discos"
                        imagen={crearEnlaceHTML("imagenes/vinilo-tocadiscos.jpeg")}
                        alt="Disco de vinilo en un tocadiscos"
                    >
                        <p>
                            La repetición de un surco, una portada que se reconoce al instante y el ritual de
                            elegir qué suena primero.
                        </p>
                    </Tarjeta>
                    <Tarjeta
                        titulo="Detalles para mirar de cerca"
                        imagen={crearEnlaceHTML("imagenes/remera-grafica-vintage.jpeg")}
                        alt="Remera de una banda con estampado en celeste y amarillo"
                    >
                        <p>
                            Tipografías, estampados y colores que transmiten una sensación antes de decir una
                            palabra.
                        </p>
                    </Tarjeta>
                    <Tarjeta
                        titulo="La energía de estar ahí"
                        imagen={crearEnlaceHTML("imagenes/publico-concierto.jpeg")}
                        alt="Público en un concierto"
                    >
                        <p>
                            Hay canciones que se recuerdan por cómo sonaron en vivo. Nos inspira esa mezcla de
                            movimiento, luces y encuentros.
                        </p>
                    </Tarjeta>
                </div>
            </section>
            <section className="invitacion-tienda seccion-nosotros">
                <h2>La música no solo se escucha. También se lleva.</h2>
                <Boton href={crearEnlaceHTML("productos.html?categoria=remeras")}>Explorar la tienda</Boton>
                <Boton to="/" secundario>
                    Volver a Inicio
                </Boton>
            </section>
        </div>
    );
};

export default Nosotros;
