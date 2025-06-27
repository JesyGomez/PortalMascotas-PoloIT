import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import '../styles/registro.css';

export const Registro = () => {
  const navigate = useNavigate();
  const { startRegister, errorMessage, status } = useAuthStore();

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    confirmPassword: '',
    hogarTransito: false,
  });

  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  useEffect(() => {
    if (status === 'not-authenticated' && errorMessage === 'Registrado correctamente. Iniciá sesión.') {
      setSuccessMessage(errorMessage);
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [errorMessage, status, navigate]);

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
    setSuccessMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Las contraseñas no coinciden.');
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    startRegister(dataToSend);
  };

  return (
    <div className="registro-wrapper">
      {/* Formulario a la izquierda */}
      <div className="form-left">
  <div className="form-box">
    <div className="cabecera">
      <img src="patitarosa.png" alt="Icono patita" className="icono-patita" />
      <h2>Crear Cuenta</h2>
    </div>

    <div className="registro">
      <form onSubmit={handleSubmit}>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombreCompleto" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="nombreCompleto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                placeholder="Por favor, introduzca su nombre y apellidos"
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
                placeholder="ejemplo@dominio.com"
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="password-wrapper">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Por favor, introduzca su contraseña"
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

            <div className="mb-3 position-relative">
              <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
              <div className="password-wrapper">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Por favor, confirme su contraseña"
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
              <label htmlFor="hogarTransito">¿Quieres ser hogar de tránsito?</label>
            </div>

            {localError && <p className="error-message">{localError}</p>}
            {errorMessage && errorMessage !== 'Registrado correctamente. Iniciá sesión.' && (
              <p className="error-message">{errorMessage}</p>
            )}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="boton-wrapper">
              <button type="submit" className="boton-registro" disabled={status === 'checking'}>
                {status === 'checking' ? 'Registrando...' : 'REGISTRARME'}
              </button>
            </div>

            <div className="text-center">
              <p>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
          </form>
      </form>
    </div>
  </div>
</div>

      
    

      {/* Imagen a la derecha */}
      <div className="image-right">
        <img src="/logobg.png" alt="Logo Patitas" className="logo" />
        <img src="/people.png" alt="Personas con mascotas" className="people" />
      </div>
    </div>
  );
};