import { useEffect } from "react";
import { enfocarTrasActualizar } from "@/utils/foco.js";

/** Abre un diálogo nativo con foco contenido, cierre por Escape y contenido reutilizable. */
const Dialogo = ({
    titulo,
    children,
    alCerrar,
    focoAlCerrar,
    confirmar,
    textoConfirmar = "Confirmar",
    textoCerrar = "Cancelar",
}) => {
    useEffect(() => {
        const cuadro = document.getElementById("dialogo-carrito");
        if (!cuadro.open) cuadro.showModal();
        return () => {
            if (cuadro.open) cuadro.close();
            enfocarTrasActualizar(focoAlCerrar);
        };
    }, [focoAlCerrar]);
    return (
        <dialog
            id="dialogo-carrito"
            className="dialogo-retrowave"
            aria-labelledby="titulo-dialogo"
            onCancel={alCerrar}
        >
            <h2 id="titulo-dialogo">{titulo}</h2>
            {children}
            <div className="acciones-formulario">
                <button className="boton boton-secundario" type="button" onClick={alCerrar} autoFocus>
                    {textoCerrar}
                </button>
                {confirmar && (
                    <button className="boton" type="button" onClick={confirmar}>
                        {textoConfirmar}
                    </button>
                )}
            </div>
        </dialog>
    );
};
export default Dialogo;
