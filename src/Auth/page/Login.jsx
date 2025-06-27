import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/sesion.css";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const {
    startLogin,
    status,
    user,
    errorMessage,
  } = useAuthStore();

  const isAuthenticating = status === "checking";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    startLogin({ email, password });
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img
          src="/logoPatitasEnCasa.png"
          alt="Logo"
          className="login-img"
          style={{ maxWidth: "150px", height: "auto" }}
        />
        <img
          src="/personitasyAnimalitos.png"
          alt="Personas y animales"
          className="login-img"
        />
      </div>
      <div className="form-wrapper">
        <div className="form-container">
          <div className="text-center mb-4">
            <span className="paw-icon">🐾</span>
            <h2 className="d-inline">Iniciar Sesión</h2>
          </div>

          {!mensaje ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? "Ingresando..." : "Ingresar"}
                </button>
              </div>
              <div className="text-center">
                <p>
                  ¿Olvidaste tu contraseña?{" "}
                  <Link to="/recuperar">Recuperala acá</Link>
                </p>
                <p>
                  ¿No tenés cuenta? <Link to="/registro">Registrate acá</Link>
                </p>
              </div>
            </form>
          ) : (
            <p className="mensaje-bienvenida">{mensaje}</p>
          )}
        </div>
      </div>
    </div>
  );
};
