import { useState } from "react";
import { Link } from "react-router-dom";
import ResumenCarrito from "@/components/ResumenCarrito.jsx";
import { calcularTotales, validarCantidad, varianteDisponible } from "@/utils/carrito.js";
import { formatearPrecio } from "@/utils/precios.js";
import { crearEnlaceImagen } from "@/utils/rutas.js";

/** Edita cantidades con estado local, errores en tiempo real y guardado explícito. */
const TablaCarrito = ({ carrito, productos, codigo, alGuardar, alResumen }) => {
    const [cantidades, setCantidades] = useState(() => carrito.map((item) => String(item.cantidad)));
    const errores = cantidades.map(validarCantidad);
    const variantesValidas = carrito.every((item) => varianteDisponible(item, productos));
    const valido = !errores.some(Boolean) && variantesValidas;
    const nuevos = carrito.map((item, indice) => ({ ...item, cantidad: Number(cantidades[indice]) }));
    const totales = valido
        ? calcularTotales(nuevos, productos, codigo)
        : { subtotal: 0, descuento: 0, total: 0 };
    /** Guarda todas las cantidades válidas, manteniendo el cupón elegido. */
    const guardar = (nuevoCodigo = codigo) => {
        const indiceError = errores.findIndex(Boolean);
        if (indiceError >= 0) {
            document.getElementById(`cantidad-carrito-${indiceError}`).focus();
            return false;
        }
        if (!variantesValidas) return false;
        return alGuardar(nuevos, nuevoCodigo, "Carrito actualizado.");
    };
    /** Evita el envío del formulario y guarda la selección. */
    const actualizar = (evento) => {
        evento.preventDefault();
        guardar();
    };
    /** Guarda antes de abrir un resumen que no genera pedidos ni pagos. */
    const resumir = () => {
        if (guardar()) alResumen(totales);
    };
    return (
        <div className="carrito-contenido">
            <section className="productos-carrito" aria-labelledby="titulo-productos-carrito">
                <h2 id="titulo-productos-carrito">Productos elegidos</h2>
                <p>Modificá las cantidades y presioná Actualizar carrito para guardarlas.</p>
                {!variantesValidas && (
                    <p className="error-campo" role="alert">
                        Hay productos u opciones que ya no están disponibles. Eliminá esas filas para
                        continuar.
                    </p>
                )}
                <form className="formulario-react" onSubmit={actualizar} noValidate>
                    <div className="tabla-carrito-contenedor">
                        <table className="tabla-carrito">
                            <caption>Detalle de tu carrito en pesos argentinos</caption>
                            <thead>
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Precio unitario</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Subtotal</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carrito.map((item, indice) => {
                                    const producto = productos.find((actual) => actual.id === item.id);
                                    const disponible = varianteDisponible(item, productos);
                                    const nombre = producto?.nombre || "Producto no disponible";
                                    return (
                                        <tr key={`${item.id}-${item.talle}-${item.color}`}>
                                            <td>
                                                {producto ? (
                                                    <>
                                                        <Link to={`/producto/${encodeURIComponent(item.id)}`}>
                                                            {nombre}
                                                        </Link>
                                                        <img
                                                            src={crearEnlaceImagen(producto.imagen)}
                                                            alt={producto.alt}
                                                            width="100"
                                                            height="110"
                                                        />
                                                    </>
                                                ) : (
                                                    <strong>{nombre}</strong>
                                                )}
                                                <p>
                                                    Color: {item.color}. Talle: {item.talle}.
                                                </p>
                                                {!disponible && (
                                                    <p className="error-campo">Variante no disponible</p>
                                                )}
                                            </td>
                                            <td>{producto ? formatearPrecio(producto.precio) : "—"}</td>
                                            <td>
                                                <label
                                                    className="etiqueta-cantidad"
                                                    htmlFor={`cantidad-carrito-${indice}`}
                                                >
                                                    Cantidad de {nombre}, talle {item.talle}, color{" "}
                                                    {item.color}
                                                </label>
                                                <input
                                                    id={`cantidad-carrito-${indice}`}
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    step="1"
                                                    value={cantidades[indice]}
                                                    onChange={(evento) =>
                                                        setCantidades(
                                                            cantidades.map((valor, posicion) =>
                                                                posicion === indice
                                                                    ? evento.target.value
                                                                    : valor,
                                                            ),
                                                        )
                                                    }
                                                    aria-invalid={!!errores[indice]}
                                                    aria-describedby={
                                                        errores[indice]
                                                            ? `error-cantidad-${indice}`
                                                            : undefined
                                                    }
                                                />
                                                {errores[indice] && (
                                                    <p
                                                        className="error-campo"
                                                        id={`error-cantidad-${indice}`}
                                                        role="alert"
                                                    >
                                                        {errores[indice]}
                                                    </p>
                                                )}
                                            </td>
                                            <td>
                                                {!errores[indice] && disponible
                                                    ? formatearPrecio(
                                                          producto.precio * Number(cantidades[indice]),
                                                      )
                                                    : "—"}
                                            </td>
                                            <td>
                                                <button
                                                    id={`eliminar-carrito-${indice}`}
                                                    className="boton boton-secundario"
                                                    type="button"
                                                    onClick={() =>
                                                        alGuardar(
                                                            carrito.filter(
                                                                (actual, posicion) => posicion !== indice,
                                                            ),
                                                            codigo,
                                                            "Producto eliminado. Se conservaron las cantidades guardadas de las otras filas.",
                                                        )
                                                    }
                                                    aria-label={`Eliminar ${nombre}, talle ${item.talle}, color ${item.color}`}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="acciones-formulario">
                        <button
                            id="actualizar-carrito"
                            className="boton"
                            type="submit"
                            disabled={!variantesValidas}
                        >
                            Actualizar carrito
                        </button>
                        <button
                            id="restablecer-cantidades"
                            className="boton boton-secundario"
                            type="button"
                            onClick={() =>
                                alGuardar(
                                    carrito.map((item) => ({ ...item, cantidad: 1 })),
                                    codigo,
                                    "Cantidades restablecidas a una unidad.",
                                )
                            }
                        >
                            Restablecer cantidades a 1
                        </button>
                    </div>
                </form>
            </section>
            <ResumenCarrito
                totales={totales}
                codigoAplicado={codigo}
                valido={valido}
                alAplicar={guardar}
                alResumen={resumir}
            />
        </div>
    );
};
export default TablaCarrito;
