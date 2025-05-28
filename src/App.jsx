import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Registro from './pages/auth/Registro';
import Adopciones from './pages/Adopciones';
import RegistroMascota from './pages/RegistroMascotas';
function App() {
  return (
    <>
    <Header />

    <main>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/registro-mascota" element={<RegistroMascota />} />
            <Route path="/adopciones" element={<Adopciones />} />
          </Routes>
    </main>
      <Footer />
    </>
  );
}

export default App;
