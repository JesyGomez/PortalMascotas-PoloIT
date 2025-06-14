import React, { useState, useEffect } from 'react';
import '../../estilos/dashboard.css';

const SolicitudesCrud = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/solicitudes');
      const data = await response.json();
      setSolicitudes(data);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await fetch(`http://localhost:5000/api/solicitudes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const eliminarSolicitud = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/solicitudes/${id}`, {
        method: 'DELETE',
      });
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al eliminar solicitud:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Solicitudes de Adopción 📝</h2>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((sol) => (
            <tr key={sol.id}>
              <td>{sol.nombre}</td>
              <td>{sol.email}</td>
              <td>{sol.motivo}</td>
              <td>
                <select
                  value={sol.estado}
                  onChange={(e) => actualizarEstado(sol.id, e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_revision">En Revisión</option>
                  <option value="aprobada">Aprobada</option>
                  <option value="rechazada">Rechazada</option>
                </select>
              </td>
              <td>
                <button onClick={() => eliminarSolicitud(sol.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolicitudesCrud;
