import { useState } from "react";
import Boton from "@/components/Boton.jsx";
import { crearEnlaceImagen } from "@/utils/rutas.js";
import { formatearPrecio } from "@/utils/precios.js";
import { validarCantidad } from "@/utils/carrito.js";
import { generos } from "@/data/catalogo.js";

/**
 * Presenta las opciones de compra de cualquier producto del catálogo.
 * @param {object} props - Producto, regreso al catálogo y actualización del contador.
 * @returns {import("react").ReactElement} Ficha reutilizable con formulario controlado.
 */
const FichaProducto = ({ producto, regreso, alAgregar }) => {
    const [talle, setTalle] = useState(producto.talles[0]);
    const [color, setColor] = useState(producto.colores[0]);
    const [cantidad, setCantidad] = useState("1");
    const [mensaje, setMensaje] = useState("");
    const [errorCompra, setErrorCompra] = useState("");
    const errorCantidad = validarCantidad(cantidad);
    const genero = generos.find((item) => item.id === producto.genero)?.nombre || producto.genero;

    /** Comunica la compra al estado compartido de la aplicación. */
    const comprar = (evento) => {
        evento.preventDefault();
        setMensaje("");
        setErrorCompra("");
        if (errorCantidad) {
            document.getElementById("cantidad-producto").focus();
            return;
        }
        try {
            alAgregar(producto, talle, color, Number(cantidad));
            setMensaje(
                `Agregaste ${cantidad} ${Number(cantidad) === 1 ? "unidad" : "unidades"} de ${producto.nombre} al carrito.`,
            );
        } catch (error) {
            setErrorCompra(error.message);
        }
    };
    /** Restablece las opciones sin cambiar el carrito ya guardado. */
    const restablecer = () => {
        setTalle(producto.talles[0]);
        setColor(producto.colores[0]);
        setCantidad("1");
        setMensaje("");
        setErrorCompra("");
    };

    return (
        <>
            <header className="titulo-catalogo">
                <h1>{producto.nombre}</h1>
                <p>Conocé los detalles y elegí tus opciones.</p>
            </header>
            <section className="detalle-producto">
                <div className="imagen-detalle">
                    <img
                        src={crearEnlaceImagen(producto.imagen)}
                        alt={producto.alt}
                        width="620"
                        height="620"
                    />
                </div>
                <div className="informacion-producto">
                    <h2>Detalles y opciones</h2>
                    <p className="precio-detalle">
                        <strong>{formatearPrecio(producto.precio)}</strong>
                    </p>
                    <p>{producto.descripcion}</p>
                    <p className="clasificacion-producto">
                        {genero} · {producto.artista}
                    </p>
                    {!producto.disponible ? (
                        <p className="estado agotado">Agotado</p>
                    ) : (
                        producto.nuevo && <p className="estado">Nuevo</p>
                    )}
                    <form className="formulario-producto" onSubmit={comprar} noValidate>
                        <fieldset disabled={!producto.disponible}>
                            <legend>Elegí las opciones de {producto.nombre}</legend>
                            <label htmlFor="talle-producto">Talle</label>
                            <select
                                id="talle-producto"
                                value={talle}
                                onChange={(evento) => setTalle(evento.target.value)}
                            >
                                {producto.talles.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="color-producto">Color</label>
                            <select
                                id="color-producto"
                                value={color}
                                onChange={(evento) => setColor(evento.target.value)}
                            >
                                {producto.colores.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="cantidad-producto">Cantidad</label>
                            <input
                                id="cantidad-producto"
                                type="number"
                                min="1"
                                max="10"
                                step="1"
                                value={cantidad}
                                onChange={(evento) => {
                                    setCantidad(evento.target.value);
                                    setMensaje("");
                                    setErrorCompra("");
                                }}
                                aria-invalid={!!errorCantidad}
                                aria-describedby={errorCantidad ? "error-cantidad" : undefined}
                            />
                            {errorCantidad && (
                                <p className="error-campo" id="error-cantidad" role="alert">
                                    {errorCantidad}
                                </p>
                            )}
                        </fieldset>
                        <p className="importe-ficha" aria-live="polite">
                            Importe por la cantidad elegida:{" "}
                            <strong>
                                {errorCantidad ? "—" : formatearPrecio(producto.precio * Number(cantidad))}
                            </strong>
                        </p>
                        <div className="acciones-producto">
                            <button className="boton" type="submit" disabled={!producto.disponible}>
                                Agregar al carrito
                            </button>
                            <button className="boton boton-secundario" type="button" onClick={restablecer}>
                                Restablecer opciones
                            </button>
                        </div>
                    </form>
                    {errorCompra && (
                        <p className="error-campo" role="alert">
                            {errorCompra}
                        </p>
                    )}
                    <p className="mensaje-compra" role="status">
                        {mensaje}
                    </p>
                    <div className="enlaces-ficha">
                        <Boton to={regreso} secundario>
                            Volver al catálogo
                        </Boton>
                        <Boton to="/carrito">Ver carrito</Boton>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FichaProducto;
