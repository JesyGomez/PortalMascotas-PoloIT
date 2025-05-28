import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; 
import '../estilos/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section footer-brand">
          <Link to="/" className="footer-logo">Portal de Mascotas 🐾</Link>
          <p className="footer-slogan">Tu mejor amigo te esta esperando!</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/tupaginadefacebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/tucuentaoficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/tucuentaoficial" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="footer-section footer-links">
          <h3>Navegación</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/adopciones">Adopciones</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/login">Mi Cuenta</Link></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h3>Contacto</h3>
          <p><FaMapMarkerAlt /> Calle Ficticia 123, Buenos Aires, Argentina</p>
          <p><FaPhone /> +54 9 11 1234 5678</p>
          <p><FaEnvelope /> info@portaldemascotas.com.ar</p>
        </div>

        <div className="footer-section footer-map">
          <h3>Dónde Encontrarnos</h3>
         <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13134.40939023069!2d-58.852431799999995!3d-34.61332765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc8f5539f3796d%3A0xc49d37e2a225301a!2sMarcos%20Paz%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1716382025123!5m2!1ses-419!2sar"
            width="100%" // Para que sea responsive
            height="250" // Altura fija
            style={{ border: 0, borderRadius: '10px' }} 
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de nuestra tienda" 
          ></iframe>
          <p>Visítanos o encuéntranos en Google Maps.</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Portal de Mascotas 🐾 - Todos los derechos reservados.</p>
        <p>Hecho con ❤️ para los amantes de las mascotas</p>
      </div>
    </footer>
  );
}

export default Footer;