import { useEffect } from "react";
import { Link } from "react-router-dom"

export const StepThreeReset = ({handleResetPassword,newPassword,confirmPassword,setNewPassword,setConfirmPassword,status,message,localError,showBackToLogin,clearErrorMessage,setMessage,setLocalError}) => {
    useEffect(() => {
      clearErrorMessage();
      setLocalError(null);
      setMessage(null);
    }, []);
    useEffect(() => {
      setLocalError(null);
    }, [newPassword,confirmPassword])
    
  return (
    <form className="form-container" onSubmit={handleResetPassword}>
      <h6>Ingresa tu Correo para que recibas un código de verificación</h6>

      <div className="text-start">
        <label htmlFor="new-password" className="form-label">Nueva contraseña</label>
        <input
          id="new-password"
          type="password"
          placeholder="Nueva contraseña"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="text-start">
        <label htmlFor="confirm-password" className="form-label">Confirmar contraseña</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Confirmar contraseña"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {localError && <p className="error-message">{localError}</p>}
      <div className="boton-wrapper">
        <button type="submit" className="boton-registro" disabled={status === "checking"}>
          {status === "checking" ? "Cambiando..." : "Cambiar contraseña"}
        </button>
      </div>

      {message && (
        <p
          className={
            message.toLowerCase().includes("error")
              ? "error-message"
              : "mensaje-bienvenida"
          }
        >
          {message}
        </p>
      )}
      {
        showBackToLogin===true&&(
          <div className="text-center">
            <Link to="/login" className="btn-secondary">
              <svg className="arrow-icon" viewBox="0 0 24 24">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Volver al login
            </Link>
          </div>
        )
      }
    </form>
  )
}
