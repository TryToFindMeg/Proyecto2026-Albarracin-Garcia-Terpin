import { Link } from "react-router-dom";
import FormularioCuenta from "@/components/FormularioCuenta.jsx";
import { crearEnlaceHTML } from "@/utils/rutas.js";

/** Presenta los tres formularios de cuenta sin crear una sesión o un usuario reales. */
const Cuenta = () => (
    <div className="contenedor pagina-cuenta">
        <header className="presentacion presentacion-formularios">
            <div className="presentacion-texto">
                <h1>Volvé a conectar con tu estilo</h1>
                <p>Tu espacio para seguir descubriendo música para vestir.</p>
            </div>
            <img
                className="foto-presentacion"
                src={crearEnlaceHTML("imagenes/personas-disqueria.jpeg")}
                alt="Personas recorriendo una tienda de discos"
                width="620"
                height="320"
            />
        </header>
        <nav className="enlaces-formularios" aria-label="Opciones de cuenta">
            <Link to="/cuenta#iniciar-sesion">Ingresar</Link>
            <Link to="/cuenta#recuperar-contrasena">Recuperar contraseña</Link>
            <Link to="/cuenta#crear-cuenta">Crear cuenta</Link>
        </nav>
        <FormularioCuenta tipo="ingreso" />
        <FormularioCuenta tipo="recuperacion" />
        <FormularioCuenta tipo="registro" />
    </div>
);
export default Cuenta;
