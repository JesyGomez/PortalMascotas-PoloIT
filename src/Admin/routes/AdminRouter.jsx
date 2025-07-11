import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import {
  Dashboard,
  Solicitudes,
  Mascotas,
  Configuracion,
  GestiondeUsuarios,
  Analytics,
} from "../pages";
import "../styles/dashboard.css";
import { useAuthStore } from "../../hooks/useAuthStore";
import Notificaciones from "../pages/Notificaciones";

export const AdminRouter = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { startLogout } = useAuthStore();
  const navigate = useNavigate();

const handleLogout = () => {
    Swal.fire({
      title: "¡Hasta luego!",
      text: "Gracias por visitarnos. Que tengas un excelente día 😊",
      icon: "success",
      background: "#4b3621", 
      color: "#fff",
      confirmButtonText: "Cerrar sesión",
      confirmButtonColor: "#8B5E3C",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        startLogout();
        navigate("/login");
      }
    });
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        id="sidebar"
        className={`bg-light sidebar d-flex flex-column p-3 ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <button
          className="btn mb-3 d-md-none"
          onClick={() => setCollapsed(!collapsed)}
          style={{ borderColor: "#BF702A", color: "#BF702A" }}
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list"></i>
        </button>

        <ul className="nav nav-pills flex-column flex-grow-1">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              <i className="bi bi-speedometer2 me-2"></i>
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/solicitudes">
              <i className="bi bi-journal-text me-2"></i>
              {!collapsed && <span>Solicitudes</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/mascotas">
              <i className="bi bi-heart me-2"></i>
              {!collapsed && <span>Mascotas</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/gestiondeusuarios">
              <i className="bi bi-people me-2"></i>
              {!collapsed && <span>Gestión de Usuario</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/analytics">
              <i className="bi bi-graph-up me-2"></i>
              {!collapsed && <span>Analisis</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/notificaciones">
              <i className="bi bi-bell me-2"></i>
              {!collapsed && <span>Notificaciones</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/configuracion">
              <i className="bi bi-gear me-2"></i>
              {!collapsed && <span>Configuración</span>}
            </Link>
          </li>
          <li className="nav-item">
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>
              {!collapsed && <span>Cerrar sesión</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <main className="col-md-9 col-lg-10 px-md-4 py-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/solicitudes" element={<Solicitudes />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/gestiondeusuarios*" element={<GestiondeUsuarios />} />
          <Route path="/analytics*" element={<Analytics />} />
          <Route path="/notificaciones*" element={<Notificaciones />} />
          <Route path="/configuracion*" element={<Configuracion />} />

          <Route path="" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};
