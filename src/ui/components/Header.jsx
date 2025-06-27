import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import "../styles/header.css";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Header = ({ isAuthenticated }) => {
  const { user, startLogout } = useAuthStore();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const closeDropdown = () => setShowDropdown(false);

  const handleLogout = () => {
    startLogout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
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
        <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li><Link to="/nosotros" onClick={toggleMenu}>Nosotros</Link></li>
        <li><Link to="/jornadas" onClick={toggleMenu}>Jornadas</Link></li>
        <li><Link to="/donaciones" onClick={toggleMenu}>Donaciones</Link></li>
        <li><Link to="/contacto" onClick={toggleMenu}>Contacto</Link></li>

        {!isAuthenticated ? (
          <li><Link to="/login" onClick={toggleMenu}>Registro / Login</Link></li>
        ) : (
          <>
            <li className="dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                Mi cuenta
              </button>

              {showDropdown && (
                <ul className="dropdown-menu">
                  <li><Link to="/user/mis-publicaciones" onClick={closeDropdown}><FontAwesomeIcon icon={faBullhorn} /> Mis Publicaciones</Link></li>
                  <li><Link to="/user/configuracion" onClick={closeDropdown}><FontAwesomeIcon icon={faGear} /> Configuración</Link></li>
                  <li><Link to="/user/aspectos-del-sistema" onClick={closeDropdown}><FontAwesomeIcon icon={faWrench} /> Aspecto del sistema</Link></li>
                  <li><Link to="/user/publicar" onClick={closeDropdown}><FontAwesomeIcon icon={faBullhorn} /> Publicar Mascota</Link></li>
                  <li><Link to="/user/formulario-adopcion" onClick={closeDropdown}><FontAwesomeIcon icon={faFileAlt} /> Formulario de Adopción</Link></li>
                  <li><Link to="/user/mi-perfil" onClick={closeDropdown}><FontAwesomeIcon icon={faAddressCard} /> Mi Perfil</Link></li>
                  <li><button onClick={handleLogout} className="dropdown-logout"><FontAwesomeIcon icon={faRightFromBracket} /> Cerrar Sesión</button></li>
                </ul>
              )}
            </li>

            {user?.rol === "admin" && (
              <li className="admin-link">
                <Link to="/admin" onClick={toggleMenu}>Panel Admin</Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};
