import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout.jsx";
import Inicio from "@/pages/Inicio.jsx";
import Nosotros from "@/pages/Nosotros.jsx";
import NoEncontrada from "@/pages/NoEncontrada.jsx";

/**
 * Define las páginas de React dentro de la estructura compartida.
 * @returns {import("react").ReactElement} Rutas de RetroWave.
 */
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Inicio />} />
                    <Route path="nosotros" element={<Nosotros />} />
                    <Route path="*" element={<NoEncontrada />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;
