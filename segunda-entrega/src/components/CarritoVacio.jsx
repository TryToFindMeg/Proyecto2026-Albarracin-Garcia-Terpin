import Boton from "@/components/Boton.jsx";

/** Presenta el carrito vacío con una ilustración CSS centrada y enlaces al catálogo. */
const CarritoVacio = () => (
    <section className="carrito-vacio" aria-labelledby="titulo-vacio">
        <span className="disco-vacio" aria-hidden="true" />
        <h2 id="titulo-vacio">Tu carrito está vacío</h2>
        <p>Encontrá esa prenda que va con vos y con tu música.</p>
        <div className="acciones-formulario">
            <Boton to="/productos?categoria=remeras">Explorar la tienda</Boton>
            <Boton to="/productos" secundario>
                Ver todos los productos
            </Boton>
        </div>
    </section>
);
export default CarritoVacio;
