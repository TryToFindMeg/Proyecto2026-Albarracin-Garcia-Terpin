import { useState } from "react";
import Campo from "@/components/Campo.jsx";
import { formulariosCuenta } from "@/data/cuenta.js";
import { validarCuenta } from "@/utils/validaciones.js";
import { leerEmailRecordado, recordarEmail } from "@/utils/cuenta.js";

/** Reutiliza los campos y la validación de ingreso, recuperación y registro de prueba. */
const FormularioCuenta = ({ tipo }) => {
    const configuracion = formulariosCuenta[tipo];
    const [valores, setValores] = useState(() => ({
        ...configuracion.inicial,
        email: tipo === "ingreso" ? leerEmailRecordado() : "",
    }));
    const [tocados, setTocados] = useState({});
    const [intentado, setIntentado] = useState(false);
    const [recordar, setRecordar] = useState(() => tipo === "ingreso" && !!leerEmailRecordado());
    const [mensaje, setMensaje] = useState("");
    const [errorGuardado, setErrorGuardado] = useState("");
    const errores = validarCuenta(tipo, valores);
    /** Actualiza un valor y deja que sus errores cambien mientras se escribe. */
    const cambiar = (evento) => {
        const { name, value } = evento.target;
        setValores({ ...valores, [name]: value });
        setTocados({ ...tocados, [name]: true });
        setMensaje("");
        setErrorGuardado("");
    };
    /** Valida todos los campos y conserva solamente el email si el usuario lo pidió. */
    const enviar = (evento) => {
        evento.preventDefault();
        setIntentado(true);
        setMensaje("");
        setErrorGuardado("");
        const primero = configuracion.campos.find((campo) => errores[campo.nombre]);
        if (primero) {
            document.getElementById(`${tipo}-${primero.nombre}`).focus();
            return;
        }
        try {
            if (tipo === "ingreso") recordarEmail(recordar ? valores.email : "");
            setValores(
                tipo === "ingreso"
                    ? { email: valores.email.trim(), contrasena: "" }
                    : { ...configuracion.inicial },
            );
            setTocados({});
            setIntentado(false);
            setMensaje(configuracion.exito);
        } catch (error) {
            setErrorGuardado(error.message);
        }
    };
    /** Limpia siempre los campos; un bloqueo del navegador solo impide borrar la preferencia. */
    const limpiar = (evento) => {
        evento.preventDefault();
        setValores({ ...configuracion.inicial });
        setRecordar(false);
        setTocados({});
        setIntentado(false);
        setMensaje("");
        setErrorGuardado("");
        if (tipo === "ingreso") {
            try {
                recordarEmail("");
            } catch (error) {
                setErrorGuardado(error.message);
            }
        }
    };
    return (
        <section
            className="panel-formulario"
            id={configuracion.id}
            tabIndex="-1"
            aria-labelledby={`${tipo}-titulo`}
        >
            <h2 id={`${tipo}-titulo`}>{configuracion.titulo}</h2>
            <p className="aviso-demo">{configuracion.aviso}</p>
            <p>Los campos con * son obligatorios.</p>
            <form className="formulario-react" onSubmit={enviar} onReset={limpiar} noValidate>
                <fieldset>
                    <legend>{tipo === "registro" ? "Tus datos de prueba" : "Datos de acceso"}</legend>
                    {configuracion.campos.map((campo) => (
                        <Campo
                            key={campo.nombre}
                            id={`${tipo}-${campo.nombre}`}
                            nombre={campo.nombre}
                            etiqueta={campo.etiqueta}
                            tipo={campo.tipo}
                            valor={valores[campo.nombre]}
                            alCambiar={cambiar}
                            error={intentado || tocados[campo.nombre] ? errores[campo.nombre] : ""}
                            ayuda={campo.ayuda}
                            maximo={campo.maximo}
                            completar={campo.completar}
                            obligatorio
                        />
                    ))}
                    {tipo === "ingreso" && (
                        <div className="opcion-recordarme">
                            <input
                                id="recordarme"
                                type="checkbox"
                                checked={recordar}
                                onChange={(evento) => {
                                    setRecordar(evento.target.checked);
                                    setMensaje("");
                                }}
                            />
                            <label htmlFor="recordarme">Recordarme en este navegador</label>
                        </div>
                    )}
                </fieldset>
                <div className="acciones-formulario">
                    <button className="boton" type="submit">
                        {configuracion.boton}
                    </button>
                    <button className="boton boton-secundario" type="reset">
                        Limpiar campos
                    </button>
                </div>
                {errorGuardado && (
                    <p className="error-campo" role="alert">
                        {errorGuardado}
                    </p>
                )}
                <p className="mensaje-formulario" role="status">
                    {mensaje}
                </p>
            </form>
        </section>
    );
};
export default FormularioCuenta;
