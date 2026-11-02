import fotoPresentacion from "@/assets/mujer-tienda-vinilos.jpeg";

/**
 * Muestra la presentación inicial de RetroWave.
 * @returns {import("react").ReactElement} Presentación con la identidad de la tienda.
 */
const App = () => {
    return (
        <main className="presentacion">
            <section className="presentacion__texto" aria-labelledby="titulo-inicio">
                <p className="marca">RetroWave</p>
                <p className="lema">Música · Ropa · Identidad</p>
                <h1 id="titulo-inicio">Vestí la música</h1>
                <p className="presentacion__descripcion">
                    Prendas y accesorios para quienes llevan una canción en la piel.
                </p>
            </section>
            <img
                className="presentacion__imagen"
                src={fotoPresentacion}
                alt="Mujer mirando discos de vinilo en una disquería"
                width="600"
                height="700"
            />
        </main>
    );
};

export default App;
