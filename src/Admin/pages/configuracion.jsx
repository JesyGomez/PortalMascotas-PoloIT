import { useState } from "react";
import Swal from 'sweetalert2'; 

export const Configuracion = () => {
  const [settings, setSettings] = useState({
    siteName: "Patitas en casa",
    siteDescription: "Portal de adopción de mascotas",
    contactEmail: "admin@patitasencasa.com",
    maxPetsPerUser: 3,
    autoApproval: false,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    backupFrequency: "daily",
  });

const handleSave = () => {
  console.log("Configuración guardada:", settings);

  Swal.fire({
    title: '¡Guardado!',
    text: '✅ Configuración guardada correctamente.',
    icon: 'success', 
    confirmButtonText: 'Ok',
    timer: 3000, 
    timerProgressBar: true, // Opcional: muestra una barra de progreso del temporizador
    showClass: {
      popup: 'animate__animated animate__fadeInDown' // para animaciones de entrada si usas Animate.css
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp' // para animaciones de salida
    }
  });
};
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">⚙️ Configuración del Sistema</h2>
      <p className="text-muted">Administra la configuración general de la plataforma</p>

      <form className="row g-3">
        {/* General */}
        <div className="col-md-6">
          <label className="form-label">Nombre del Sitio</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email de Contacto</label>
          <input
            type="email"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Descripción del Sitio</label>
          <textarea
            name="siteDescription"
            rows="3"
            value={settings.siteDescription}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="col-md-4">
          <label className="form-label">Máximo de Mascotas por Usuario</label>
          <input
            type="number"
            name="maxPetsPerUser"
            value={settings.maxPetsPerUser}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Seguridad */}
        <div className="col-md-4">
          <label className="form-check-label d-block mb-2">Aprobación Automática</label>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              name="autoApproval"
              checked={settings.autoApproval}
              onChange={handleChange}
            />
            <label className="form-check-label">Activar</label>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="col-md-4">
          <label className="form-check-label d-block mb-2">Notificaciones por Email</label>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            <label className="form-check-label">Activar</label>
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-check-label d-block mb-2">Notificaciones por SMS</label>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              name="smsNotifications"
              checked={settings.smsNotifications}
              onChange={handleChange}
            />
            <label className="form-check-label">Activar</label>
          </div>
        </div>

        {/* Mantenimiento */}
        <div className="col-md-4">
          <label className="form-check-label d-block mb-2">Modo Mantenimiento</label>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
            />
            <label className="form-check-label">Activar</label>
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label">Frecuencia de Respaldo</label>
          <select
            name="backupFrequency"
            value={settings.backupFrequency}
            onChange={handleChange}
            className="form-select"
          >
            <option value="daily">Diario</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
          </select>
        </div>

        {/* Guardar */}
        <div className="col-12 text-end mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            💾 Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
