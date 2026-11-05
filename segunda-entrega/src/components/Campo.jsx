/** Campo controlado que reutiliza etiquetas, ayudas y errores accesibles. */
const Campo = ({
    id,
    nombre = id,
    etiqueta,
    tipo = "text",
    valor,
    alCambiar,
    error = "",
    ayuda = "",
    maximo,
    completar,
    obligatorio = false,
    opciones = [],
}) => {
    const descripcion =
        [ayuda ? `${id}-ayuda` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
    const atributos = {
        id,
        name: nombre,
        value: valor,
        onChange: alCambiar,
        required: obligatorio,
        "aria-invalid": !!error,
        "aria-describedby": descripcion,
    };
    return (
        <div className="campo-formulario">
            <label htmlFor={id}>
                {etiqueta}
                {obligatorio ? " *" : ""}
            </label>
            {tipo === "select" ? (
                <select {...atributos}>
                    {opciones.map((opcion) => (
                        <option key={opcion.valor} value={opcion.valor}>
                            {opcion.texto}
                        </option>
                    ))}
                </select>
            ) : tipo === "textarea" ? (
                <textarea {...atributos} maxLength={maximo} rows="6" />
            ) : (
                <input {...atributos} type={tipo} maxLength={maximo} autoComplete={completar} />
            )}
            {ayuda && (
                <p className="ayuda-campo" id={`${id}-ayuda`}>
                    {ayuda}
                </p>
            )}
            {error && (
                <p className="error-campo" id={`${id}-error`} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};
export default Campo;
