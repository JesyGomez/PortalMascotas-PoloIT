import './sesion.css'
const Sesion = () => {
    return (
        <>
          <div className="cabecera">
            <div className="text-center mb-4">
              <span className="paw-icon">🐾</span>
              <h2 className="d-inline">Crear Cuenta</h2>
            </div>
          </div>
          <div className='registro'>
            <form>
              <div className="mb-3">
                <label htmlFor="nombreCompleto" className="form-label">Nombre Completo</label>
                <input type="text" className="form-control" id="nombreCompleto"
                  placeholder="Por favor, introduzca su nombre y apellidos"/>
              </div>
        
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input type="email" className="form-control" id="correo" placeholder="ejemplo@dominio.com"/>
              </div>
        

              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Por favor, introduzca su contraseña"/>
              </div>
        

              <div className="mb-3 position-relative">
                <label htmlFor="confirmarPassword" className="form-label">Confirmar contraseña</label>
                <input type="password" className="form-control" id="confirPassword" placeholder="Por favor, confirme su contraseña"/>
              </div>
        
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="hogarTransito"/>
                <label className="form-check-label" for="hogarTransito">¿Quieres ser hogar de tránsito?</label>
              </div>
        
              <div className="d-grid mb-3">
                <button type="submit" className="boton-registro">Registrarme</button>
              </div>
        
              <p className="text-center">¿Ya tienes cuenta? <a href="#" className="text-link">Inicia Sesión</a></p>
            </form>
          </div>
        </>
      );
}

export default Sesion;