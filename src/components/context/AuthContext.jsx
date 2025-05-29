import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [rol, setRol] = useState(localStorage.getItem("rol") || null);
  const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem("nombreUsuario") || null);

  // Guardar en localStorage cuando cambia
  useEffect(() => {
    if (rol) localStorage.setItem("rol", rol);
    if (nombreUsuario) localStorage.setItem("nombreUsuario", nombreUsuario);
  }, [rol, nombreUsuario]);

  const login = (nombre, rol) => {
    setNombreUsuario(nombre);
    setRol(rol);
  };

  const logout = () => {
    setNombreUsuario(null);
    setRol(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ rol, nombreUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
