import React from 'react'
import '../../styles/donaciones.css';

export const Donaciones = ()=> {
  return (
    <div className="donaciones-container">
      <div className="donaciones-img-section">
        <img src="/perritoCorazon.png" alt="Perrito con manos en forma de corazón" />
      </div>

      <div className="donaciones-info">
        <p className="donaciones-text">
          Tus donaciones nos ayudan a proporcionarle alimento, atención médica y refugio a todas las mascotas
        </p>

        <img src="/mercadoPago.png" alt="Logo de Mercado Pago" className="mercado-logo" />
        <p className="donaciones-alias">ALIAS: PATITASENCASA.MP</p>
        <hr className="donaciones-linea" />

        <button className="donaciones-btn">DONÁ AHORA</button>
      </div>
    </div>
  )
}

