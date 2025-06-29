import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Header = ({ isAuthenticated }) => {
  const { user, startLogout } = useAuthStore();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    closeDropdown(); // cierro dropdown si estaba abierto
    setMenuAbierto(!menuAbierto);
  };

  const toggleDropdown = () => setDropdownAbierto(!dropdownAbierto);
  const closeDropdown = () => setDropdownAbierto(false);

  const handleLogout = () => {
    startLogout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    const handleScroll = () => {
      closeDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
export const Header = ({ isAuthenticated }) => {
  const { user, startLogout } = useAuthStore();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    closeDropdown(); // cierro dropdown si estaba abierto
    setMenuAbierto(!menuAbierto);
  };

  const toggleDropdown = () => setDropdownAbierto(!dropdownAbierto);
  const closeDropdown = () => setDropdownAbierto(false);

  const handleLogout = () => {
    startLogout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    const handleScroll = () => {
      closeDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src="/logobg.png"
              alt="Portal de Mascotas"
              className="logo-img"
            />
          </Link>
        </div>

        <div className="navbar-center">
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>

          <ul className={`navbar-links ${menuAbierto ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/nosotros" onClick={toggleMenu}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/jornadas" onClick={toggleMenu}>
                Jornadas
              </Link>
            </li>
            <li>
              <Link to="/donaciones" onClick={toggleMenu}>
                Donaciones
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={toggleMenu}>
                Contacto
              </Link>
            </li>

            {!isAuthenticated ? (
              <li>
                <Link to="/login" onClick={toggleMenu}>
                  Registro / Login
                </Link>
              </li>
            ) : (
              <>
                <li
                  className={`dropdown ${dropdownAbierto ? "open" : ""}`}
                  ref={dropdownRef}
                >
                  <button className="dropdown-toggle" onClick={toggleDropdown}>
                    Mi cuenta
                  </button>

                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to="/user/mis-publicaciones"
                        onClick={closeDropdown}
                      >
                        <FontAwesomeIcon icon={faBullhorn} /> Mis Publicaciones
                      </Link>
                    </li>
                    <li>
                      <Link to="/user/configuracion" onClick={closeDropdown}>
                        <FontAwesomeIcon icon={faGear} /> Configuración
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/aspectos-del-sistema"
                        onClick={closeDropdown}
                      >
                        <FontAwesomeIcon icon={faWrench} /> Aspecto del sistema
                      </Link>
                    </li>
                    <li>
                      <Link to="/user/publicar" onClick={closeDropdown}>
                        <FontAwesomeIcon icon={faBullhorn} /> Publicar Mascota
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/formulario-adopcion"
                        onClick={closeDropdown}
                      >
                        <FontAwesomeIcon icon={faFileAlt} /> Formulario de
                        Adopción
                      </Link>
                    </li>
                    <li>
                      <Link to="/user/mi-perfil" onClick={closeDropdown}>
                        <FontAwesomeIcon icon={faAddressCard} /> Mi Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-logout"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar
                        Sesión
                      </button>
                    </li>
                  </ul>
                </li>

                {user?.rol === "admin" && (
                  <li>
                    <Link to="/admin" onClick={toggleMenu}>
                      Panel Admin
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
