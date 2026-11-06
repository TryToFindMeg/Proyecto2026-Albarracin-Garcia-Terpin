import { categorias, generos, ordenes } from "@/data/catalogo.js";

/**
 * Presenta controles de filtros que actualizan el catálogo al cambiar.
 * @param {object} props - Preferencias, opciones, errores y acciones del catálogo.
 * @returns {import("react").ReactElement} Formulario accesible de filtros.
 */
const Filtros = ({ filtros, errores, productos, deshabilitado, alCambiar, alLimpiar }) => {
    const colores = [...new Set(productos.flatMap((producto) => producto.colores))].sort();
    const talles = [...new Set(productos.flatMap((producto) => producto.talles))];
    /** Comunica al catálogo el nombre y el valor de un control. */
    const cambiar = (evento) => alCambiar(evento.target.name, evento.target.value);
    /** Evita recargar la página al presionar Enter dentro de un filtro. */
    const evitarEnvio = (evento) => evento.preventDefault();
    return (
        <aside className="filtros-catalogo">
            <h2>Filtrar productos</h2>
            <p id="ayuda-filtros">Los resultados se actualizan al elegir tus preferencias.</p>
            <form aria-describedby="ayuda-filtros" onSubmit={evitarEnvio} noValidate>
                <fieldset disabled={deshabilitado}>
                    <legend>Elegí tus preferencias</legend>
                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria" name="categoria" value={filtros.categoria} onChange={cambiar}>
                        {categorias.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="genero">Género musical</label>
                    <select id="genero" name="genero" value={filtros.genero} onChange={cambiar}>
                        {generos.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="artista">Artista o banda</label>
                    <input
                        id="artista"
                        name="artista"
                        type="search"
                        maxLength="80"
                        placeholder="Ejemplo: Nirvana"
                        value={filtros.artista}
                        onChange={cambiar}
                    />
                    <p className="ayuda-campo" id="ayuda-precios">
                        Sin separadores de miles. Para decimales, usá punto.
                    </p>
                    <label htmlFor="minimo">Precio mínimo en pesos</label>
                    <input
                        id="minimo"
                        name="minimo"
                        type="text"
                        inputMode="decimal"
                        maxLength="12"
                        placeholder="20000"
                        value={filtros.minimo}
                        onChange={cambiar}
                        aria-invalid={!!errores.minimo}
                        aria-describedby={errores.minimo ? "ayuda-precios error-minimo" : "ayuda-precios"}
                    />
                    {errores.minimo && (
                        <p className="error-campo" id="error-minimo" role="alert">
                            {errores.minimo}
                        </p>
                    )}
                    <label htmlFor="maximo">Precio máximo en pesos</label>
                    <input
                        id="maximo"
                        name="maximo"
                        type="text"
                        inputMode="decimal"
                        maxLength="12"
                        placeholder="70000"
                        value={filtros.maximo}
                        onChange={cambiar}
                        aria-invalid={!!errores.maximo}
                        aria-describedby={errores.maximo ? "ayuda-precios error-maximo" : "ayuda-precios"}
                    />
                    {errores.maximo && (
                        <p className="error-campo" id="error-maximo" role="alert">
                            {errores.maximo}
                        </p>
                    )}
                    <label htmlFor="disponibilidad">Disponibilidad</label>
                    <select
                        id="disponibilidad"
                        name="disponibilidad"
                        value={filtros.disponibilidad}
                        onChange={cambiar}
                    >
                        <option value="all">Todos</option>
                        <option value="available">Con stock</option>
                        <option value="sold-out">Agotados</option>
                    </select>
                    <label htmlFor="color">Color</label>
                    <select id="color" name="color" value={filtros.color} onChange={cambiar}>
                        <option value="all">Todos</option>
                        {colores.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="talle">Talle</label>
                    <select id="talle" name="talle" value={filtros.talle} onChange={cambiar}>
                        <option value="all">Todos</option>
                        {talles.map((talle) => (
                            <option key={talle} value={talle}>
                                {talle}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="orden">Ordenar por</label>
                    <select id="orden" name="orden" value={filtros.orden} onChange={cambiar}>
                        {ordenes.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>
                    <button className="boton boton-secundario" type="button" onClick={alLimpiar}>
                        Limpiar filtros
                    </button>
                </fieldset>
            </form>
        </aside>
    );
};

export default Filtros;
