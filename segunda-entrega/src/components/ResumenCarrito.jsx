import { useState } from "react";
import { formatearPrecio } from "@/utils/precios.js";
import { validarCodigo } from "@/utils/carrito.js";

/** Muestra totales y el cupón aplicado, con validación accesible mientras se escribe. */
const ResumenCarrito = ({ totales, codigoAplicado, valido, alAplicar, alResumen }) => {
    const [codigo, setCodigo] = useState(codigoAplicado);
    const [editado, setEditado] = useState(false);
    const error = editado ? validarCodigo(codigo) : "";
    /** Comprueba el cupón antes de comunicarlo al carrito. */
    const aplicar = (evento) => {
        evento.preventDefault();
        setEditado(true);
        if (validarCodigo(codigo)) return;
        alAplicar(codigo.trim().toUpperCase());
    };
    return (
        <aside className="resumen-carrito" aria-labelledby="titulo-resumen">
            <h2 id="titulo-resumen">Resumen de compra</h2>
            <form className="formulario-react" onSubmit={aplicar} noValidate>
                <label htmlFor="codigo-descuento">Código de descuento</label>
                <input
                    id="codigo-descuento"
                    maxLength="20"
                    value={codigo}
                    onChange={(evento) => {
                        setCodigo(evento.target.value);
                        setEditado(true);
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? "error-codigo ayuda-codigo" : "ayuda-codigo"}
                />
                <p className="ayuda-campo" id="ayuda-codigo">
                    RETRO10: 10 % de descuento de ejemplo. Dejá el campo vacío y aplicá para quitarlo.
                </p>
                {error && (
                    <p className="error-campo" id="error-codigo" role="alert">
                        {error}
                    </p>
                )}
                <button className="boton boton-secundario" type="submit">
                    Aplicar descuento
                </button>
            </form>
            <p className="mensaje-formulario" role="status">
                {codigoAplicado === "RETRO10"
                    ? "RETRO10 aplicado: 10 % de descuento."
                    : "Sin descuento aplicado."}
            </p>
            <dl className="importes-carrito" aria-live="polite">
                <div>
                    <dt>Subtotal</dt>
                    <dd>{valido ? formatearPrecio(totales.subtotal) : "—"}</dd>
                </div>
                <div>
                    <dt>Descuento</dt>
                    <dd>{valido ? formatearPrecio(totales.descuento) : "—"}</dd>
                </div>
                <div className="total-carrito">
                    <dt>Total de productos</dt>
                    <dd>{valido ? formatearPrecio(totales.total) : "—"}</dd>
                </div>
            </dl>
            <p className="ayuda-campo">
                Envío no incluido. Los importes se calculan con las cantidades que estás viendo; Actualizar
                carrito las guarda.
            </p>
            <button className="boton" type="button" onClick={alResumen} disabled={!valido}>
                Ver resumen de prueba
            </button>
            <p className="aviso-demo">Demostración: no se generan pedidos ni pagos.</p>
        </aside>
    );
};
export default ResumenCarrito;
