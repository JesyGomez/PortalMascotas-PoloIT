import { useEffect } from "react";
import { Link } from "react-router-dom"

export const StepOneReset = ({handleRequestReset,status,email,setEmail,message,errorMessage,clearErrorMessage,setMessage,setLocalError}) => {

    useEffect(() => {
      clearErrorMessage();
      setMessage(null);
      setLocalError(null);
    }, []);
  return (
    <form onSubmit={handleRequestReset} className="form-container">
      <h6>Ingresa tu Correo para que recibas un código de verificación</h6>

      <div className="text-start">
        <label htmlFor="email" className="form-label">Correo</label>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="ejemplo@dominio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {message && <p className="mensaje">{message}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="boton-wrapper">
        <button type="submit" className="boton-registro" disabled={status === "checking"}>
          {status === "checking" ? "Enviando..." : "Enviar código"}
        </button>
      </div>

      <div className="text-center">
        <Link to="/login" className="btn-secondary">
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Volver al login
        </Link>
      </div>
    </form>
  )
}
