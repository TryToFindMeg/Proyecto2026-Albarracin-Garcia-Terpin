import { useState } from "react";
import Boton from "@/components/Boton.jsx";
import CarritoVacio from "@/components/CarritoVacio.jsx";
import EstadoProductos from "@/components/EstadoProductos.jsx";
import TablaCarrito from "@/components/TablaCarrito.jsx";
import Dialogo from "@/components/Dialogo.jsx";
import { formatearPrecio } from "@/utils/precios.js";

/** Presenta el carrito compartido, conserva las compras y confirma su vaciado. */
const Carrito = ({ productos, cargando, error, reintentar, seleccion, alGuardar }) => {
    const [aviso, setAviso] = useState("");
    const [fallo, setFallo] = useState("");
    const [dialogo, setDialogo] = useState("");
    const [resumen, setResumen] = useState(null);
    /** Comunica un guardado al estado principal y muestra su resultado. */
    const guardar = (carrito, codigo, mensaje) => {
        setFallo("");
        setAviso("");
        try {
            alGuardar(carrito, codigo);
            setAviso(mensaje);
            return true;
        } catch (problema) {
            setFallo(problema.message);
            return false;
        }
    };
    /** Borra las compras y el cupón después de la confirmación. */
    const confirmarVaciado = () => {
        if (guardar([], "", "Se vació el carrito.")) setDialogo("");
    };
    /** Abre el resumen sin generar una operación real. */
    const mostrarResumen = (totales) => {
        setResumen(totales);
        setDialogo("resumen");
    };
    return (
        <div className="contenedor pagina-carrito">
            <header className="titulo-catalogo">
                <h1>Tu carrito</h1>
                <p>Revisá tus productos, cantidades y el total de tu selección.</p>
            </header>
            {seleccion.carrito.length === 0 ? (
                <CarritoVacio />
            ) : (
                <>
                    <EstadoProductos cargando={cargando} error={error} reintentar={reintentar} />
                    {!cargando && !error && (
                        <TablaCarrito
                            key={JSON.stringify(seleccion)}
                            carrito={seleccion.carrito}
                            codigo={seleccion.codigo}
                            productos={productos}
                            alGuardar={guardar}
                            alResumen={mostrarResumen}
                        />
                    )}
                    <div className="acciones-formulario acciones-carrito">
                        <button
                            className="boton boton-secundario"
                            type="button"
                            onClick={() => {
                                setFallo("");
                                setDialogo("vaciar");
                            }}
                        >
                            Vaciar carrito
                        </button>
                        <Boton to="/productos?categoria=remeras" secundario>
                            Seguir comprando
                        </Boton>
                    </div>
                </>
            )}
            {fallo && !dialogo && (
                <p className="error-campo" role="alert">
                    {fallo}
                </p>
            )}
            <p className="mensaje-formulario" role="status">
                {aviso}
            </p>
            {dialogo === "vaciar" && (
                <Dialogo
                    titulo="¿Vaciar el carrito?"
                    alCerrar={() => setDialogo("")}
                    confirmar={confirmarVaciado}
                    textoConfirmar="Sí, vaciar carrito"
                >
                    <p>Se quitarán todos los productos y el descuento de tu selección.</p>
                    {fallo && (
                        <p className="error-campo" role="alert">
                            {fallo}
                        </p>
                    )}
                </Dialogo>
            )}
            {dialogo === "resumen" && (
                <Dialogo
                    titulo="Resumen de prueba"
                    alCerrar={() => setDialogo("")}
                    textoCerrar="Cerrar resumen"
                >
                    <p>
                        Total de productos: <strong>{formatearPrecio(resumen.total)}</strong>.
                    </p>
                    <p>El envío no está incluido. No se genera un pedido ni un pago real.</p>
                </Dialogo>
            )}
        </div>
    );
};
export default Carrito;
