import React, { useState, useEffect } from "react";
import {
  Bell,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";

export default function Notificaciones() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notificaciones");
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error al cargar notificaciones:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-success me-2" />;
      case "warning":
        return <AlertCircle className="text-warning me-2" />;
      case "error":
        return <X className="text-danger me-2" />;
      default:
        return <Info className="text-primary me-2" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "action") return n.actionRequired;
    return true;
  });

  return (
    <div className="container my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h2 className="h4 fw-bold">Centro de Notificaciones</h2>
          <p className="text-muted">Mantente al día con las actividades importantes</p>
        </div>

        <div className="btn-group mt-3 mt-md-0">
          <button
            className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("all")}
          >
            Todas
          </button>
          <button
            className={`btn btn-sm ${filter === "unread" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("unread")}
          >
            No leídas
          </button>
          <button
            className={`btn btn-sm ${filter === "action" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("action")}
          >
            Acción requerida
          </button>
        </div>
      </div>

      <div className="row gy-3">
        {filteredNotifications.map((notification) => (
          <div className="col-12" key={notification.id}>
            <div className={`card shadow-sm ${!notification.read ? "border-start border-4 border-primary" : ""}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    {getNotificationIcon(notification.type)}
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h5 className="mb-0 fs-6">{notification.title}</h5>
                        {!notification.read && (
                          <span className="badge bg-secondary text-white text-uppercase">Nuevo</span>
                        )}
                        {notification.actionRequired && (
                          <span className="badge bg-danger text-white text-uppercase">Acción requerida</span>
                        )}
                      </div>
                      <p className="text-muted mb-1">{notification.message}</p>
                      <div className="d-flex align-items-center text-muted small">
                        <Clock className="me-1" size={14} />
                        {new Date(notification.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    {!notification.read && (
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="col-12">
            <div className="card text-center py-5">
              <div className="card-body">
                <Bell className="text-muted mb-3" size={48} />
                <h5>No hay notificaciones</h5>
                <p className="text-muted">Todas las notificaciones están al día</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
