import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faGear,
  faBullhorn,
  faWrench,
  faAddressCard,
  faFileAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../components/context/AuthContext";
import "../estilos/header.css";

const Header = () => {
  const { rol, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  // Ref para detectar click afuera
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  // Hook para cerrar dropdown si clickeo fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

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

      <button className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <ul className={`navbar-links ${menuAbierto ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuAbierto(false)}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/nosotros" onClick={() => setMenuAbierto(false)}>
            Nosotros
          </Link>
        </li>
        <li>
          <Link to="/jornadas" onClick={() => setMenuAbierto(false)}>
            Jornadas
          </Link>
        </li>
        <li>
          <Link to="/donaciones" onClick={() => setMenuAbierto(false)}>
            Donaciones
          </Link>
        </li>
        <li>
          <Link to="/contacto" onClick={() => setMenuAbierto(false)}>
            Contacto
          </Link>
        </li>

        {!rol ? (
          <li>
            <Link to="/login" onClick={() => setMenuAbierto(false)}>
              Registro / Login
            </Link>
          </li>
        ) : (
          <>
            <li className="dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                Mi cuenta
              </button>

              {showDropdown && (
                <ul className="dropdown-menu">
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
              <li className="admin-link">
                <Link to="/admin" onClick={() => setMenuAbierto(false)}>
                  Panel Admin
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
