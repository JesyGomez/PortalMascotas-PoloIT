import { useState, useEffect } from 'react';
import '../styles/dashboard.css';

export const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    // Simulación de solicitudes recibidas por email (modo demo)
    const solicitudesFalsas = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com' },
      { id: 2, nombre: 'Ana Gómez', email: 'ana@email.com' }
    ];
    setSolicitudes(solicitudesFalsas);
  }, []);

  return (
    <>
      <h2>
        Solicitudes de Adopción 📝
        <span className="badge bg-primary ms-2">{solicitudes.length}</span>
      </h2>
      <div className="alert alert-info mt-3">
        Las solicitudes de adopción se reciben por email. Por favor, revisá la casilla oficial del refugio para ver nuevas solicitudes.
      </div>
    </>
  );
};
// import { useEffect } from 'react';
// import '../styles/dashboard.css';
// import { useAdminStore } from '../../hooks/useAdminStore';

// export const Solicitudes = () => {
//   const {
//     solicitudes,
//     isLoading,
//     loadSolicitudes,
//     updateSolicitudEstado,
//     deleteSolicitud,
//   } = useAdminStore();

//   useEffect(() => {
//     loadSolicitudes();
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <h2>Solicitudes de Adopción 📝</h2>

//       {isLoading ? (
//         <p>Cargando solicitudes...</p>
//       ) : (
//         <table className="crud-table">
//           <thead>
//             <tr>
//               <th>Nombre</th>
//               <th>Email</th>
//               <th>Motivo</th>
//               <th>Estado</th>
//               <th>Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {solicitudes.map((sol) => (
//               <tr key={sol.id}>
//                 <td>{sol.nombre}</td>
//                 <td>{sol.email}</td>
//                 <td>{sol.motivo}</td>
//                 <td>
//                   <select
//                     value={sol.estado}
//                     onChange={(e) =>
//                       updateSolicitudEstado(sol.id, e.target.value)
//                     }
//                   >
//                     <option value="pendiente">Pendiente</option>
//                     <option value="en_revision">En Revisión</option>
//                     <option value="aprobada">Aprobada</option>
//                     <option value="rechazada">Rechazada</option>
//                   </select>
//                 </td>
//                 <td>
//                   <button onClick={() => deleteSolicitud(sol.id)}>
//                     Eliminar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };
