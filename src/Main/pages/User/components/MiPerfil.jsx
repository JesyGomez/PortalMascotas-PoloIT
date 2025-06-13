import React from 'react';
import '../estilos/mi-perfil.css';

function MiPerfil() {
  // Datos simulados, podés conectar con el backend después
  const usuario = {
    nombre: 'Jesy Gomez',
    email: 'jesy@email.com',
    ciudad: 'San Luis',
    publicaciones: 3,
    adopciones: 1,
    foto: '' // Acá iría la URL si hay foto
  };

  return (
    <div className="perfil-wrapper">
      <div className="perfil-card">
        <div className="perfil-foto">
          {usuario.foto ? (
            <img src={usuario.foto} alt="Foto de perfil" />
          ) : (
            <div className="icono-usuario">👩‍💻</div>
          )}
        </div>
        <h2>{usuario.nombre}</h2>
        <p>Email: {usuario.email}</p>
        <p>Ciudad: {usuario.ciudad}</p>

        <div className="perfil-estadisticas">
          <div>
            <strong>{usuario.publicaciones}</strong>
            <span>Publicaciones</span>
          </div>
          <div>
            <strong>{usuario.adopciones}</strong>
            <span>Adopciones</span>
          </div>
        </div>

        <div className="perfil-botones">
          <button>Editar Perfil</button>
          <button className="cerrar-sesion">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}

export default MiPerfil;
