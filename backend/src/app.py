from flask import Flask
from flask_cors import CORS
from config import config
from routes.auth_routes import auth_bp
from routes.pet_routes import pet_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(config['development'])  # ← Esto carga DevelopmentConfig

CORS(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/')
def home():
    return "Servidor Flask funcionando. Usa las rutas /api/register etc."

app.register_blueprint(pet_bp, url_prefix='/api')


if __name__ == '__main__':
    app.run(debug=True, port=5000)

