import React from 'react'
import RegistroMascota from './RegistroMascotas'
import "../styles/publicar-mascota.css";

export const PublicarMascota = ()=> {
  return (
    <div className="publicar-wrapper">
      <h1 className="publicar-titulo">¡Publicá una Mascota en Adopción! 🐶🐱</h1>
      <p className="publicar-subtitulo">
        Completá el formulario con los datos de tu mascota y ayudala a encontrar un nuevo hogar lleno de amor.
      </p>
      <div className="publicar-contenido">
        <RegistroMascota />
      </div>
    </div>
  )
}
