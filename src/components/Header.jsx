// Header.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { rol, nombre, logout } = useContext(AuthContext);
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
          <Link to="/jornadas">Jornadas</Link>
        </li>
        <li>
          <Link to="/donaciones">Donaciones</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>

        {!rol ? (
          <li>
            <Link to="/login">Registro / Login</Link>
          </li>
        ) : (
          <>
            <li className="dropdown" onMouseLeave={closeDropdown}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                Mi cuenta
              </button>

              {showDropdown && (
                <ul
                  className={`dropdown-menu ${
                    showDropdown ? "visible" : "hidden"
                  }`}
                >
                  <li>
                    <Link to="/mis-publicaciones" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faBullhorn} /> Mis Publicaciones
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuracion" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faGear} /> Configuración
                    </Link>
                  </li>
                  <li>
                    <Link to="/aspectos-del-sistema" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faWrench} /> Aspecto del sistema
                    </Link>
                  </li>
                  <li>
                    <Link to="/publicar" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faBullhorn} /> Publicar Mascota
                    </Link>
                  </li>
                  <li>
                    <Link to="/formulario-adopcion" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faFileAlt} /> Formulario de
                      Adopción
                    </Link>
                  </li>
                  <li>
                    <Link to="/mi-perfil" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faAddressCard} /> Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="dropdown-logout">
                      <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar
                      Sesión
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
