import { useEffect, useState } from "react";
import { Search, Mail, MapPin, Edit, Eye, Ban, Home, PawPrint } from "lucide-react";

export function GestiondeUsuarios() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rolFilter, setRolFilter] = useState("all");

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

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${text}`);
      }

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

  const handleBlock = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/usuarios/${userId}/bloquear`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchUsers();
    } catch (error) {
      console.error("Error bloqueando usuario:", error);
    }
  };

  return (
    <div className="container my-4">
      <div className="mb-4">
        <h2 className="h4">Gestión de Usuarios</h2>
        <p className="text-muted">Administra los usuarios registrados en la plataforma</p>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8 position-relative">
              <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={18} />
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
                          <div className="fw-semibold">{user.nombre} {user.apellido}</div>
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
                        <span className="badge bg-success me-1">Puede Adoptar</span>
                      ) : (
                        <span className="badge bg-secondary me-1">No puede Adoptar</span>
                      )}
                      {user.habilitado_dador ? (
                        <span className="badge bg-primary me-1">Puede Dar</span>
                      ) : (
                        <span className="badge bg-secondary me-1">No puede Dar</span>
                      )}
                      {user.hogar_transito ? (
                        <span className="badge bg-warning text-dark me-1">Hogar de Tránsito</span>
                      ) : null}
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button className="btn btn-outline-primary btn-sm" title="Ver">
                          <Eye size={16} />
                        </button>
                        <button className="btn btn-outline-secondary btn-sm" title="Editar">
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          title="Bloquear"
                          onClick={() => handleBlock(user.id)}
                        >
                          <Ban size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No hay usuarios encontrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
