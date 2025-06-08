import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faGear,
  faBullhorn,
  faWrench,
  faAddressCard,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../components/context/AuthContext";
import "../estilos/header.css";

const Header = () => {
  const { rol, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="/logoPatitasencasa.jpeg"
            alt="Portal de Mascotas"
            className="logo-img"
          />
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/nosotros">Nosotros</Link>
        </li>
        <li>
          <Link to="/adopciones">Jornadas</Link>
        </li>
        <li>
          <Link to="/donaciones">Donaciones</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>

        <li className="dropdown" onMouseLeave={closeDropdown}>
          <button
            onClick={() => {
              if (!rol) {
                window.location.href = "/login?redirect=mi-cuenta";
              } else {
                toggleDropdown();
              }
            }}
            className="dropdown-btn"
          >
            Mi cuenta ▾
          </button>

          {showDropdown && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/mis-publicaciones" onClick={closeDropdown}>
                  <FontAwesomeIcon icon={faBullhorn} /> Mis publicaciones
                </Link>
              </li>
              <li>
                <Link to="/configuracion" onClick={closeDropdown}>
                  <FontAwesomeIcon icon={faGear} /> Configuración
                </Link>
              </li>
              <li>
                <Link to="/aspectos-del-sistema" onClick={closeDropdown}>
                  <FontAwesomeIcon icon={faWrench} /> Aspectos del sistema
                </Link>
              </li>
              <li>
                <Link to="/aspectos-del-sistema" onClick={closeDropdown}>
                  <FontAwesomeIcon icon={faBullhorn} /> Publicar Mascotas
                </Link>
              </li>
              <li>
                <Link to="/aspectos-del-sistema" onClick={closeDropdown}>
                  <FontAwesomeIcon icon={faFileAlt} /> Formulario de Adopción
                </Link>
              </li>
              <li>
                <Link to="/mi-perfil" onClick={closeDropdown}>
                  <FontAwesomeIcon icon={faAddressCard} /> Mi perfil
                </Link>
              </li>
              <li>
                <button onClick={logout} className="dropdown-logout">
                  <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión
                </button>
              </li>
            </ul>
          )}
        </li>

        {rol === "admin" && (
          <li>
            <Link to="/admin">Panel Admin</Link>
          </li>
        )}
      </ul>

      <div className="navbar-icons">
        <>
          <Link to="/publicar" className="btn-publicar">
            <span className="linea-arriba">Publicar</span>
            <span className="linea-abajo">Mascotas</span>
          </Link>
        </>
      </div>
    </nav>
  );
};

export default Header;
