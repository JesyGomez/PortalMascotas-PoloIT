import { useEffect, useRef, useState } from "react";

export const StepTwoReset = ({email,code,setCode,handleVerifyCode,localError,handleRequestReset,clearErrorMessage,setMessage,setLocalError}) => {

    useEffect(() => {
      clearErrorMessage();
      setLocalError(null);
      setMessage(null);
    }, []);
    const [codeDigits, setCodeDigits] = useState(["", "", "", "","",""]);
const inputRefs = useRef([]);

const handleChange = (e, index) => {
  setLocalError(null)
  const { value } = e.target;
  if (!/^\d?$/.test(value)) return; // Solo números

  const newDigits = [...codeDigits];
  newDigits[index] = value;
  setCodeDigits(newDigits);

  // Auto-focus al siguiente
  if (value && index < 5) {
    inputRefs.current[index + 1].focus();
  }
};

useEffect(() => {
  setCode(codeDigits.join(""));
}, [codeDigits])


const handleKeyDown = (e, index) => {
  if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
    inputRefs.current[index - 1].focus();
  }
};


  return (
    <form className="form-container">
      <h6>
        Por favor, introduce el código de 4 dígitos que recibiste en: {email}
      </h6>

      <div className="code-inputs">
        {codeDigits.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            className="code-input"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      {localError && <p className="error-message">{localError}</p>}
      <div className="boton-wrapper">
        <button className="boton-registro" type="submit" onClick={handleVerifyCode}>
          Verificar
        </button>
      </div>

      <div>
        <button
          onClick={handleRequestReset}
          style={{ border: "none", background: "none", width: "fit-content" }}
          type="button"
        >
          Reenviar Código
        </button>
      </div>
    </form>

  )
}
