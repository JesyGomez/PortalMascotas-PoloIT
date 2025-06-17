import React from "react";
import { useState, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import Solicitudes from "../components/admin/Solicitudes";
import Mascotas from "../components/admin/Mascotas";
import "../estilos/dashboard.css";
import { AuthContext } from "../components/context/AuthContext";
const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useContext(AuthContext);

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
            <button
              className="sidebar-logout-btn"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              {!collapsed && <span>Cerrar sesión</span>}
            </button>
          </li>
        </ul>
      </nav>
      {/* Contenido principal */}
      <main className="col-md-9 col-lg-10 px-md-4 py-4">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="mascotas" element={<Mascotas />} />
          <Route path="" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;
