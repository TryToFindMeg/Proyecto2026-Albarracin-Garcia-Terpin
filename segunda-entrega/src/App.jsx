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
import { obtenerContenido } from "@/api/contenido.js";
import { obtenerProductos } from "@/api/productos.js";
import { obtenerCarrito, guardarCarrito, carritoDisponible } from "@/api/carrito.js";
import { leerCodigo, guardarCodigo, sumarProducto } from "@/utils/carrito.js";

/** Comparte el catálogo y el carrito que se consulta y modifica a través de la API. */
const App = () => {
    const [contenido, setContenido] = useState(null);
    const [errorContenido, setErrorContenido] = useState("");
    const [intentoContenido, setIntentoContenido] = useState(0);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [intento, setIntento] = useState(0);
    const [seleccion, setSeleccion] = useState({ carrito: [], codigo: "" });
    const [cargandoCarrito, setCargandoCarrito] = useState(true);
    const [errorCarrito, setErrorCarrito] = useState("");
    const [intentoCarrito, setIntentoCarrito] = useState(0);
    const [guardando, setGuardando] = useState(false);
    const unidades = seleccion.carrito.reduce((total, item) => total + item.cantidad, 0);
    useEffect(() => {
        let activo = true;
        /**
         * Consulta el contenido de la interfaz y evita actualizar una vista desmontada.
         * @returns {Promise<void>} Finaliza después de consultar el contenido del sitio.
         */
        const cargar = async () => {
            try {
                const datos = await obtenerContenido();
                if (activo) setContenido(datos);
            } catch {
                if (activo)
                    setErrorContenido(
                        "No pudimos cargar el contenido del sitio. Revisá que la API esté encendida y volvé a intentar.",
                    );
            }
        };
        cargar();
        return () => {
            activo = false;
        };
    }, [intentoContenido]);
    /**
     * Limpia el error y repite la consulta del contenido de la interfaz.
     * @returns {void} Actualiza el estado que activa una nueva consulta.
     */
    const reintentarContenido = () => {
        setErrorContenido("");
        setIntentoContenido((valor) => valor + 1);
    };
    useEffect(() => {
        let activo = true;
        /** Consulta el catálogo y evita actualizar una vista desmontada. */
        const cargar = async () => {
            try {
                const lista = await obtenerProductos();
                if (activo) setProductos(lista);
            } catch {
                if (activo)
                    setError(
                        "En este momento no pudimos cargar los productos. Intentá de nuevo en unos momentos.",
                    );
            } finally {
                if (activo) setCargando(false);
            }
        };
        cargar();
        return () => {
            activo = false;
        };
    }, [intento]);
    useEffect(() => {
        let activo = true;
        /** Recupera las compras del servicio; un fallo no se presenta como carrito vacío. */
        const cargar = async () => {
            try {
                const carrito = await obtenerCarrito();
                if (activo) setSeleccion({ carrito, codigo: carrito.length ? leerCodigo() : "" });
            } catch (problema) {
                if (activo) setErrorCarrito(problema.message);
            } finally {
                if (activo) setCargandoCarrito(false);
            }
        };
        cargar();
        return () => {
            activo = false;
        };
    }, [intentoCarrito]);
    /** Repite una consulta fallida del catálogo. */
    const reintentar = () => {
        setError("");
        setCargando(true);
        setIntento((valor) => valor + 1);
    };
    /** Recarga el carrito guardado, por ejemplo después de volver a iniciar json-server. */
    const reintentarCarrito = () => {
        if (guardando) return;
        setErrorCarrito("");
        setCargandoCarrito(true);
        setIntentoCarrito((valor) => valor + 1);
    };
    /** Espera las escrituras y vuelve a leer la API antes de anunciar que se guardaron. */
    const cambiarSeleccion = async (carrito, codigo) => {
        if (guardando || cargandoCarrito || errorCarrito)
            throw new Error("Esperá a que el carrito termine de cargarse o volvé a consultarlo.");
        setGuardando(true);
        try {
            await guardarCarrito(seleccion.carrito, carrito);
            const guardado = await obtenerCarrito();
            const codigoGuardado = guardado.length ? codigo : "";
            guardarCodigo(codigoGuardado);
            setSeleccion({ carrito: guardado, codigo: codigoGuardado });
        } catch (problema) {
            // json-server no tiene transacciones: una operación múltiple puede quedar parcial.
            // Se recupera el estado real y nunca se anuncia éxito si una petición falla.
            try {
                const actual = await obtenerCarrito();
                setSeleccion({ carrito: actual, codigo: actual.length ? leerCodigo() : "" });
            } catch {
                setErrorCarrito(
                    "No pudimos confirmar el estado del carrito. Volvé a consultarlo cuando el servicio esté disponible.",
                );
            }
            throw new Error(`No se pudo completar el cambio. ${problema.message}`, { cause: problema });
        } finally {
            setGuardando(false);
        }
    };
    /** Acumula una variante válida y comunica su guardado por POST o PATCH. */
    const agregar = async (producto, talle, color, cantidad) => {
        await cambiarSeleccion(
            sumarProducto(seleccion.carrito, producto, talle, color, cantidad),
            seleccion.codigo,
        );
    };
    const estadoCarrito = {
        cargando: cargandoCarrito,
        guardando,
        error: errorCarrito,
        reintentar: carritoDisponible ? reintentarCarrito : null,
    };
    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout
                            productos={productos}
                            unidades={unidades}
                            contenido={contenido}
                            errorContenido={errorContenido}
                            reintentarContenido={reintentarContenido}
                        />
                    }
                >
                    <Route
                        index
                        element={
                            <Inicio
                                contenido={contenido}
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
                                opciones={contenido?.catalogo}
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
                                generos={contenido?.catalogo.generos}
                                productos={productos}
                                cargando={cargando}
                                error={error}
                                reintentar={reintentar}
                                alAgregar={agregar}
                                estadoCarrito={estadoCarrito}
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
                                estadoCarrito={estadoCarrito}
                            />
                        }
                    />
                    <Route
                        path="cuenta"
                        element={<Cuenta formulariosCuenta={contenido?.cuenta.formulariosCuenta} />}
                    />
                    <Route path="contacto" element={<Contacto contenido={contenido?.contacto} />} />
                    <Route path="*" element={<NoEncontrada />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};
export default App;
