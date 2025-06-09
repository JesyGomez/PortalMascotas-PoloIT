import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Registro from "./pages/auth/Registro";
import Adopciones from "./pages/Adopciones";
import RegistroMascota from "./pages/RegistroMascotas";
import AdminPage from "./pages/AdminPage";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";
import RecuperarContrasenia from "./pages/auth/RecuperarContrasenia";

function App() {
  const { rol } = useContext(AuthContext); // 👈🏼

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={rol === "admin" ? <AdminPage /> : <Navigate to="/" />}
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar" element={<RecuperarContrasenia />} />
          <Route path="/registro-mascota" element={<RegistroMascota />} />
          <Route path="/adopciones" element={<Adopciones />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

