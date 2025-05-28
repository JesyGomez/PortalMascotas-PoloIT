import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../estilos/sesion.css';

const Login = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login exitoso', data);
        setNombreUsuario(data.nombre); // guardar el nombre del usuario

        // Esperar unos segundos antes de redirigir
        setTimeout(() => {
          navigate('/'); // redirige a la página principal
        }, 2000); // 2 segundos para mostrar el saludo
      } else {
        setError(data.message || 'Credenciales incorrectas. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Asegúrate que el servidor esté funcionando.');
      console.error('Error durante el login:', err);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="text-center mb-4">
          <span className="paw-icon">🐾</span>
          <h2 className="d-inline">Iniciar Sesión</h2>
        </div>

        {nombreUsuario ? (
          <h4 className="text-success text-center">¡Bienvenido, {nombreUsuario}!</h4>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@dominio.com"
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Por favor, introduzca su contraseña"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="d-grid">
              <button type="submit" className="btn-primary">Ingresar</button>
            </div>
            <div className="text-center">
              <p>¿No tenés cuenta? <Link style={{ color: '#6d2e35' }} to="/registro">Registrate acá</Link></p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
