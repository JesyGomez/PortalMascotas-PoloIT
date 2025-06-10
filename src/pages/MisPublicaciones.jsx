import React from "react";
import "../estilos/mis-publicaciones.css";

const publicaciones = [
  {
    id: 1,
    nombre: "ARES",
    edad: "3 meses",
    estado: "Adoptado",
    imagen: "https://img.freepik.com/free-photo/beautiful-pet-portrait-dog_23-2149218450.jpg?ga=GA1.1.381529461.1730055476&semt=ais_hybrid&w=740",
  },
  {
    id: 2,
    nombre: "HUNTER",
    edad: "3 meses",
    estado: "En Adopción",
    imagen: "https://img.freepik.com/free-photo/adorable-brown-white-basenji-dog-smiling-giving-high-five-isolated-white_346278-1657.jpg?ga=GA1.1.381529461.1730055476&semt=ais_hybrid&w=740",
  },
  {
    id: 3,
    nombre: "TOM",
    edad: "6 años",
    estado: "Adoptado",
    imagen: "https://img.freepik.com/free-photo/adorable-little-dog-outdoors_23-2148740418.jpg?ga=GA1.1.381529461.1730055476&semt=ais_hybrid&w=740",
  },
  {
    id: 4,
    nombre: "WANDA",
    edad: "4 años",
    estado: "En Adopción",
    imagen: "https://img.freepik.com/free-photo/close-up-dog-sitting-white-background_23-2147841045.jpg?ga=GA1.1.381529461.1730055476&semt=ais_hybrid&w=740",
  },
];

function MisPublicaciones() {
  return (
    <div className="mis-publicaciones">
      <header className="publicaciones-header">
        <h1>MIS PUBLICACIONES</h1>
        <p>
          Administra tus publicaciones de mascotas en adopción o tránsito
        </p>
        <div className="huella-decorativa" />
      </header>

      <div className="publicaciones-content">
        <aside className="perfil-usuario">
          <div className="avatar">
            <div className="avatar-icon">😊</div>
            <div className="iniciales">JD</div>
          </div>
          <h2>Jane Doe</h2>
          <div className="info">
            <p><strong>Acerca de</strong></p>
            <p>🏠 Tu Organización - Refugio - ONGs</p>
            <p>📍 Tu Ubicación</p>
            <p><strong>Contacto</strong></p>
            <p>✉️ janedoe@gmail.com</p>
          </div>
        </aside>

        <section className="lista-publicaciones">
          {publicaciones.map((mascota) => (
            <div className="tarjeta-mascota" key={mascota.id}>
              <img src={mascota.imagen} alt={mascota.nombre} />
              <div className="info-mascota">
                <h3>{mascota.nombre}</h3>
                <p>{mascota.edad}</p>
                <p className="estado">{mascota.estado}</p>
                <div className="acciones">
                  <button className="editar">Editar</button>
                  <button className="eliminar">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default MisPublicaciones;
