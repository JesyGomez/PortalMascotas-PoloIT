// src/auth/pages/Registro.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import '../styles/registro.css';

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
    <div className="login-wrapper">
      <div className="login-left">
        <img src="/logoPatitasEnCasa.png" alt="Logo" className="login-img" style={{ maxWidth: '150px', height: 'auto' }} />
        <img src="/personitasyAnimalitos.png" alt="Personas y animales" className="login-img" />
      </div>

      <div className="form-wrapper">
        <div className="form-container">
          <div className="text-center mb-4">
            <span className="paw-icon">🐾</span>
            <h2 className="d-inline">Crear Cuenta</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="hogarTransito" name="hogarTransito" checked={formData.hogarTransito} onChange={handleChange} />
              <label className="form-check-label" htmlFor="hogarTransito">Quiero ser hogar de tránsito</label>
            </div>

            {localError && <p className="error-message">{localError}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="d-grid mb-3">
              <button type="submit" className="btn-primary" disabled={status === 'checking'}>
                {status === 'checking' ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
            <div className="text-center">
              <p>¿Ya tenés cuenta? <Link to="/login" style={{ color: '#6d2e35' }}>Inicia sesión acá</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
