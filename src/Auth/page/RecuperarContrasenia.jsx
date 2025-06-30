import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import "../styles/auth.css";
import { Button } from "react-bootstrap";
import { StepOneReset, StepThreeReset, StepTwoReset } from "../components";

export const RecuperarContrasenia = () => {
  const {
    status,
    errorMessage,
    startRequestReset,
    verifyResetPassword,
    startResetPassword,
    clearErrorMessage,
  } = useAuthStore();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState(null);
  const [showBackToLogin, setShowBackToLogin] = useState(false);

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
    if(newPassword===confirmPassword){
      const { ok, msg } = await startResetPassword({ email, code, newPassword });
      setMessage(msg);
      ok && setShowBackToLogin(true);
    }else{
      setLocalError("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="mt-4">
        <div className="form-box">
          <div className="cabecera_rp">     
            {
              step===1?
              (  
                <>
                  <img src="./candado.png" alt="candado" />
                  <h2>¿Olvidaste tu contraseña?</h2>
                </>
              )
              :
              (
                <>
                  <img src="./buzon.png" alt="buzon" />
                  <h2>Verificá tu correo</h2>
                </>
              )
            }
          </div>

            {step === 1 && (
              <StepOneReset handleRequestReset={handleRequestReset} status={status} email={email} setEmail={setEmail} message={message} errorMessage={errorMessage}    clearErrorMessage={clearErrorMessage} setMessage={setMessage} setLocalError={setLocalError} />
            )}

            {step === 2 && (
              <StepTwoReset email={email} code={code} setCode={setCode} handleVerifyCode={handleVerifyCode} localError={localError} handleRequestReset={handleRequestReset} clearErrorMessage={clearErrorMessage} setMessage={setMessage} setLocalError={setLocalError} />
            )}

            {step === 3 && (
              <StepThreeReset handleResetPassword={handleResetPassword} newPassword={newPassword} confirmPassword={confirmPassword} setNewPassword={setNewPassword} setConfirmPassword={setConfirmPassword} status={status} message={message} localError={localError} showBackToLogin={showBackToLogin} clearErrorMessage={clearErrorMessage} setMessage={setMessage} setLocalError={setLocalError} />
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
