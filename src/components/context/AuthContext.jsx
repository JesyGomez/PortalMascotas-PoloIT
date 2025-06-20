import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 nuevo estado
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/auth/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Token inválido");
          return res.json();
        })
        .then((data) => {
          setUsuario(data);
          localStorage.setItem("nombre", data.nombre);
          localStorage.setItem("rol", data.rol);
        })
        .catch((err) => {
          console.error("Error cargando usuario:", err);
          logout(); // Limpieza si el token es inválido
        })
        .finally(() => {
          setLoading(false); // ✅ una vez terminado
        });
    } else {
      setLoading(false); // ✅ sin token también termina de cargar
    }
  }, []);

const login = (usuarioCompleto, token) => {
  localStorage.setItem("token", token);
  
  // ⚠️ NO usamos directamente usuarioCompleto porque puede estar incompleto
  fetch("http://localhost:5000/api/auth/user-info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setUsuario(data);
      localStorage.setItem("nombre", data.nombre);
      localStorage.setItem("rol", data.rol);
    });
};

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        rol: usuario?.rol || null,
        nombre: usuario?.nombre || null,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
