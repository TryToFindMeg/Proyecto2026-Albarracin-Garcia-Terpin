import { useState } from "react";
import Campo from "@/components/Campo.jsx";
import { validarContacto } from "@/utils/validaciones.js";

const inicial = { nombre: "", email: "", motivo: "", pedido: "", mensaje: "" };

/** Valida una consulta en tiempo real y muestra una confirmación de demostración. */
const FormularioContacto = ({ motivosContacto }) => {
    const [valores, setValores] = useState(inicial);
    const [tocados, setTocados] = useState({});
    const [intentado, setIntentado] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const errores = validarContacto(valores);
    /** Actualiza el campo escrito y retira la confirmación anterior. */
    const cambiar = (evento) => {
        const { name, value } = evento.target;
        setValores({ ...valores, [name]: value });
        setTocados({ ...tocados, [name]: true });
        setMensaje("");
    };
    /** Devuelve el error visible de un campo editado o de un envío intentado. */
    const errorVisible = (nombre) => (intentado || tocados[nombre] ? errores[nombre] : "");
    /** Restablece los campos controlados y sus avisos. */
    const limpiar = () => {
        setValores(inicial);
        setTocados({});
        setIntentado(false);
        setMensaje("");
    };
    /** Impide el envío y confirma solo cuando todos los datos son válidos. */
    const enviar = (evento) => {
        evento.preventDefault();
        setIntentado(true);
        setMensaje("");
        const primero = Object.keys(errores).find((nombre) => errores[nombre]);
        if (primero) {
            document.getElementById(`contacto-${primero}`).focus();
            return;
        }
        limpiar();
        setMensaje("Consulta validada como demostración. El mensaje no se envió.");
    };
    return (
        <section className="panel-formulario" id="mensaje" tabIndex="-1" aria-labelledby="titulo-mensaje">
            <h2 id="titulo-mensaje">Contanos qué necesitás</h2>
            <p>Los campos con * son obligatorios.</p>
            <p className="aviso-demo">Formulario de prueba. El mensaje no se envía.</p>
            <form className="formulario-react" onSubmit={enviar} onReset={limpiar} noValidate>
                <fieldset>
                    <legend>Tus datos</legend>
                    <Campo
                        id="contacto-nombre"
                        nombre="nombre"
                        etiqueta="Nombre"
                        valor={valores.nombre}
                        alCambiar={cambiar}
                        error={errorVisible("nombre")}
                        maximo={60}
                        completar="name"
                        obligatorio
                    />
                    <Campo
                        id="contacto-email"
                        nombre="email"
                        etiqueta="Email"
                        tipo="email"
                        valor={valores.email}
                        alCambiar={cambiar}
                        error={errorVisible("email")}
                        maximo={100}
                        completar="email"
                        obligatorio
                    />
                </fieldset>
                <fieldset>
                    <legend>Tu consulta</legend>
                    <Campo
                        id="contacto-motivo"
                        nombre="motivo"
                        etiqueta="Motivo de consulta"
                        tipo="select"
                        valor={valores.motivo}
                        alCambiar={cambiar}
                        error={errorVisible("motivo")}
                        opciones={motivosContacto}
                        obligatorio
                    />
                    <Campo
                        id="contacto-pedido"
                        nombre="pedido"
                        etiqueta="Número de pedido (opcional)"
                        valor={valores.pedido}
                        alCambiar={cambiar}
                        error={errorVisible("pedido")}
                        maximo={20}
                        ayuda="Ejemplo: RW-1234."
                    />
                    <Campo
                        id="contacto-mensaje"
                        nombre="mensaje"
                        etiqueta="Mensaje"
                        tipo="textarea"
                        valor={valores.mensaje}
                        alCambiar={cambiar}
                        error={errorVisible("mensaje")}
                        maximo={2000}
                        obligatorio
                    />
                </fieldset>
                <div className="acciones-formulario">
                    <button className="boton" type="submit">
                        Enviar mensaje
                    </button>
                    <button className="boton boton-secundario" type="reset">
                        Limpiar formulario
                    </button>
                </div>
                <p className="mensaje-formulario" role="status">
                    {mensaje}
                </p>
            </form>
        </section>
    );
};
export default FormularioContacto;
