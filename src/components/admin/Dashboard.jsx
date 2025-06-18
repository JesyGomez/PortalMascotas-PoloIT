import React, { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalMascotas: 0,
    totalUsuarios: 0,
    solicitudesPendientes: 0,
    ofrecimientosPendientes: 0,
    ultimasMascotas: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró token de autenticación.");
      return;
    }

    fetch("http://localhost:5000/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al cargar estadísticas", err);
        setError("No se pudieron cargar las estadísticas.");
      });
  }, []);

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

      {error && (
        <div
          style={{
            backgroundColor: "#fdd",
            color: "#900",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          {error}
        </div>
      )}

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
            <strong>Pendientes:</strong> {stats.solicitudesPendientes}
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
    </div>
  );
}

export default Dashboard;
