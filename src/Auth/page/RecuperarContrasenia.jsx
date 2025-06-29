import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import "../styles/auth.css";
<<<<<<< HEAD
=======
import { Button } from "react-bootstrap";
import { StepOneReset, StepThreeReset, StepTwoReset } from "../components";
>>>>>>> origin/main

export const RecuperarContrasenia = () => {
  const {
    status,
    errorMessage,
    startRequestReset,
<<<<<<< HEAD
=======
    verifyResetPassword,
>>>>>>> origin/main
    startResetPassword,
    clearErrorMessage,
  } = useAuthStore();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
<<<<<<< HEAD
  const [message, setMessage] = useState("");
=======
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState(null);
  const [showBackToLogin, setShowBackToLogin] = useState(false);
>>>>>>> origin/main

  useEffect(() => {
    clearErrorMessage();
    setMessage("");
  }, []);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setMessage("");
    const { ok, msg } = await startRequestReset(email);
    setMessage(msg);
    if (ok) setStep(2);
  };

  const handleVerifyCode=async(e)=>{
    e.preventDefault();
    setMessage("");
    const { ok, msg } = await verifyResetPassword({ email, code, newPassword });
  
    ok&&setMessage(msg);
    !ok&&setLocalError(msg);
    ok && setStep(3)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
<<<<<<< HEAD
    const { ok, msg } = await startResetPassword({ email, code, newPassword });
    setMessage(msg);
=======
    if(newPassword===confirmPassword){
      const { ok, msg } = await startResetPassword({ email, code, newPassword });
      setMessage(msg);
      ok && setShowBackToLogin(true);
    }else{
      setLocalError("Las contraseñas no coinciden");
    }
>>>>>>> origin/main
  };

  return (
    <div className="auth-wrapper">
      <div className="mt-4">
        <div className="form-box">
<<<<<<< HEAD
          <div className="cabecera_rp">
            <div className="candado-img">
              <img src="./candado.png" alt="candado" />
            </div>
            <h2>¿Olvidaste tu Contraseña?</h2>
=======
          <div className="cabecera_rp">     
            {
              step===1?
              (  
                <>
                  <img src="./candado.png" alt="candado" />
                  <h2>¿Olvidaste tu Contraseña?</h2>
                </>
              )
              :
              (
                <>
                  <img src="./buzon.png" alt="buzon" />
                  <h2>Verifica tu Correo</h2>
                </>
              )
            }
>>>>>>> origin/main
          </div>

     
            {step === 1 && (
<<<<<<< HEAD
              <form onSubmit={handleRequestReset} className="form-container">
                <h6>Ingresa tu Correo para que recibas un código de verificación</h6>

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
            )}

            {step === 2 && (
              <>
                <div className="text-center mb-4">
                  <span className="mailbox-icon">📬</span>
                  <h2>¡Código enviado!</h2>
                  <p>
                    Revisá tu correo <strong>{email}</strong> y hacé clic en "Verificar" para continuar.
                  </p>
                </div>
                <div className="boton-wrapper">
                  <button className="boton-registro" onClick={() => setStep(3)}>
                    Verificar
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword}>
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
              </form>
=======
              <StepOneReset handleRequestReset={handleRequestReset} status={status} email={email} setEmail={setEmail} message={message} errorMessage={errorMessage}    clearErrorMessage={clearErrorMessage} setMessage={setMessage} setLocalError={setLocalError} />
            )}

            {step === 2 && (
              <StepTwoReset email={email} code={code} setCode={setCode} handleVerifyCode={handleVerifyCode} localError={localError} handleRequestReset={handleRequestReset} clearErrorMessage={clearErrorMessage} setMessage={setMessage} setLocalError={setLocalError} />
            )}

            {step === 3 && (
              <StepThreeReset handleResetPassword={handleResetPassword} newPassword={newPassword} confirmPassword={confirmPassword} setNewPassword={setNewPassword} setConfirmPassword={setConfirmPassword} status={status} message={message} localError={localError} showBackToLogin={showBackToLogin} clearErrorMessage={clearErrorMessage} setMessage={setMessage} setLocalError={setLocalError} />
>>>>>>> origin/main
            )}
       
        </div>
      </div>

     <div className="auth-right">
        <img src="/logobg.png" alt="Logo Patitas" className="logo" />
        <img src="/people.png" alt="Personas con mascotas" className="people" />
      </div>
    </div>
  );
};
