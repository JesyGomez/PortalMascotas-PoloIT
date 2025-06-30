import React from 'react'
import '../../styles/jornadas.css';


function Jornadas() {
  return (
    <div className="jornadas-container">
      <img src="/mascotas4.png" alt="Mascotas asomadas" className="mascotas-img" />

      <img src="/calendarCheck.png" alt="Calendario" className="calendar-icon" />

      <p className="jornadas-text bold">
        Próximamente estaremos trabajando para agregar información al respecto
      </p>

      <p className="jornadas-text">¡Una jornada de adopción estará pronto en camino!</p>

      <p className="jornadas-text">
        <span role="img" aria-label="gato">🐱</span> 
        ¡No te pierdas de nuestros próximos eventos y campañas! 
        <span role="img" aria-label="perro">🐶</span>
      </p>
    </div>
  )
}

export default Jornadas
