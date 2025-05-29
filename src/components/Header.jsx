import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../components/context/AuthContext";
import "../estilos/header.css";

const Header = () => {
  const { nombreUsuario, rol, logout } = useContext(AuthContext);

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

        {rol === "admin" && (
          <li><Link to="/admin">Panel Admin</Link></li>
        )}
      </ul>

      <div className="navbar-icons">
        {nombreUsuario ? (
          <>
            <span className="user-saludo">👋 ¡Hola, {nombreUsuario}!</span>
            <button onClick={logout} title="Cerrar sesión" className="logout-icon">
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
