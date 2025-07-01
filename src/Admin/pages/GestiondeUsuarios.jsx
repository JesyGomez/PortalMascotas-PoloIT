import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { Search, Mail, MapPin, Edit, Eye, Ban } from "lucide-react";

export function GestiondeUsuarios() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rolFilter, setRolFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, rolFilter]);
  
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${text}`);
      const data = JSON.parse(text);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterUsers = () => {
    let filtered = users;
    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (rolFilter !== "all") {
      filtered = filtered.filter((u) => u.rol === rolFilter);
    }
    setFilteredUsers(filtered);
  };

  const openModal = (type, user) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  return (
    <div className="container my-4">
      <div className="mb-4">
        <h2 className="h4">Gestión de Usuarios</h2>
        <p className="text-muted">
          Administra los usuarios registrados en la plataforma
        </p>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8 position-relative">
              <Search
                className="position-absolute top-50 translate-middle-y ms-3 text-muted"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5"
              />
            </div>
            <div className="col-md-4">
              <select
                value={rolFilter}
                onChange={(e) => setRolFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">Todos los roles</option>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Lista de Usuarios</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Usuario</th>
                  <th>Contacto</th>
                  <th>Permisos</th>
                  <th>Hogar</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={user.imagenDePerfil || "/placeholder.svg"}
                          alt="Avatar"
                          className="rounded-circle"
                          width="40"
                          height="40"
                        />
                        <div>
                          <div className="fw-semibold">
                            {user.nombre} {user.apellido}
                          </div>
                          <small className="text-muted">{user.rol}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <Mail size={16} className="text-muted" />
                        <span>{user.email}</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <MapPin size={16} className="text-muted" />
                        <span>{user.localidad || "-"}</span>
                      </div>
                    </td>
                    <td>
                      {user.habilitado_adoptar ? (
                        <span className="badge bg-success me-1">
                          Puede Adoptar
                        </span>
                      ) : (
                        <span className="badge bg-secondary me-1">
                          No puede Adoptar
                        </span>
                      )}
                      {user.habilitado_dador ? (
                        <span className="badge bg-primary me-1">Puede Dar</span>
                      ) : (
                        <span className="badge bg-secondary me-1">
                          No puede Dar
                        </span>
                      )}
                    </td>
                    <td>
                      {user.hogar_transito ? (
                        <span className="badge bg-info text-dark">Sí</span>
                      ) : (
                        <span className="badge bg-light text-muted">No</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          title="Ver"
                          onClick={() => openModal("view", user)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          title="Editar"
                          onClick={() => openModal("edit", user)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          title="Bloquear"
                          onClick={() => openModal("block", user)}
                        >
                          <Ban size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No hay usuarios encontrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedUser && modalType === "view" && (
        <UserModal user={selectedUser} onClose={closeModal} />
      )}

      {selectedUser && modalType === "edit" && (
        <EditUserModal
          user={selectedUser}
          onClose={closeModal}
          onUpdated={fetchUsers}
        />
      )}

      {selectedUser && modalType === "block" && (
        <ConfirmBlockModal
          user={selectedUser}
          onClose={closeModal}
          onBlocked={fetchUsers}
        />
      )}
    </div>
  );
}

function UserModal({ user, onClose }) {
  return (
    <div className="modal-backdrop fade show">
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalles del Usuario</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Nombre:</strong> {user.nombre} {user.apellido}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Rol:</strong> {user.rol}
              </p>
              <p>
                <strong>Localidad:</strong> {user.localidad || "-"}
              </p>
              <p>
                <strong>Permisos:</strong>
              </p>
              <ul>
                <li>Puede Adoptar: {user.habilitado_adoptar ? "Sí" : "No"}</li>
                <li>Puede Dar: {user.habilitado_dador ? "Sí" : "No"}</li>
                <li>Hogar de Tránsito: {user.hogar_transito ? "Sí" : "No"}</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditUserModal({ user, onClose, onUpdated }) {
  const [rol, setRol] = useState(user.rol);
  const [habilitadoAdoptar, setHabilitadoAdoptar] = useState(!!(user.habilitado_adoptar ?? 0));
  const [habilitadoDador, setHabilitadoDador] = useState(!!(user.habilitado_dador ?? 0));
  const [hogarTransito, setHogarTransito] = useState(!!(user.hogar_transito ?? 0));
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/admin/usuarios/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rol,
          habilitado_adoptar: habilitadoAdoptar ? 1 : 0,
          habilitado_dador: habilitadoDador ? 1 : 0,
          hogar_transito: hogarTransito ? 1 : 0,
        }),
      });
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
<div className="modal-backdrop fade show">
  <div className="modal d-block">
    <div className="modal-dialog">
      <div className="modal-content shadow">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">Editar Usuario</h5>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>

        <div className="modal-body">
          <p className="fw-bold">
            {user.nombre} {user.apellido}
          </p>

          <div className="mb-3">
            <label className="form-label">Rol del usuario</label>
            <select
              className="form-select"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>

          <hr />

          <div className="alert alert-info py-2" role="alert">
            <strong>Configuración de permisos:</strong> Activá o desactivá las funciones que este usuario puede realizar en el sistema.
          </div>

          <div className="mb-2">
            <strong>Habilitado para adoptar:</strong>
            <div className="form-check form-switch d-inline ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="habilitadoAdoptar"
                checked={habilitadoAdoptar}
                onChange={(e) => setHabilitadoAdoptar(e.target.checked)}
              />
            </div>
          </div>

          <div className="mb-2">
            <strong>Habilitado para dar en adopción:</strong>
            <div className="form-check form-switch d-inline ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="habilitadoDador"
                checked={habilitadoDador}
                onChange={(e) => setHabilitadoDador(e.target.checked)}
              />
            </div>
          </div>

          <div className="mb-2">
            <strong>Habilitado como hogar de tránsito:</strong>
            <div className="form-check form-switch d-inline ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="hogarTransito"
                checked={hogarTransito}
                onChange={(e) => setHogarTransito(e.target.checked)}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={handleSave}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );}


function ConfirmBlockModal({ user, onClose, onBlocked }) {
  const handleBlock = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/admin/usuarios/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activo: 0, // bloquear usuario poniendo activo = 0
        }),
      });
      onBlocked();
      onClose();
    } catch (error) {
      console.error("Error al bloquear usuario:", error);
    }
  };

  return (
    <div className="modal-backdrop fade show">
      <div className="modal d-block">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Bloqueo</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>
                ¿Estás segura de que querés bloquear a <strong>{user.nombre}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={handleBlock}>
                Bloquear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
