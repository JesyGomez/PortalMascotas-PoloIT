import { useEffect } from "react";
import { useAdminStore } from "../../hooks/useAdminStore";
import { useNavigate } from "react-router-dom";
export const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, isLoading, loadAdminStats } = useAdminStore();

  useEffect(() => {
    loadAdminStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <img
          src="https://i.gifer.com/46sy.gif"
          alt="Cargando mascotas..."
          className="mb-3"
        />
        <p
          className="text-muted fs-5 fw-bold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Cargando datos del sistema...
        </p>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#333" }}>
        Dashboard
      </h1>

      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            flex: "1 1 200px",
            padding: "1.5rem",
            backgroundColor: "#FF9F68",
            color: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>Total Mascotas</h2>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            {stats.totalMascotas}
          </p>
        </div>

        <div
          style={{
            flex: "1 1 200px",
            padding: "1.5rem",
            backgroundColor: "#7091F5",
            color: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>Total Usuarios</h2>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            {stats.totalUsuarios}
          </p>
        </div>
      </section>

      <section
        style={{
          marginBottom: "2rem",
          background: "#fff",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>🐾 Mascotas por Estado</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <strong>Solicitudes Pendientes:</strong>{" "}
            {stats.solicitudesPendientes}
          </li>
          <li>
            <strong>Ofrecimientos Pendientes:</strong>{" "}
            {stats.ofrecimientosPendientes}
          </li>
        </ul>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>✨ Últimas Mascotas Agregadas</h2>
        {stats.ultimasMascotas.length === 0 ? (
          <p>No hay mascotas registradas aún.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {stats.ultimasMascotas.map((mascota) => (
              <li
                key={mascota.id}
                style={{ padding: ".5rem 0", borderBottom: "1px solid #eee" }}
              >
                🐶 {mascota.nombre} -{" "}
                <em style={{ color: "#666" }}>{mascota.estado}</em>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* 🔄 Actividad Reciente */}
      <section
        style={{
          background: "#fff",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginTop: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>📅 Actividad Reciente</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            {
              color: "#28a745",
              titulo: "Nueva adopción completada",
              descripcion: "Max adoptado por María García",
              tiempo: "Hace 2h",
            },
            {
              color: "#007bff",
              titulo: "Nueva mascota registrada",
              descripcion: "Luna - Gato Persa",
              tiempo: "Hace 4h",
            },
            {
              color: "#fd7e14",
              titulo: "Solicitud de adopción",
              descripcion: "Carlos Ruiz solicita adoptar a Buddy",
              tiempo: "Hace 6h",
            },
            {
              color: "#6f42c1",
              titulo: "Usuario registrado",
              descripcion: "Ana López se unió a la plataforma",
              tiempo: "Hace 8h",
            },
            {
              color: "#dc3545",
              titulo: "Solicitud rechazada",
              descripcion: "Solicitud para Rocky no aprobada",
              tiempo: "Hace 12h",
            },
          ].map((evento, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: evento.color,
                  borderRadius: "50%",
                  marginRight: "1rem",
                }}
              ></span>
              <div style={{ flexGrow: 1 }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>{evento.titulo}</p>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>
                  {evento.descripcion}
                </p>
              </div>
              <span style={{ fontSize: "0.75rem", color: "#999" }}>
                {evento.tiempo}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 📊 Estadísticas Rápidas */}
      <section
        style={{
          background: "#fff",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginTop: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>📊 Estadísticas Rápidas</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <strong>Tasa de adopción:</strong>{" "}
            <span style={{ color: "green" }}>
              {stats.tasaAdopcion || "65%"}
            </span>
          </li>
          <li>
            <strong>Tiempo promedio de adopción:</strong> 15 días
          </li>
          <li>
            <strong>Mascotas más populares:</strong> Perros (68%)
          </li>
          <li>
            <strong>Satisfacción usuarios:</strong>{" "}
            <span style={{ color: "green" }}>4.8/5</span>
          </li>
          <li>
            <strong>Solicitudes aprobadas:</strong>{" "}
            <span style={{ color: "blue" }}>89%</span>
          </li>
          <li>
            <strong>Usuarios activos:</strong>{" "}
            <span style={{ color: "purple" }}>{stats.totalUsuarios}</span>
          </li>
        </ul>
      </section>

{/* ⚡ Acciones Rápidas */}
  <section
    style={{
      background: "#fff",
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginTop: "2rem",
    }}
  >
    <h2 style={{ marginBottom: "1rem" }}>⚡ Acciones Rápidas</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <button
        className="btn btn-outline-primary"
        onClick={() => navigate("/admin/mascotas")}
      >
        Agregar Mascota
      </button>
      <button
        className="btn btn-outline-danger"
        onClick={() => navigate("/admin/solicitudes")}
      >
        Ver Solicitudes
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate("/admin/gestiondeusuarios")}
      >
        Gestionar Usuarios
      </button>
      <button
        className="btn btn-outline-success"
        onClick={() => navigate("/admin/analytics")}
      >
        Ver Reportes
      </button>
        </div>
      </section>
    </div>
  );
};
