import './registro.css'
const Registro = () => {
    return (
        <>
        <div className='cabecera'>
            <span className="paw-icon">🐾</span>
            <h2>Registro de mascota</h2>
        </div>
        <div className="registro">
            <form>
                <div className="mb-3">
                    <label htmlFor="fotoMascota" className="form-label">Foto de la mascota</label>
                    <input className="form-control" type="file" id="fotoMascota"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tipoMascota" className="form-label">Tipo de mascota</label>
                    <select className="form-select" id="tipoMascota" required="">
                    <option value="">Selecciona una opción</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="otro">Otro</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="razaMascota" className="form-label">Raza</label>
                    <input type="text" className="form-control" id="razaMascota" placeholder="Ej: Labrador o Mestizo"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="nombreMascota" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombreMascota" placeholder="Ej: Max"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="edadMascota" className="form-label">Edad aproximada</label>
                    <input type="number" className="form-control" id="edadMascota" placeholder="Ej: 2"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="saludMascota" className="form-label">Estado de salud</label>
                    <input type="text" className="form-control" id="saludMascota" placeholder="Ej: Vacunado, sano, necesita tratamiento..."/>
                </div>
                <div className="mb-3">
                    <label htmlFor="caracteristicasFisicas" className="form-label">Características físicas</label>
                    <textarea className="form-control" id="caracteristicasFisicas" rows="2" placeholder="Color, tamaño, pelaje, etc."></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="historial" className="form-label">Historial de comportamiento/vida</label>
                    <textarea className="form-control" id="historial" rows="3" placeholder="Ej: Amigable con niños, fue rescatado de la calle..."></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="requisitos" className="form-label">Requisitos para adopción</label>
                    <textarea className="form-control" id="requisitos" rows="2" placeholder="Ej: Hogar con jardín, sin otras mascotas, etc."></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="infoAdicional" className="form-label">Información adicional (opcional)</label>
                    <textarea className="form-control" id="infoAdicional" rows="2" placeholder="Comentarios adicionales..."></textarea>
                </div>
                <div className="d-grid">
                    <button type="submit" className="boton-registro">Registrar Mascota</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Registro;
