import { useState, useEffect } from "react";
import { TrendingUp, Download, Users, Heart, PawPrint } from "lucide-react";

export function Analytics() {

  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [isLoading, setIsLoading] = useState(true);

  const mockData = {
    adoptionTrends: [
      { month: "Ene", adoptions: 45, applications: 78 },
      { month: "Feb", adoptions: 52, applications: 89 },
      { month: "Mar", adoptions: 38, applications: 65 },
      { month: "Abr", adoptions: 61, applications: 95 },
      { month: "May", adoptions: 55, applications: 82 },
      { month: "Jun", adoptions: 67, applications: 103 },
    ],
    speciesDistribution: [
      { species: "Perros", count: 156, percentage: 68 },
      { species: "Gatos", count: 89, percentage: 24 },
      { species: "Conejos", count: 12, percentage: 5 },
      { species: "Aves", count: 8, percentage: 3 },
    ],
    userGrowth: [
      { month: "Ene", newUsers: 23, totalUsers: 234 },
      { month: "Feb", newUsers: 31, totalUsers: 265 },
      { month: "Mar", newUsers: 28, totalUsers: 293 },
      { month: "Abr", newUsers: 35, totalUsers: 328 },
      { month: "May", newUsers: 42, totalUsers: 370 },
      { month: "Jun", newUsers: 38, totalUsers: 408 },
    ],
    topMetrics: {
      totalMascotas: 0,
      totalUsuarios: 0,
      totalSolicitudes: 0,
      totalAdopciones: 0,
    },
  };

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/analytics");
      const data = await response.json();

      const mergedData = {
        ...mockData,
        ...data,
      };

      setAnalyticsData(mergedData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Cargando analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="container my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h2 className="h4 fw-bold">Analytics y Reportes</h2>
          <p className="text-muted">
            Análisis detallado del rendimiento de la plataforma
          </p>
        </div>

        <div className="d-flex gap-2 mt-3 mt-md-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="form-select"
          >
            <option value="3months">Últimos 3 meses</option>
            <option value="6months">Últimos 6 meses</option>
            <option value="1year">Último año</option>
          </select>
          <button className="btn btn-outline-primary d-flex align-items-center">
            <Download className="me-2" size={16} />
            Exportar
          </button>
        </div>
      </div>

      <div className="row g-3">
        <MetricCard
          title="Total de Mascotas"
          value={analyticsData.topMetrics.totalMascotas}
          icon={<PawPrint size={20} />}
          trend="+3% vs mes anterior"
          trendIcon={<TrendingUp size={14} />}
          colorClass="bg-info text-white"
        />
        <MetricCard
          title="Total de Usuarios"
          value={analyticsData.topMetrics.totalUsuarios}
          icon={<Users size={20} />}
          trend="+5 nuevos esta semana"
          trendIcon={<TrendingUp size={14} />}
          colorClass="bg-secondary"
        />
        <MetricCard
          title="Solicitudes de Adopción"
          value={analyticsData.topMetrics.totalSolicitudes}
          icon={<Heart size={20} />}
          trend="+8% vs mes anterior"
          trendIcon={<TrendingUp size={14} />}
          colorClass="bg-success"
        />
        <MetricCard
          title="Adopciones Concretadas"
          value={analyticsData.topMetrics.totalAdopciones}
          icon={<TrendingUp size={20} />}
          trend="+12 adopciones"
          trendIcon={<TrendingUp size={14} />}
          colorClass="bg-primary"
        />
      </div>

      {/* Tendencias de adopción */}
      <div className="card my-4">
        <div className="card-header">
          <h5 className="mb-0">Tendencias de Adopción</h5>
          <small className="text-muted">Adopciones y solicitudes por mes</small>
        </div>
        <div className="card-body">
          {/* Fila con los meses */}
          <div className="d-flex flex-wrap gap-3 mb-4 justify-content-start">
            {analyticsData.adoptionTrends.map((item, idx) => (
              <span
                key={idx}
                className="badge bg-light text-dark border shadow-sm px-3 py-2"
                style={{ minWidth: "60px", textAlign: "center" }}
              >
                {item.month}
              </span>
            ))}
          </div>

          {/* Fila con las estadísticas */}
          <div className="row">
            {analyticsData.adoptionTrends.map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="border rounded p-3 shadow-sm bg-white">
                  <h6 className="text-primary mb-2">{item.month}</h6>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-success">
                      {item.adoptions} adopciones
                    </span>
                    <span className="badge bg-primary">
                      {item.applications} solicitudes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribución por especie */}
      <div className="card my-4">
        <div className="card-header">
          <h5 className="mb-0">Distribución por Especies</h5>
          <small className="text-muted">Porcentaje de mascotas por tipo</small>
        </div>
        <div className="card-body">
          {analyticsData.speciesDistribution.map((item, idx) => (
            <div key={idx} className="mb-3">
              <div className="d-flex justify-content-between">
                <span>{item.species}</span>
                <span>
                  {item.count} ({item.percentage}%)
                </span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div
                  className="progress-bar bg-info"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crecimiento de usuarios */}
      <div className="card my-4">
        <div className="card-header">
          <h5 className="mb-0">Crecimiento de Usuarios</h5>
          <small className="text-muted">Evolución mensual de registros</small>
        </div>
        <div className="card-body row text-center">
          {analyticsData.userGrowth.map((item, idx) => (
            <div key={idx} className="col-6 col-md-2 mb-3">
              <div className="fw-bold text-primary">{item.newUsers}</div>
              <div className="text-muted small">nuevos</div>
              <div>{item.month}</div>
              <div className="text-muted small">{item.totalUsers} total</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, trendIcon, colorClass }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className={`card text-white ${colorClass}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">{title}</h6>
            {icon}
          </div>
          <h3 className="fw-bold">{value}</h3>
          <div className="d-flex align-items-center gap-1 text-white-50 small">
            {trendIcon}
            <span>{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
