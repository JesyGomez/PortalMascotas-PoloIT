import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import '../styles/auth.css';

export const Registro = () => {
  const navigate = useNavigate();
  const {
    startRegister,
    errorMessage,
    successMessage,
    status,
    clearErrorMessage,
    clearSuccessMessage,
  } = useAuthStore();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    hogarTransito: false,
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    clearErrorMessage();
    clearSuccessMessage();
    setLocalError(null);
  }, [clearErrorMessage, clearSuccessMessage]);

  useEffect(() => {
    if (status === 'not-authenticated' && successMessage) {
      const timeout = setTimeout(() => {
        clearSuccessMessage();
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, status, navigate, clearSuccessMessage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);
    clearErrorMessage();

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Las contraseñas no coinciden.');
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    startRegister(dataToSend);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="form-box">
          <div className="cabecera">
            <img src="/patitarosa.png" alt="Icono patita" className="icono-patita" />
            <h2>Crear Cuenta</h2>
          </div>

          <div className="registro">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña segura"
                    required
                  />
                  <img
                    src="/ojo.png"
                    alt="Mostrar contraseña"
                    className="eye-icon"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                <div className="password-wrapper">
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite la contraseña"
                    required
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
                  id="hogarTransito"
                  name="hogarTransito"
                  checked={formData.hogarTransito}
                  onChange={handleChange}
                />
                <label htmlFor="hogarTransito">¿Querés ser hogar de tránsito?</label>
              </div>

              {localError && <p className="error-message">{localError}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}

              <div className="boton-wrapper">
                <button type="submit" className="boton-registro" disabled={status === 'checking'}>
                  {status === 'checking' ? 'Registrando...' : 'REGISTRARME'}
                </button>
              </div>

              <div className="text-center">
                <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
              </div>
            </form>
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
