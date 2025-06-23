import React, { useState, useEffect } from "react";
import PetCard from "../components/petCard/PetCard";
import FiltroSidebar from "../components/filtroSidebar";
import Loader from "../components/Loader";
import "../estilos/home.css";

const Home = () => {
  const [mascotas, setMascotas] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();

    // Armamos query string con filtros múltiples
    Object.entries(filtros).forEach(([key, valores]) => {
      valores.forEach((valor) => queryParams.append(key, valor));
    });

    queryParams.append("page", paginaActual);
    queryParams.append("limit", 3);

    fetch(`http://localhost:5000/api/mascotas/?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMascotas(data.data || []);
        setTotalPaginas(data.total_pages || 1);
        setLoading(false);
      })
      .catch((err) => console.error("Error al cargar mascotas:", err));
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
          <img
            src="/corazonAmor.png"
            alt="Adoptar es un acto de amor"
            className="nosotros-corazon"
          />
          <div className="nosotros-caja">
            <h2>NOSOTROS</h2>
            <p>
              Somos un equipo de personas impulsadas por el amor, el cariño y la
              empatía hacia las mascotas...
            </p>
          </div>
        </div>
      </section>

      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-3">
            <FiltroSidebar filtros={filtros} setFiltros={setFiltros} />
          </aside>
          <main className="col-md-9">
          {loading ? (
            <Loader />
          ) : (
            <>
            <div className="d-flex flex-wrap justify-content-center">
              {mascotas.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>

            <nav className="d-flex justify-content-center my-4">
              <ul className="pagination custom-pagination">
                {Array.from({ length: totalPaginas }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      paginaActual === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPaginaActual(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
