import EnlaceSeccion from "@/components/EnlaceSeccion.jsx";
import FormularioCuenta from "@/components/FormularioCuenta.jsx";
import { crearEnlaceImagen } from "@/utils/rutas.js";

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
                src={crearEnlaceImagen("imagenes/personas-disqueria.jpeg")}
                alt="Personas recorriendo una tienda de discos"
                width="620"
                height="320"
            />
        </header>
        <nav className="enlaces-formularios" aria-label="Opciones de cuenta">
            <EnlaceSeccion to="/cuenta" seccion="iniciar-sesion">
                Ingresar
            </EnlaceSeccion>
            <EnlaceSeccion to="/cuenta" seccion="recuperar-contrasena">
                Recuperar contraseña
            </EnlaceSeccion>
            <EnlaceSeccion to="/cuenta" seccion="crear-cuenta">
                Crear cuenta
            </EnlaceSeccion>
        </nav>
        <FormularioCuenta tipo="ingreso" />
        <FormularioCuenta tipo="recuperacion" />
        <FormularioCuenta tipo="registro" />
    </div>
);
export default Cuenta;
