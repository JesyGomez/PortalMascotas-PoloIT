import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Login, Registro, RecuperarContrasenia } from "../Auth";
import { PrivateRoute } from "../components";
import { useSelector } from "react-redux";
import { MainRouter } from "../Main/routes";
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = ()=> {
  const {checkAuthToken, status} = useAuthStore();
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    checkAuthToken()
  }, [])
  

  return (
    <>
      <Header isAuthenticated={isAuthenticated}/>
      <main>
        <Routes>
          <Route path="/*" element={<MainRouter isAuthenticated={isAuthenticated}/>} />

          {!isAuthenticated && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
            </>
          )}

          <Route path="/recuperar" element={<RecuperarContrasenia />} />

         
        </Routes>
      </main>
      <Footer />
    </>
  );
}








//  <Route
//             path="/admin/dashboard"
//             element={
//               <PrivateRoute rolesAllowed={['user']}>
//                 <div><h2>Panel de Admin</h2></div>
//               </PrivateRoute>
//             }
//           />