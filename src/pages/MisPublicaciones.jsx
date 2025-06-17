import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import "../estilos/mis-publicaciones.css";

function MisPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const { usuario, setUsuario } = useContext(AuthContext);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [mascotaAEliminar, setMascotaAEliminar] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const iniciales = usuario
    ? (usuario.nombre?.[0] || "") + (usuario.apellido?.[0] || "")
    : "";

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/pets/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener las mascotas");

        const data = await response.json();
        setPublicaciones(data);
      } catch (error) {
        console.error("Error al traer mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/auth/user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("No se pudo obtener el usuario");

        const user = await res.json();
        setUsuario(user);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const abrirModalEdicion = (mascota) => {
    setMascotaSeleccionada(mascota);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setMascotaSeleccionada(null);
  };

  const editarMascota = async (mascotaEditada) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/pets/${mascotaEditada.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(mascotaEditada),
        }
      );

      if (!res.ok) throw new Error("Error al editar mascota");

      setPublicaciones((prev) =>
        prev.map((m) => (m.id === mascotaEditada.id ? mascotaEditada : m))
      );
      cerrarModal();
    } catch (err) {
      console.error("Error al actualizar mascota:", err);
    }
  };

  const eliminarMascotaConfirmada = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/pets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar mascota");

      setPublicaciones((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error al eliminar mascota:", err);
    }
  };

  return (
    <div className="mis-publicaciones">
      <header className="publicaciones-header">
        <h1>MIS PUBLICACIONES</h1>
        <p>Administra tus publicaciones de mascotas en adopción o tránsito</p>
        <div className="huella-decorativa" />
      </header>

      <div className="publicaciones-content">
        <aside className="perfil-usuario">
          <div className="avatar">
            {usuario?.imagenDePerfil ? (
              <img
                src={usuario.imagenDePerfil}
                alt="Avatar del usuario"
                className="avatar-imagen"
              />
            ) : (
              <h2>Usuario</h2>
            )}

            <div className="iniciales">{iniciales.toUpperCase()}</div>
          </div>
          <h2>{usuario?.nombre || "Usuario"}</h2>

          <div className="info">
            <p>
              <strong>Acerca de</strong>
            </p>
            <p>
              🏠 {usuario?.organizacion || "Tu Organización - Refugio - ONGs"}
            </p>
            <p>📍 {usuario?.localidad || "Tu Ubicación"}</p>

            <p>
              <strong>Contacto</strong>
            </p>
            <p>✉️ {usuario?.email || "sin-email@ejemplo.com"}</p>
          </div>
        </aside>

        <section className="lista-publicaciones">
          {publicaciones.map((mascota) => (
            <div className="tarjeta-mascota" key={mascota.id}>
              <img src={mascota.imagen_url} alt={mascota.nombre} />
              <div className="info-mascota">
                <h3>{mascota.nombre}</h3>
                <p>{mascota.edad} Años</p>
                <p className="estado">{mascota.estado}</p>
                <div className="acciones">
                  <button
                    className="editar"
                    onClick={() => abrirModalEdicion(mascota)}
                  >
                    Editar
                  </button>
                  <button
                    className="eliminar"
                    onClick={() => {
                      setMascotaAEliminar(mascota);
                      setMostrarModalEliminar(true);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {mostrarModalEliminar && mascotaAEliminar && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <h2>¿Eliminar publicación?</h2>
              <p>
                ¿Estás seguro de que querés eliminar a{" "}
                <strong>{mascotaAEliminar.nombre}</strong>?
              </p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button
                  onClick={() => {
                    eliminarMascotaConfirmada(mascotaAEliminar.id);
                    setMostrarModalEliminar(false);
                  }}
                >
                  Sí, eliminar
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarModalEliminar(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {mostrarModal && mascotaSeleccionada && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <h2>Editar Mascota</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editarMascota(mascotaSeleccionada);
                }}
              >
                <input
                  type="text"
                  value={mascotaSeleccionada.nombre}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      nombre: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={mascotaSeleccionada.edad}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      edad: e.target.value,
                    })
                  }
                />
                <select
                  value={mascotaSeleccionada.estado}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      estado: e.target.value,
                    })
                  }
                >
                  <option value="adopción">Adopción</option>
                  <option value="tránsito">Tránsito</option>
                  <option value="adoptado">Adoptado</option>
                </select>

                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={cerrarModal}>
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MisPublicaciones;
