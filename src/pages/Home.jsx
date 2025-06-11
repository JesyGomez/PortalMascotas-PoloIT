import React from 'react';
import '../estilos/home.css'; // Asegurate de crear este archivo si no existe

const Home = () => {
  return (
    <div className="home-hero">
      <div className="home-overlay">
        <h1>Portal Mascotas</h1>
        <p>Encontrá, cuidá y adoptá con un clic</p>
        <div className="home-buttons">
          <button className="btn btn-primary">Ver mascotas</button>
          <button className="btn btn-secondary">Quiero ayudar</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
