import { useState } from 'react';
import "../estilos/configuracion.css";

function Configuracion() {
  const [nombre, setNombre] = useState('Jesy');
  const [email, setEmail] = useState('jesy@email.com');
  const [tema, setTema] = useState('claro');
  const [idioma, setIdioma] = useState('es');
  const [notificaciones, setNotificaciones] = useState({
    intereses: true,
    mensajes: true,
    recordatorios: false,
  });

  // Estado para mostrar el modal
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    console.log({ nombre, email, tema, idioma, notificaciones });
    alert("Configuración guardada 😎");
  };

  // Función para confirmar eliminación
  const confirmarEliminacion = () => {
    // Aquí harías la llamada al backend para eliminar la cuenta
    alert("Cuenta eliminada. :(");
    setMostrarModal(false);
    // Luego redireccionar o hacer logout
  };

  return (
    <div className="config-wrapper">
      <div className="config-container">
        <h1>Configuración de Cuenta</h1>

        <form onSubmit={handleGuardarCambios}>
          <section>
            <h2>Datos de Usuario</h2>
            <label>
              Nombre:
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </section>

          <section>
            <h2>Preferencias</h2>
            <label>
              Tema:
              <select value={tema} onChange={(e) => setTema(e.target.value)}>
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
              </select>
            </label>

            <label>
              Idioma:
              <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
                <option value="es">Español</option>
                <option value="en">Inglés</option>
              </select>
            </label>
          </section>

          <section>
            <h2>Notificaciones por email</h2>
            <label>
              <input
                type="checkbox"
                checked={notificaciones.intereses}
                onChange={(e) =>
                  setNotificaciones({ ...notificaciones, intereses: e.target.checked })
                }
              />
              Interés en mis publicaciones
            </label>

            <label>
              <input
                type="checkbox"
                checked={notificaciones.mensajes}
                onChange={(e) =>
                  setNotificaciones({ ...notificaciones, mensajes: e.target.checked })
                }
              />
              Nuevos mensajes
            </label>

            <label>
              <input
                type="checkbox"
                checked={notificaciones.recordatorios}
                onChange={(e) =>
                  setNotificaciones({ ...notificaciones, recordatorios: e.target.checked })
                }
              />
              Recordatorios de seguimiento
            </label>
          </section>

          <button type="submit">Guardar cambios</button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <button
            type="button"
            className="btn-delete-account"
            onClick={() => setMostrarModal(true)}
          >
            Eliminar mi cuenta
          </button>
        </div>

        {/* Modal */}
        {mostrarModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>Confirmar eliminación</h3>
              <p>¿Estás seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer.</p>
              <div className="modal-buttons">
                <button className="btn-cancel" onClick={() => setMostrarModal(false)}>Cancelar</button>
                <button className="btn-confirm" onClick={confirmarEliminacion}>Eliminar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Configuracion;