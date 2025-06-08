import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenidos al Home</h1>
      <div className="mascotas-lista">
        {/* Aquí iría un componente tipo <MascotaCard /> con la info */}
        <div className="card-mascota">
          <img src="https://via.placeholder.com/150" alt="Mascota" />
          <h2>Aquí hay de Desarrollar INICIO</h2>
          <h3>Nombre: Max</h3>
          <p>Edad: 2 años</p>
          <p>Raza: Mestizo</p>
          <button>Voluntariado</button>
          <button>Quiero ser hogar de tránsito</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
