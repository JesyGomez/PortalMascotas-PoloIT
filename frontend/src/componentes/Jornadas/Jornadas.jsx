import './jornadas.css';
const Jornadas = () => {
    return (
        <section className="jornadas">
        <img src="../src/images/mascotas.png" alt="Gatos y Perros" className="jornadas-imagen" />

        <div className="jornadas-calendario">
            <img src="../src/images/calendario.png" alt="calendario" className='jornadas-calendario' />
        </div>

        <div className="jornadas-texto">
            <p>Próximamente estaremos trabajando para agregar información al respecto</p>
            <p>¡Una jornada de adopción estará pronto en camino!</p>
            <p>🐈 ¡No te pierdas de nuestros próximos eventos y campañas! 🐕</p>
        </div>
        </section>
    );
};

export default Jornadas;