import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Download,
  BarChart3,
  Users,
  Heart,
  PawPrint,
  Clock,
} from "lucide-react";

export function Analytics() {
  console.log("Renderizando Analytics 🚀");

  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/analytics");
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
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
          <p className="text-muted">Análisis detallado del rendimiento de la plataforma</p>
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
