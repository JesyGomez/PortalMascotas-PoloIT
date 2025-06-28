import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/dashboard.css";
import { useAdminStore } from "../../hooks/useAdminStore";

export const Mascotas = () => {
  const {
    mascotas,
    isLoading,
    loadMascotas,
    createOrUpdateMascota,
    deleteMascota,
  } = useAdminStore();

  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    edad: "",
    info_adicional: "",
    estado: "Disponible",
    imagen_url: "",
  });

  const [editandoId, setEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState("");

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
      nombre: "",
      especie: "",
      edad: "",
      info_adicional: "",
      estado: "Disponible",
      imagen_url: "",
    });
    setEditandoId(null);
    loadMascotas();
  };

  const handleEdit = (mascota) => {
    setForm({
      nombre: mascota.nombre,
      especie: mascota.especie,
      edad: mascota.edad,
      info_adicional: mascota.info_adicional,
      estado: mascota.estado,
      imagen_url: mascota.imagen_url || "",
    });
    setEditandoId(mascota.id);
  };

  const handleDelete = async (id) => {
    const mascota = mascotas.find((m) => m.id === id);
    const result = await Swal.fire({
      title: `¿Eliminar a ${mascota.nombre}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteMascota(id);
      Swal.fire("Eliminado", "La mascota fue eliminada", "success");
    }
  };

  const handleView = (mascota) => {
    Swal.fire({
      title: mascota.nombre,
      html: `
        <div class="text-start">
          <img src="${
            mascota.imagen_url || "https://via.placeholder.com/300x200"
          }" class="img-fluid rounded mb-3" style="max-height: 200px;" />
          <p><strong>Especie:</strong> ${mascota.especie}</p>
          <p><strong>Edad:</strong> ${mascota.edad} años</p>
          <p><strong>Estado:</strong> ${mascota.estado}</p>
          <p><strong>Descripción:</strong> ${mascota.info_adicional}</p>
        </div>
      `,
      confirmButtonText: "Cerrar",
    });
  };

  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Disponible":
        return "bg-success";
      case "En tránsito":
        return "bg-warning text-dark";
      case "Adoptado":
        return "bg-secondary";
      case "Pendiente":
        return "bg-info text-dark";
      default:
        return "bg-light text-dark";
    }
  };

  const mascotasFiltradas = mascotas.filter((m) =>
    `${m.nombre} ${m.especie} ${m.info_adicional} ${m.estado}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="stat-card mt-4">Gestión de Mascotas 🐾</h2>
      <p className="subtitulo-borde">
        Administra el catálogo de mascotas disponibles para adopción
      </p>

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
            <option value="en tránsito">En tránsito</option>
            <option value="Adoptado">Adoptado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
        <div className="col-md-9">
          <input
            name="imagen_url"
            type="url"
            className="form-control"
            placeholder="URL de la imagen"
            value={form.imagen_url}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            {editandoId ? "Actualizar Mascota" : "Agregar Mascota"}
          </button>
        </div>
      </form>

{/* Campo de búsqueda con icono */}
<div className="row mb-3">
  <div className="col-md-6">
    <div className="input-group"> {/* <--- Agrega el input-group aquí */}
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre, especie o descripción"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {/* <--- Agrega el icono aquí, puede ser un span o un button */}
      <span className="input-group-text"> {/* O btn btn-primary para un botón */}
        <i className="bi bi-search"></i> {/* El icono de búsqueda */}
      </span>
    </div>
  </div>
</div>
      {/* Grid de tarjetas */}
      {isLoading ? (
        <p>Cargando mascotas...</p>
      ) : (
        <div className="row">
          {mascotasFiltradas.map((mascota) => (
            <div key={mascota.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card pet-card bg-light h-100">
                <img
                  src={
                    mascota.imagen_url || "https://via.placeholder.com/300x200"
                  }
                  className="pet-image"
                  alt={mascota.nombre}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title">{mascota.nombre}</h5>
                      <span
                        className={`badge ${getBadgeClass(mascota.estado)}`}
                      >
                        {mascota.estado}
                      </span>
                    </div>
                    <p className="card-text">
                      <strong>Especie:</strong> {mascota.especie}
                      <br />
                      <strong>Edad:</strong> {mascota.edad} años
                    </p>
                    <p className="card-text">{mascota.info_adicional}</p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleView(mascota)}
                    >
                      <i className="bi bi-eye"></i> Ver
                    </button>
                    <div>
                      <button
                        className="btn btn-outline-success btn-sm me-1"
                        onClick={() => handleEdit(mascota)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(mascota.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
