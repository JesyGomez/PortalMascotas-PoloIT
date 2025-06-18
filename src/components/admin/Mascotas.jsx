import React, { useState, useEffect } from 'react';
import '../../estilos/dashboard.css';

const MascotasCrud = () => {
  const [mascotas, setMascotas] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    especie: '',
    edad: '',
    info_adicional: '',
    estado: 'Disponible',
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('http://localhost:5000/api/mascotas/', {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      const data = await response.json();
      setMascotas(data);
    } catch (err) {
      console.error('Error al cargar mascotas:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editandoId
      ? `http://localhost:5000/api/mascotas/${editandoId}`
      : 'http://localhost:5000/api/mascotas';

    const method = editandoId ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      setForm({
        nombre: '',
        especie: '',
        edad: '',
        info_adicional: '',
        estado: 'Disponible',
      });
      setEditandoId(null);
      fetchMascotas();
    } catch (err) {
      console.error('Error al guardar mascota:', err);
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleEdit = (mascota) => {
  setForm({
    nombre: mascota.nombre,
    especie: mascota.especie,
    edad: mascota.edad,
    info_adicional: mascota.info_adicional,
    estado: mascota.estado,
  });
  setEditandoId(mascota.id);
};


const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  try {
    await fetch(`http://localhost:5000/api/mascotas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    fetchMascotas();
  } catch (err) {
    console.error('Error al eliminar mascota:', err);
  }
};


  return (
    <div className="container">
      <h2 className="mt-4">Gestión de Mascotas 🐾</h2>

      {/* Formulario */}
      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input
            name="nombre"
            className="form-control"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            name="especie"
            className="form-control"
            placeholder="Especie"
            value={form.especie}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            name="edad"
            type="number"
            className="form-control"
            placeholder="Edad"
            value={form.edad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <textarea
            name="info_adicional"
            className="form-control"
            placeholder="Descripción"
            value={form.info_adicional}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            name="estado"
            className="form-select"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="Disponible">Disponible</option>
            <option value="En tránsito">En tránsito</option>
            <option value="Adoptado">Adoptado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            {editandoId ? 'Actualizar Mascota' : 'Agregar Mascota'}
          </button>
        </div>
      </form>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Edad</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.map((mascota) => (
              <tr key={mascota.id}>
                <td>{mascota.nombre}</td>
                <td>{mascota.especie}</td>
                <td>{mascota.edad}</td>
                <td>{mascota.info_adicional}</td>
                <td>
                  <span
                    className={`badge ${
                      mascota.estado === 'Disponible'
                        ? 'bg-success'
                        : mascota.estado === 'En tránsito'
                        ? 'bg-warning text-dark'
                        : 'bg-secondary'
                    }`}
                  >
                    {mascota.estado}
                  </span>
                </td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(mascota)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mascota.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MascotasCrud;
