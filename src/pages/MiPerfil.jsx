import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/context/AuthContext";
import "../estilos/mi-perfil.css";

function MiPerfil() {
  const { usuario, loading, logout, setUsuario } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || "",
        email: usuario.email || "",
        localidad: usuario.localidad || "",
      });
    }
  }, [usuario]);

  // Estados para cantidad de publicaciones y adopciones
  const [cantidadPublicaciones, setCantidadPublicaciones] = useState(0);
  const [cantidadAdopciones, setCantidadAdopciones] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPublicaciones = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mascotas/usuario", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener publicaciones");
        const data = await res.json();
        setCantidadPublicaciones(data.length);

        const adoptados = data.filter((mascota) => mascota.estado === "adoptado");
        setCantidadAdopciones(adoptados.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPublicaciones();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/auth/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el perfil");
      }

      const updatedUser = await res.json();
      setUsuario(updatedUser);
      setModalOpen(false);
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Hubo un error al actualizar tu perfil");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!usuario) return <p>Usuario no autenticado</p>;

  return (
    <div className="perfil-wrapper">
      <div className="perfil-card">
        <div className="perfil-foto">
          {usuario.imagenDePerfil ? (
            <img src={usuario.imagenDePerfil} alt="Foto de perfil" />
          ) : (
            <div className="icono-usuario">👩‍💻</div>
          )}
        </div>
        <h2>{usuario.nombre}</h2>
        <p>Email: {usuario.email}</p>
        <p>Ciudad: {usuario.localidad || "Desconocida"}</p>
        <p>Rol: {usuario.rol}</p>

        <div className="perfil-estadisticas">
          <div>
            <strong>{cantidadPublicaciones}</strong>
            <span>Publicaciones</span>
          </div>
          <div>
            <strong>{cantidadAdopciones}</strong>
            <span>Adopciones</span>
          </div>
        </div>

        <div className="perfil-botones">
          <button onClick={() => setModalOpen(true)}>Editar Perfil</button>
          <button className="cerrar-sesion" onClick={logout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Renderizar modal solo si modalOpen y formData están listos */}
      {modalOpen && formData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Perfil</h3>
            <label>
              Nombre:
              <input name="nombre" value={formData.nombre} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              Ciudad:
              <input name="localidad" value={formData.localidad} onChange={handleChange} />
            </label>
            <div className="modal-buttons">
              <button onClick={handleGuardar}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MiPerfil;
