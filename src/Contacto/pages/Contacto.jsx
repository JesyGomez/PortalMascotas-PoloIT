import React from 'react'
import '../../styles/contacto.css';

export const Contacto = ()=> {
  return (
    <div className="contacto-container">
      <div className="contacto-img">
        <img src="/perroGato.png" alt="Perro y gato" />
      </div>
      <div className="contacto-info">
        <h2>SEGUINOS EN NUESTRAS<br />REDES SOCIALES</h2>
        <div className="redes-sociales">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.png" alt="Instagram" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.png" alt="Facebook" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src="/xtwitter.png" alt="X (Twitter)" />
          </a>
        </div>
        <img src="/logobg.png" alt="Patitas En Casa" className="logo-contacto" />
      </div>
    </div>
  )
}
