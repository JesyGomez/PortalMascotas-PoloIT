import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Registro from './componentes/registro/registro';
import Sesion from './componentes/Sesion/Sesion';
import Inicio from './componentes/Inicio/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="navmenu">
        <img src="#" alt="logo" className='logo'/>
        <div className="menu">
          <Link className="nav-link" to="/">Inicio</Link>
          <Link className="nav-link" to="/catalogo">Catálogo</Link>
        </div>
        <div className='buscador'>
          <input type="text" placeholder='Buscar' className='barra'/>
          <button className='boton-barra'>Buscar</button>
        </div>
        <div className="sesion">
          <Link className="nav-link" to="/registro">Registrar Mascota</Link>
          <Link className="nav-link" to="/sesion">Crear Cuenta</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/sesion" element={<Sesion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


