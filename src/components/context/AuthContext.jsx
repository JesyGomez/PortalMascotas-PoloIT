import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [rol, setRol] = useState(null);
  const [nombre, setNombre] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRol = localStorage.getItem("rol");
    const savedNombre = localStorage.getItem("nombre");
    if (savedRol) setRol(savedRol);
    if (savedNombre) setNombre(savedNombre);
  }, []);

  const login = (nombreUsuario, rolUsuario) => {
    setNombre(nombreUsuario);
    setRol(rolUsuario);
    localStorage.setItem("nombre", nombreUsuario);
    localStorage.setItem("rol", rolUsuario);
  };

  const logout = () => {
    setRol(null);
    setNombre(null);
    localStorage.removeItem("rol");
    localStorage.removeItem("nombre");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ rol, nombre, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
