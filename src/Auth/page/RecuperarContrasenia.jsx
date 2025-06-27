import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import "../styles/recuperarContrasenia.css";

export const RecuperarContrasenia = () => {
  const {
    status,
    errorMessage,
    startRequestReset,
    startResetPassword,
    clearErrorMessage,
  } = useAuthStore();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    clearErrorMessage();
    setMessage("");
  }, [clearErrorMessage]);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setMessage("");
    const { ok, msg } = await startRequestReset(email);
    setMessage(msg);
    if (ok) setStep(2);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    const { ok, msg } = await startResetPassword({ email, code, newPassword });
    setMessage(msg);
  };

  return (
    <div className="form-wrapper">
      {step === 1 && (
        <form className="form-container" onSubmit={handleRequestReset}>
          <div className="text-center mb-4">
            <span className="paw-icon">🔒</span>
            <h2>¿Olvidaste tu contraseña?</h2>
            <p>Ingresá tu correo para recibir un código de verificación</p>
          </div>

          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && <p className="mensaje">{message}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="btn-primary" disabled={status === "checking"}>
            {status === "checking" ? "Enviando..." : "Enviar código"}
          </button>

          <Link to="/login" className="btn-secondary">
            <svg className="arrow-icon" viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver al login
          </Link>
        </form>
      )}

      {step === 2 && (
        <div className="form-container">
          <div className="text-center mb-4">
            <span className="mailbox-icon">📬</span>
            <h2>¡Código enviado!</h2>
            <p>
              Revisá tu correo <strong>{email}</strong> y hacé clic en "Verificar" para ingresar el código.
            </p>
          </div>
          <button className="btn-primary" onClick={() => setStep(3)}>
            Verificar
          </button>
        </div>
      )}

      {step === 3 && (
        <form className="form-container" onSubmit={handleResetPassword}>
          <div className="text-center mb-4">
            <span className="paw-icon">🔑</span>
            <h2>Crear nueva contraseña</h2>
          </div>

          <p>
            Correo: <strong>{email}</strong>
          </p>

          <label htmlFor="code" className="form-label">Código</label>
          <input
            id="code"
            type="text"
            placeholder="Código recibido"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

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

          <button type="submit" className="btn-primary" disabled={status === "checking"}>
            {status === "checking" ? "Cambiando..." : "Cambiar contraseña"}
          </button>

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
        </form>
      )}
    </div>
  );
};
