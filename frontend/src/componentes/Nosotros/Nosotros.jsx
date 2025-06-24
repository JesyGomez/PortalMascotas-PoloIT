import './Nosotros.css';

const Nosotros = () => {
    return (
        <section className="nosotros">
            <div className="corazon">
                <img src="../src/images/corazon.png" alt="corazon" className='corazon'/>
            </div>

            <div className="bloque-texto">
                <h2>NOSOTROS</h2>
                <p>
                Somos un equipo de personas impulsadas por el amor, el cariño y la empatía hacia las
                mascotas. Nuestro objetivo es transformar vidas — tanto de los animales como de las
                personas — creando un puente entre quienes buscan dar un hogar lleno de amor, dar
                segundas oportunidades, e inclusive tiempo y quienes necesitan un hogar.
                </p>
                <p>
                Creemos en la adopción responsable, en el valor del tránsito como oportunidad y en la
                construcción de una comunidad solidaria, donde cada acción cuenta para darles una
                segunda oportunidad a quienes más lo necesitan.
                </p>
            </div>
        </section>
    );
    };

export default Nosotros;

