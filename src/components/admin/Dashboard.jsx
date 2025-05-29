import React, { useEffect, useState } from 'react';
import '../../estilos/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMascotas: 0,
    solicitudesPendientes: 0,
    ofrecimientosPendientes: 0,
    totalUsuarios: 0
  });

  useEffect(() => {
    // Este fetch lo vas a conectar con tu API real más adelante
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error cargando estadísticas:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Panel de Administración 🛠️</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{stats.totalMascotas}</h3>
          <p>Mascotas disponibles</p>
        </div>
        <div className="stat-card">
          <h3>{stats.solicitudesPendientes}</h3>
          <p>Solicitudes pendientes</p>
        </div>
        <div className="stat-card">
          <h3>{stats.ofrecimientosPendientes}</h3>
          <p>Ofrecimientos sin revisar</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalUsuarios}</h3>
          <p>Usuarios registrados</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
