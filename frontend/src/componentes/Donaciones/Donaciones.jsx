import './donaciones.css';
const Donaciones = () => {
    return (
        <section className="donaciones">
        <div className="donaciones-imagen">
            <img src="../src/images/perrito-donacion.png" alt="Perrito en forma de corazón" />
        </div>

        <div className="donaciones-contenido">
            <p className="donaciones-texto">
            Tus donaciones nos ayudan a proporcionarle alimento, atención médica y refugio a todas las mascotas
            </p>

            <div className="donaciones-logo">
            <img src="../src/images/mercado-pago-logo.png" alt="Mercado Pago" />
            </div>

            <p className="donaciones-alias">ALIAS: PATITASENCASA.MP</p>

            <hr className="donaciones-linea" />

            <button className="donaciones-boton">DONÁ AHORA</button>
        </div>
        </section>
    );
};

export default Donaciones;