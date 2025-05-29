import React, { useState, useEffect } from 'react';
import '../../estilos/dashboard.css';

const MascotasCrud = () => {
  const [mascotas, setMascotas] = useState([]);
  const [form, setForm] = useState({ nombre: '', especie: '', edad: '', descripcion: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mascotas');
      const data = await response.json();
      setMascotas(data);
    } catch (err) {
      console.error('Error al cargar mascotas:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editandoId
      ? `http://localhost:5000/api/mascotas/${editandoId}`
      : 'http://localhost:5000/api/mascotas';

    const method = editandoId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setForm({ nombre: '', especie: '', edad: '', descripcion: '' });
      setEditandoId(null);
      fetchMascotas();
    } catch (err) {
      console.error('Error al guardar mascota:', err);
    }
  };

  const handleEdit = (mascota) => {
    setForm(mascota);
    setEditandoId(mascota.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/mascotas/${id}`, { method: 'DELETE' });
      fetchMascotas();
    } catch (err) {
      console.error('Error al eliminar mascota:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Gestión de Mascotas 🐶🐱</h2>

      <form className="crud-form" onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="especie" placeholder="Especie" value={form.especie} onChange={handleChange} required />
        <input name="edad" type="number" placeholder="Edad" value={form.edad} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table className="crud-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Edad</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota) => (
            <tr key={mascota.id}>
              <td>{mascota.nombre}</td>
              <td>{mascota.especie}</td>
              <td>{mascota.edad}</td>
              <td>{mascota.descripcion}</td>
              <td>
                <button onClick={() => handleEdit(mascota)}>Editar</button>
                <button onClick={() => handleDelete(mascota.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MascotasCrud;
