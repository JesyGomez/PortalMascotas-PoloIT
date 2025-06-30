from flask import Flask
from flask_cors import CORS
from src.config import config
from src.routes.auth_routes import auth_bp
from src.routes.pet_routes import pet_bp
from src.routes.admin_routes import admin_bp
from src.routes.analytics_routes import analytics_bp
from src.routes.favorites_routes import favorites_bp
from src.routes.adoption_routes import adoption_requests_bp
from src.routes.chat_routes import chat_bp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object(config['development'])

CORS(app)

# Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(analytics_bp,url_prefix='/api/analytics')
app.register_blueprint(pet_bp, url_prefix='/api/mascotas')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(favorites_bp, url_prefix="/api/favoritos")
app.register_blueprint(adoption_requests_bp, url_prefix="/api/adopciones")
app.register_blueprint(chat_bp, url_prefix="/api/chat")

@app.route('/')
def home():
    return "Servidor Flask funcionando. Usa las rutas /api/register etc."

if __name__ == '__main__':
    app.run(debug=True, port=5000)
