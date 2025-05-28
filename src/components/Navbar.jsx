import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#ffe5d9' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <li><Link to="/registro">Registrar Mascota</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
    </nav>
  );
};

export default Navbar;
