import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../estilos/header.css";

const Header = ({ isAuthenticated, onLogout, currentUser }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🐾 Portal de Mascotas</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/adopciones">Adopciones</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>

      <div className="navbar-icons">
        {isAuthenticated ? (
          <>
            <span className="user-saludo">👋 ¡Hola, {currentUser}!</span>
            <button onClick={onLogout} title="Cerrar sesión" className="logout-icon">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </>
        ) : (
          <Link to="/login" title="Iniciar sesión" className="login-button">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
