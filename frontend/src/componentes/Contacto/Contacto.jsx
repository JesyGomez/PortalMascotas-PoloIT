import './contacto.css';
const Contacto = () => {
    return (
        <section className="contacto">
        <div className="contacto-imagen">
            <img src="../src/images/contacto.png" alt="Perro y gato" />
        </div>

        <div className="contacto-datos">
            <p className="contacto-titulo">SEGUINOS EN NUESTRAS<br />REDES SOCIALES</p>

            <div className="contacto-redes">
            <a href=""><img src="../src/images/instagram.png" alt="Instagram" /></a>
            <a href=""><img src="../src/images/facebook.png" alt="Facebook" /></a>
            <a href=""><img src="../src/images/twitter.png" alt="X (Twitter)" /></a>
            </div>

            <div className="contacto-logo">
            <img src="../src/images/logo.png" alt="Patitas En Casa" />
            </div>
        </div>
        </section>
    );
};

export default Contacto;