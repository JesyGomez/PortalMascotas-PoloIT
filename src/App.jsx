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
import Donaciones from "./pages/Donaciones";
import Jornadas from "./pages/Jornadas";
import MiCuenta from "./pages/MiCuenta";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import MisPublicaciones from "./pages/MisPublicaciones";
import Configuracion from "./pages/Configuracion";
import AspectosSistema from "./pages/AspectosSistema";
import PublicarMascota from "./pages/PublicarMascota";
import FormularioAdopcion from "./pages/FormularioAdopcion";
import MiPerfil from "./pages/MiPerfil";
function App() {
  const { rol } = useContext(AuthContext);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route
            path="/admin/*"
            element={rol === "admin" ? <AdminPage /> : <Navigate to="/" />}
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar" element={<RecuperarContrasenia />} />
          <Route path="/registro-mascota" element={<RegistroMascota />} />
          <Route path="/donaciones" element={<Donaciones />} />
          <Route path="/Jornadas" element={<Jornadas />} />
          <Route path="/mi-cuenta" element={<MiCuenta />} />
          <Route path="/mis-publicaciones" element={<MisPublicaciones />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/aspectos-del-sistema" element={<AspectosSistema />} />
          <Route path="/publicar" element={<PublicarMascota />} />
          <Route path="/formulario-adopcion" element={<FormularioAdopcion />} />
          <Route path="/mi-perfil" element={<MiPerfil />} />
          <Route path="/adopciones" element={<Adopciones />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
