import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/context/AuthContext";
import "../estilos/configuracion.css";

function Configuracion() {
  const { usuario } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    provincia: "",
    localidad: "",
    calle: "",
    imagenDePerfil: "",
  });

  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    console.log("Usuario recibido:", usuario);

    if (usuario) {
      setFormData({
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        email: usuario.email || "",
        provincia: usuario.provincia || "",
        localidad: usuario.localidad || "",
        calle: usuario.calle || "",
        imagenDePerfil: usuario.imagenDePerfil || "",
      });
    }
  }, [usuario]);
console.log("📦 Enviando datos:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Validar campos requeridos antes de enviar
    const { nombre, apellido, email } = formData;
    if (!nombre.trim() || !apellido.trim() || !email.trim()) {
      alert("Por favor completa nombre, apellido y email antes de guardar.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(
          `Error del servidor: ${data.message || "Error al actualizar perfil"}`
        );
        throw new Error(data.message || "Error al actualizar perfil");
      }

      alert("Cambios guardados 😎");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar");
    }
  };

const confirmarEliminacion = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:5000/api/auth/delete-user", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("Cuenta eliminada correctamente 🫥");
      localStorage.removeItem("token");
      window.location.href = "/"; // o redirect a login
    } else {
      alert("No se pudo eliminar la cuenta");
    }
  } catch (err) {
    console.error(err);
    alert("Error al intentar eliminar la cuenta");
  }
};


  return (
    <div className="config-wrapper">
      <div className="config-container">
        <h1>Configuración de Cuenta</h1>

        <form onSubmit={handleGuardarCambios}>
          <section>
            <h2>Datos Personales</h2>
            <label>
              Nombre:
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </label>
            <label>
              Apellido:
              <input
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </section>

          <section>
            <h2>Dirección</h2>
            <label>
              Provincia:
              <input
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
              />
            </label>
            <label>
              Localidad:
              <input
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
              />
            </label>
            <label>
              Calle:
              <input
                name="calle"
                value={formData.calle}
                onChange={handleChange}
              />
            </label>
          </section>

          <section>
            <h2>Foto de Perfil (opcional)</h2>
            <label>
              Imagen URL:
              <input
                name="imagenDePerfil"
                value={formData.imagenDePerfil}
                onChange={handleChange}
              />
            </label>
          </section>

          <button type="submit">Guardar cambios</button>
        </form>

        <div className="extra-info">
          <p>
            <strong>Rol:</strong> {usuario?.rol}
          </p>
          <p>
            <strong>Miembro desde:</strong>{" "}
            {new Date(usuario?.creado_en).toLocaleDateString()}
          </p>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            className="btn-delete-account"
            onClick={() => setMostrarModal(true)}
          >
            Eliminar mi cuenta
          </button>
        </div>

        {mostrarModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>Confirmar eliminación</h3>
              <p>
                ¿Estás seguro que querés eliminar tu cuenta? Esta acción no se
                puede deshacer.
              </p>
              <div className="modal-buttons">
                <button
                  className="btn-cancel"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn-confirm" onClick={confirmarEliminacion}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Configuracion;
