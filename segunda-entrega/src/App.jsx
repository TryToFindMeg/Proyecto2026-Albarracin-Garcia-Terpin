import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout.jsx";
import Inicio from "@/pages/Inicio.jsx";
import Nosotros from "@/pages/Nosotros.jsx";
import Catalogo from "@/pages/Catalogo.jsx";
import Producto from "@/pages/Producto.jsx";
import NoEncontrada from "@/pages/NoEncontrada.jsx";
import { obtenerProductos } from "@/api/productos.js";
import { leerUnidadesCarrito } from "@/utils/carrito.js";

/**
 * Carga los productos y comparte los datos entre las páginas de la tienda.
 * @returns {import("react").ReactElement} Aplicación y rutas de RetroWave.
 */
const App = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [intento, setIntento] = useState(0);
    const [unidades, setUnidades] = useState(leerUnidadesCarrito);

    useEffect(() => {
        let activo = true;
        /** Carga el servicio y evita actualizar una página que ya se cerró. */
        const cargar = async () => {
            try {
                const lista = await obtenerProductos();
                if (activo) {
                    setProductos(lista);
                    setCargando(false);
                }
            } catch {
                if (activo) {
                    setError(
                        "En este momento no pudimos cargar los productos. Intentá de nuevo en unos momentos.",
                    );
                    setCargando(false);
                }
            }
        };
        cargar();
        return () => {
            activo = false;
        };
    }, [intento]);

    useEffect(() => {
        /** Sincroniza el contador al volver del carrito o desde otra pestaña. */
        const sincronizar = () => setUnidades(leerUnidadesCarrito());
        window.addEventListener("storage", sincronizar);
        window.addEventListener("focus", sincronizar);
        window.addEventListener("pageshow", sincronizar);
        return () => {
            window.removeEventListener("storage", sincronizar);
            window.removeEventListener("focus", sincronizar);
            window.removeEventListener("pageshow", sincronizar);
        };
    }, []);

    /** Repite la consulta después de un error del servicio. */
    const reintentar = () => {
        setError("");
        setCargando(true);
        setIntento((valor) => valor + 1);
    };
    /** Refleja en la cabecera una compra realizada desde la ficha de React. */
    const actualizarContador = () => setUnidades(leerUnidadesCarrito());

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout productos={productos} unidades={unidades} />}>
                    <Route
                        index
                        element={
                            <Inicio
                                productos={productos}
                                cargando={cargando}
                                error={error}
                                reintentar={reintentar}
                            />
                        }
                    />
                    <Route path="nosotros" element={<Nosotros />} />
                    <Route
                        path="productos"
                        element={
                            <Catalogo
                                productos={productos}
                                cargando={cargando}
                                error={error}
                                reintentar={reintentar}
                            />
                        }
                    />
                    <Route
                        path="producto/:id"
                        element={
                            <Producto
                                productos={productos}
                                cargando={cargando}
                                error={error}
                                reintentar={reintentar}
                                alAgregar={actualizarContador}
                            />
                        }
                    />
                    <Route path="*" element={<NoEncontrada />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;
