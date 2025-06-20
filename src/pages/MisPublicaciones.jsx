import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import "../estilos/mis-publicaciones.css";
import Swal from "sweetalert2";

function MisPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const { usuario, setUsuario } = useContext(AuthContext);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  const iniciales = usuario
    ? (usuario.nombre?.[0] || "") + (usuario.apellido?.[0] || "")
    : "";

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/mascotas/usuario", {
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

  const abrirModalEdicion = async (mascota) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/mascotas/${mascota.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al traer datos completos");
      const mascotaCompleta = await res.json();
      setMascotaSeleccionada(mascotaCompleta);
      setMostrarModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setMascotaSeleccionada(null);
  };

  const editarMascota = async (mascotaEditada) => {
    try {
      const token = localStorage.getItem("token");
console.log("Objeto a enviar:", mascotaEditada);
      const res = await fetch(`http://localhost:5000/api/mascotas/${mascotaEditada.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mascotaEditada),
      });

      if (!res.ok) throw new Error("Error al editar mascota");

      setPublicaciones((prev) =>
        prev.map((m) => (m.id === mascotaEditada.id ? mascotaEditada : m))
      );
      cerrarModal();
      Swal.fire("¡Guardado!", "La publicación fue actualizada correctamente.", "success");
    } catch (err) {
      console.error("Error al actualizar mascota:", err);
      Swal.fire("Error", "No se pudo editar la publicación.", "error");
    }
  };

  const confirmarEliminacion = (mascota) => {
    Swal.fire({
      title: `¿Eliminar a ${mascota.nombre}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarMascotaConfirmada(mascota.id);
      }
    });
  };

  const eliminarMascotaConfirmada = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/mascotas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar mascota");

      setPublicaciones((prev) => prev.filter((m) => m.id !== id));
      Swal.fire("¡Eliminado!", "La publicación fue eliminada correctamente.", "success");
    } catch (err) {
      console.error("Error al eliminar mascota:", err);
      Swal.fire("Error", "No se pudo eliminar la publicación.", "error");
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
    <p><strong>Acerca de</strong></p>
    <p>🏠 {usuario?.organizacion || "Tu Organización - Refugio - ONGs"}</p>
    <p>📍 {usuario?.localidad || "Tu Ubicación"}</p>

    <p><strong>Contacto</strong></p>
    <p>✉️ {usuario?.email || "sin-email@ejemplo.com"}</p>
  </div>
</aside>


        <section className="lista-publicaciones">
          {publicaciones.map((mascota) => (
            <div className="tarjeta-mascota" key={mascota.id}>
              <img src={mascota.imagen_url} alt={mascota.nombre} />
              <div className="info-mascota">
                <h3>{mascota.nombre}</h3>
                <p>{mascota.edad}</p>
                <p className="estado">{mascota.estado}</p>
                <div className="acciones">
                  <button className="editar" onClick={() => abrirModalEdicion(mascota)}>
                    Editar
                  </button>
                  <button className="eliminar" onClick={() => confirmarEliminacion(mascota)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

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
                <label>Nombre</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.nombre || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      nombre: e.target.value,
                    })
                  }
                  required
                />

                <label>Especie</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.especie || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      especie: e.target.value,
                    })
                  }
                  required
                />

                <label>Raza</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.raza || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      raza: e.target.value,
                    })
                  }
                />

                <label>Edad</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.edad || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      edad: e.target.value,
                    })
                  }
                />

                <label>Sexo</label>
                <select
                  value={mascotaSeleccionada.sexo || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      sexo: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccionar sexo</option>
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                  <option value="desconocido">Desconocido</option>
                </select>

                <label>Imagen URL</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.imagen_url || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      imagen_url: e.target.value,
                    })
                  }
                />

                <label>Estado</label>
                <select
                  value={mascotaSeleccionada.estado || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      estado: e.target.value,
                    })
                  }
                >
                  <option value="opcion">Elija una opción</option>
                  <option value="disponible">Disponible</option>
                  <option value="adopción">Adopción</option>
                  <option value="tránsito">Tránsito</option>
                  <option value="adoptado">Adoptado</option>
                </select>

                <label>Salud</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.salud || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      salud: e.target.value,
                    })
                  }
                />

                <label>Tamaño</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.tamanio || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      tamanio: e.target.value,
                    })
                  }
                />

                <label>Ubicación</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.ubicacion || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      ubicacion: e.target.value,
                    })
                  }
                />

                <label>Info Adicional</label>
                <textarea
                  value={mascotaSeleccionada.info_adicional || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      info_adicional: e.target.value,
                    })
                  }
                />

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
