import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout.jsx";
import Inicio from "@/pages/Inicio.jsx";
import Nosotros from "@/pages/Nosotros.jsx";
import Catalogo from "@/pages/Catalogo.jsx";
import Producto from "@/pages/Producto.jsx";
import Carrito from "@/pages/Carrito.jsx";
import Cuenta from "@/pages/Cuenta.jsx";
import Contacto from "@/pages/Contacto.jsx";
import NoEncontrada from "@/pages/NoEncontrada.jsx";
import { obtenerProductos } from "@/api/productos.js";
import { leerSeleccion, guardarSeleccion, sumarProducto } from "@/utils/carrito.js";

/** Mantiene los productos y la selección de compra compartidos por las páginas de React. */
const App = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [intento, setIntento] = useState(0);
    const [seleccion, setSeleccion] = useState(leerSeleccion);
    const unidades = seleccion.carrito.reduce((total, item) => total + item.cantidad, 0);
    useEffect(() => {
        let activo = true;
        /** Consulta los productos y evita actualizar un componente desmontado. */
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
        /** Sincroniza las compras al volver a la ventana o desde otra pestaña. */
        const sincronizar = () => setSeleccion(leerSeleccion());
        window.addEventListener("storage", sincronizar);
        window.addEventListener("focus", sincronizar);
        window.addEventListener("pageshow", sincronizar);
        return () => {
            window.removeEventListener("storage", sincronizar);
            window.removeEventListener("focus", sincronizar);
            window.removeEventListener("pageshow", sincronizar);
        };
    }, []);
    /** Repite una consulta fallida de la API. */
    const reintentar = () => {
        setError("");
        setCargando(true);
        setIntento((valor) => valor + 1);
    };
    /** Actualiza React solo después de guardar la compra correctamente. */
    const cambiarSeleccion = (carrito, codigo) => {
        const nueva = { carrito, codigo: carrito.length > 0 ? codigo : "" };
        guardarSeleccion(nueva);
        setSeleccion(nueva);
    };
    /** Agrega la variante desde la ficha y conserva el código aplicado. */
    const agregar = (producto, talle, color, cantidad) => {
        cambiarSeleccion(
            sumarProducto(seleccion.carrito, producto, talle, color, cantidad),
            seleccion.codigo,
        );
    };
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
                                alAgregar={agregar}
                            />
                        }
                    />
                    <Route
                        path="carrito"
                        element={
                            <Carrito
                                productos={productos}
                                cargando={cargando}
                                error={error}
                                reintentar={reintentar}
                                seleccion={seleccion}
                                alGuardar={cambiarSeleccion}
                            />
                        }
                    />
                    <Route path="cuenta" element={<Cuenta />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="*" element={<NoEncontrada />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};
export default App;
