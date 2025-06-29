from flask import Flask
from flask_cors import CORS
from src.config import config
from src.routes.auth_routes import auth_bp
from src.routes.pet_routes import pet_bp
from src.routes.admin_routes import admin_bp
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config.from_object(config['development'])  # ← Esto carga DevelopmentConfig

CORS(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
@app.route('/')
def home():
    return "Servidor Flask funcionando. Usa las rutas /api/register etc."

# app.register_blueprint(pet_bp, url_prefix='/api')

app.register_blueprint(pet_bp, url_prefix='/api/mascotas') 
app.register_blueprint(admin_bp, url_prefix='/api/admin') 

if __name__ == '__main__':
    app.run(debug=True, port=5000)
