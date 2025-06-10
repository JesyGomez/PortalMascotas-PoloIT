import React, { useState } from 'react';
import '../estilos/registro-mascotas.css';

const RegistroMascota = () => {
  // Estados para cada campo del formulario de mascota
  const [fotoMascota, setFotoMascota] = useState(null); // Para el archivo de imagen
  const [tipoMascota, setTipoMascota] = useState('');
  const [razaMascota, setRazaMascota] = useState('');
  const [nombreMascota, setNombreMascota] = useState('');
  const [edadMascota, setEdadMascota] = useState('');
  const [saludMascota, setSaludMascota] = useState('');
  const [caracteristicasFisicas, setCaracteristicasFisicas] = useState('');
  const [historial, setHistorial] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [infoAdicional, setInfoAdicional] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Preparar los datos para enviar al backend
    // Si manejas imágenes, deberías usar FormData
    const formData = new FormData();
    formData.append('fotoMascota', fotoMascota); // Agrega la foto
    formData.append('tipoMascota', tipoMascota);
    formData.append('razaMascota', razaMascota);
    formData.append('nombreMascota', nombreMascota);
    formData.append('edadMascota', edadMascota);
    formData.append('saludMascota', saludMascota);
    formData.append('caracteristicasFisicas', caracteristicasFisicas);
    formData.append('historial', historial);
    formData.append('requisitos', requisitos);
    formData.append('infoAdicional', infoAdicional);

    try {
      // Endpoint para registro de MASCOTA (necesitarás crear este en Flask)
      const response = await fetch('http://localhost:5000/api/auth/register_pet', {
        method: 'POST',
        // No Content-Type cuando usas FormData, el navegador lo configura automáticamente
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Mascota registrada con éxito.');
        // Opcional: limpiar el formulario o redirigir
        // Resetear todos los estados a sus valores iniciales aquí
      } else {
        setError(data.message || 'Error al registrar la mascota.');
      }
    } catch (err) {
      setError('Error de conexión al registrar la mascota.');
      console.error('Error durante el registro de mascota:', err);
    }
  };

  return (
    <div className="form-wrapper"> 
      <div className="form-container">
        <div className="text-center mb-4">
          <span className="paw-icon">🐾</span>
          <h2 className="d-inline">Registro de Mascota</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fotoMascota" className="form-label">Foto de la mascota</label>
            <input
              className="form-control"
              type="file"
              id="fotoMascota"
              onChange={(e) => setFotoMascota(e.target.files[0])} // Captura el archivo
              required // Puede ser opcional dependiendo de tu lógica
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tipoMascota" className="form-label">Tipo de mascota</label>
            <select
              className="form-select"
              id="tipoMascota"
              value={tipoMascota}
              onChange={(e) => setTipoMascota(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="razaMascota" className="form-label">Raza</label>
            <input
              type="text"
              className="form-control"
              id="razaMascota"
              placeholder="Ej: Labrador o Mestizo"
              value={razaMascota}
              onChange={(e) => setRazaMascota(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nombreMascota" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombreMascota"
              placeholder="Ej: Max"
              value={nombreMascota}
              onChange={(e) => setNombreMascota(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edadMascota" className="form-label">Edad aproximada</label>
            <input
              type="number"
              className="form-control"
              id="edadMascota"
              placeholder="Ej: 2"
              value={edadMascota}
              onChange={(e) => setEdadMascota(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="saludMascota" className="form-label">Estado de salud</label>
            <input
              type="text"
              className="form-control"
              id="saludMascota"
              placeholder="Ej: Vacunado, sano, necesita tratamiento..."
              value={saludMascota}
              onChange={(e) => setSaludMascota(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="caracteristicasFisicas" className="form-label">Características físicas</label>
            <textarea
              className="form-control"
              id="caracteristicasFisicas"
              rows="2"
              placeholder="Color, tamaño, pelaje, etc."
              value={caracteristicasFisicas}
              onChange={(e) => setCaracteristicasFisicas(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="historial" className="form-label">Historial de comportamiento/vida</label>
            <textarea
              className="form-control"
              id="historial"
              rows="3"
              placeholder="Ej: Amigable con niños, fue rescatado de la calle..."
              value={historial}
              onChange={(e) => setHistorial(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="requisitos" className="form-label">Requisitos para adopción</label>
            <textarea
              className="form-control"
              id="requisitos"
              rows="2"
              placeholder="Ej: Hogar con jardín, sin otras mascotas, etc."
              value={requisitos}
              onChange={(e) => setRequisitos(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="infoAdicional" className="form-label">Información adicional (opcional)</label>
            <textarea
              className="form-control"
              id="infoAdicional"
              rows="2"
              placeholder="Comentarios adicionales..."
              value={infoAdicional}
              onChange={(e) => setInfoAdicional(e.target.value)}
            ></textarea>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="d-grid">
            <button type="submit" className="btn-primary">Registrar Mascota</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroMascota;