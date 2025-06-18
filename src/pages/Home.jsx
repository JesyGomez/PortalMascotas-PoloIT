import React, { useState, useEffect } from 'react';
import PetCard from '../components/petCard/PetCard';
import '../estilos/home.css';
const Home = () => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/mascotas/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al obtener mascotas');
        return response.json();
      })
      .then(data => setMascotas(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home">
      <section className="home-hero"></section>

      <section className="home-acciones">
        <button className="btn-voluntariado">VOLUNTARIADO</button>
        <button className="btn-transito">QUIERO SER HOGAR DE TRÁNSITO</button>
      </section>

      <section className="home-nosotros">
        <div className="nosotros-wrapper">
          <img src="/corazonAmor.png" alt="Adoptar es un acto de amor" className="nosotros-corazon" />
          <div className="nosotros-caja">
            <h2>NOSOTROS</h2>
            <p>
              Somos un equipo de personas impulsadas por el amor, el cariño y la empatía hacia las mascotas...
            </p>
          </div>
        </div>
      </section>

      <section className="home-banner">
        <p>
          ¿Quieres convertirte en su segunda oportunidad?<br />
          <strong>¡Conócelos!</strong>
        </p>
      </section>
     <div className="d-flex flex-wrap justify-content-center">
        {mascotas.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
      <nav className="d-flex justify-content-center my-4">
        <ul className="pagination custom-pagination">
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
