import React from 'react';
import '../estilos/home.css';

const Home = () => {
  return (
    <div className="home">

      <section className="home-hero"></section>

      {/* BOTONES */}
      <section className="home-acciones">
        <button className="btn-voluntariado">VOLUNTARIADO</button>
        <button className="btn-transito">QUIERO SER HOGAR DE TRÁNSITO</button>
      </section>

      {/* NOSOTROS */}
      <section className="home-nosotros">
        <div className="nosotros-wrapper">
          <img src="/corazonAmor.png" alt="Adoptar es un acto de amor" className="nosotros-corazon" />

          <div className="nosotros-caja">
            <h2>NOSOTROS</h2>
            <p>
              Somos un equipo de personas impulsadas por el amor, el cariño y la empatía hacia las mascotas.
              Nuestro objetivo es transformar vidas – tanto de los animales como de las personas – creando un puente
              entre quienes buscan dar un hogar lleno de amor, dar segundas oportunidades, e inclusive tiempo y quienes
              necesitan un hogar.
              <br /><br />
              Creemos en la adopción responsable, en el valor del tránsito como oportunidad y en la construcción de una
              comunidad solidaria, donde cada acción cuenta para darles una segunda oportunidad a quienes más lo necesitan.
            </p>
          </div>
        </div>
      </section>
      <section className="home-banner">
        <p>
          ¿Quieres convertirte en su segunda oportunidad?<br/>
          <strong>¡Conócelos!</strong>
        </p>
      </section>


    </div>
  );
};

export default Home;