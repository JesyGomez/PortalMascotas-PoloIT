import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import "../../estilos/sesion.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setMensaje("");

  if (!email || !password) {
    setError("Por favor, completa todos los campos.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token && data.nombre && data.rol) {
      localStorage.setItem("token", data.token);
      login(data.nombre, data.rol);
      setMensaje(`🐾 ¡Bienvenido/a, ${data.nombre}!`);

      setTimeout(() => {
        if (data.rol === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 2000);
    } else {
      setError(data.message || "Credenciales incorrectas. Intenta de nuevo.");
    }
  } catch (err) {
    setError("Error de conexión. Asegúrate que el servidor esté funcionando.");
    console.error("Error durante el login:", err);
  }
};


  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="text-center mb-4">
          <span className="paw-icon">🐾</span>
          <h2 className="d-inline">Iniciar Sesión</h2>
        </div>

        {/* Solo mostrar el formulario si NO hay mensaje */}
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
            {error && <p className="error-message">{error}</p>}
            <div className="d-grid">
              <button type="submit" className="btn-primary">
                Ingresar
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
  );
};

export default Login;
