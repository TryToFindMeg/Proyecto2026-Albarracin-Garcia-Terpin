import EnlaceSeccion from "@/components/EnlaceSeccion.jsx";
import FormularioContacto from "@/components/FormularioContacto.jsx";
import { preguntas } from "@/data/contacto.js";
import { crearEnlaceImagen } from "@/utils/rutas.js";

/** Reúne el formulario de contacto y las preguntas frecuentes del sitio. */
const Contacto = () => (
    <div className="contenedor pagina-contacto">
        <header className="presentacion presentacion-formularios">
            <div className="presentacion-texto">
                <h1>Hablemos en la misma frecuencia</h1>
                <p>Estamos para ayudarte con tus prendas, talles y consultas.</p>
            </div>
            <img
                className="foto-presentacion"
                src={crearEnlaceImagen("imagenes/vinilo-tocadiscos.jpeg")}
                alt="Un disco de vinilo sobre un tocadiscos"
                width="620"
                height="320"
            />
        </header>
        <FormularioContacto />
        <section className="preguntas-frecuentes" id="preguntas" tabIndex="-1">
            <h2>Preguntas frecuentes</h2>
            {preguntas.map((pregunta) => (
                <article key={pregunta.id} id={pregunta.id} tabIndex="-1">
                    <h3>{pregunta.titulo}</h3>
                    <p>{pregunta.texto}</p>
                    <EnlaceSeccion to="/contacto" seccion="mensaje">
                        {pregunta.enlace}
                    </EnlaceSeccion>
                </article>
            ))}
        </section>
    </div>
);
export default Contacto;
