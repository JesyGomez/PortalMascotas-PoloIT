import { Routes, Route} from "react-router-dom";
import { useContext } from "react";
import {Adopciones, Donaciones, Home, Nosotros, Contacto} from "../pages";
import { UserRouter } from "../pages/User/routes";

export const MainRouter = ({isAuthenticated})=> {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/donaciones" element={<Donaciones />} />
            <Route path="/adopciones" element={<Adopciones />} />
            <Route path="/contacto" element={<Contacto />} />
            {
              isAuthenticated&&(
                <Route path="/user/*" element={<UserRouter/>} />
              )
            }
        </Routes>
    </>
  );
}