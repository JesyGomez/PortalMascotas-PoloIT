import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { useAdminStore } from '../../hooks/useAdminStore';

export const Mascotas = () => {
  const {
    mascotas,
    isLoading,
    loadMascotas,
    createOrUpdateMascota,
    deleteMascota,
  } = useAdminStore();

  const [form, setForm] = useState({
    nombre: '',
    especie: '',
    edad: '',
    info_adicional: '',
    estado: 'Disponible',
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    loadMascotas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrUpdateMascota(form, editandoId);
    setForm({
      nombre: '',
      especie: '',
      edad: '',
      info_adicional: '',
      estado: 'Disponible',
    });
    setEditandoId(null);
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
    await deleteMascota(id);
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
            type="text"
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
        {isLoading ? (
          <p>Cargando mascotas...</p>
        ) : (
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
                          : mascota.estado === 'Adoptado'
                          ? 'bg-secondary'
                          : 'bg-info text-dark'
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
        )}
      </div>
    </div>
  );
};
