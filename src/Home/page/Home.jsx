import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import FiltroSidebar from "../components/FiltroSidebar";
import { usePetsStore } from "../../hooks/usePetStore";
import "../styles/home.css";

export const Home = () => {
  const [filtros, setFiltros] = useState({});
  const [paginaActual, setPaginaActual] = useState(1);

  const { pets, totalPages, isLoading, startLoadingPets } = usePetsStore();

  useEffect(() => {
    startLoadingPets(filtros, paginaActual);
  }, [filtros, paginaActual]);

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
            <p>Somos un equipo de personas impulsadas por el amor, el cariño y la empatía hacia las mascotas. Nuestro objetivo es transformar vidas — tanto de los animales como de las personas — creando un puente entre quienes buscan dar un hoga lleno de amor, dar segundas oportunidades, e inclusive tiempo y quienes necesitan un hogar.</p>
              
            <p>Creemos en la adopción responsable, en el valor del tránsito como oportunidad y en la construcción de una comunidad solidaria, donde cada acción cuenta para darles una segunda oportunidad a quienes más lo necesitan.</p>
          </div>
        </div>
      </section>

      <section className="home-banner">
        <p>
          ¿Quieres convertirte en su segunda oportunidad?<br />
          <strong>¡Conócelos!</strong>
        </p>
      </section>

      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-3">
            <FiltroSidebar filtros={filtros} setFiltros={setFiltros} />
          </aside>
          <main className="col-md-9">
            <div className="d-flex flex-wrap justify-content-center">
              {isLoading ? (
                <p>Cargando mascotas...</p>
              ) : (
                pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
              )}
            </div>

            <nav className="d-flex justify-content-center my-4">
              <ul className="pagination custom-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
};
