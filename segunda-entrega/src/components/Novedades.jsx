import { useState } from "react";
import Campo from "@/components/Campo.jsx";
import { validarEmail } from "@/utils/validaciones.js";

/** Valida la suscripción de prueba que aparece en el pie de todas las páginas. */
const Novedades = () => {
    const [email, setEmail] = useState("");
    const [editado, setEditado] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const error = editado ? validarEmail(email) : "";
    /** Actualiza el email y su error mientras se escribe. */
    const cambiar = (evento) => {
        setEmail(evento.target.value);
        setEditado(true);
        setMensaje("");
    };
    /** Muestra una confirmación sin enviar el email a un servicio externo. */
    const enviar = (evento) => {
        evento.preventDefault();
        setEditado(true);
        setMensaje("");
        if (validarEmail(email)) {
            document.getElementById("email-novedades").focus();
            return;
        }
        setEmail("");
        setEditado(false);
        setMensaje("Email validado para la demostración. No se registró una suscripción real.");
    };
    return (
        <section className="novedades" id="novedades" tabIndex="-1" aria-labelledby="titulo-novedades">
            <h2 id="titulo-novedades">Quedate en la frecuencia</h2>
            <p>Novedades, lanzamientos y música para vestir.</p>
            <form className="formulario-react" onSubmit={enviar} noValidate>
                <Campo
                    id="email-novedades"
                    etiqueta="Tu email"
                    tipo="email"
                    valor={email}
                    alCambiar={cambiar}
                    error={error}
                    maximo={100}
                    completar="email"
                    obligatorio
                />
                <button className="boton" type="submit">
                    Suscribirme
                </button>
                <p className="ayuda-campo">Suscripción de prueba.</p>
                <p className="mensaje-formulario" role="status">
                    {mensaje}
                </p>
            </form>
        </section>
    );
};
export default Novedades;
