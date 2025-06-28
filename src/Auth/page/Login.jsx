import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import '../styles/auth.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [recordarme, setRecordarme] = useState(false);

  const navigate = useNavigate();
  const { startLogin, status, user, errorMessage } = useAuthStore();

  const isAuthenticating = status === 'checking';

  useEffect(() => {
    const emailGuardado = localStorage.getItem('emailGuardado');
    if (emailGuardado) {
      setEmail(emailGuardado);
      setRecordarme(true);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      setMensaje(`🐾 ¡Bienvenido/a, ${user.name}!`);
      setTimeout(() => {
        if (user.uid === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 2000);
    }
  }, [status, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('');
    if (recordarme) {
      localStorage.setItem('emailGuardado', email);
    } else {
      localStorage.removeItem('emailGuardado');
    }
    startLogin({ email, password });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="form-box">
          <div className="cabecera">
            <img src="/patitarosa.png" alt="Icono patita" className="icono-patita" />
            <h2>Iniciar Sesión</h2>
          </div>

          <div className="registro">
            {!mensaje ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@dominio.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <div className="password-wrapper">
                    <input
                      type={mostrarPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Introduzca tu contraseña"
                    />
                    <img
                      src="/ojo.png"
                      alt="Mostrar contraseña"
                      className="eye-icon"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                    />
                  </div>
                </div>

                <div className="mb-3 checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="recordarme"
                    checked={recordarme}
                    onChange={() => setRecordarme(!recordarme)}
                  />
                  <label htmlFor="recordarme">Recordarme</label>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="boton-wrapper">
                  <button
                    type="submit"
                    className="boton-registro"
                    disabled={isAuthenticating}
                  >
                    {isAuthenticating ? 'Ingresando...' : 'INGRESAR'}
                  </button>
                </div>

                <div className="text-center">
                  <p>¿Olvidaste tu contraseña? <Link to="/recuperar">Recuperala acá</Link></p>
                  <p>¿No tenés cuenta? <Link to="/registro">Registrate acá</Link></p>
                </div>
              </form>
            ) : (
              <p className="success-message">{mensaje}</p>
            )}
          
            </div>
        </div>
      </div>

      <div className="auth-right">
        <img src="/logobg.png" alt="Logo Patitas" className="logo" />
        <img src="/people.png" alt="Personas con mascotas" className="people" />
      </div>
    </div>
  );
};
