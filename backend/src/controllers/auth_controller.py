from werkzeug.exceptions import BadRequest
from flask import request, jsonify
from models.user_model import get_user_by_email
from models.user_model import create_user
from utils.jwt import generate_token  # para devolver token
import bcrypt
import random
import string
from datetime import datetime, timedelta
from flask import request, jsonify
from models.user_model import get_user_by_email, update_user_password
from models.reset_model import save_reset_code, verify_reset_code
import bcrypt

def login():
    try:
        data = request.get_json()
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email y contraseña son requeridos'}), 400

        email = data.get('email')
        password = data.get('password')

        user = get_user_by_email(email)

        if user:
            # Convertir a bytes la password que vino por POST
            password_bytes = password.encode('utf-8')
            hashed_password = user['password'].encode('utf-8') if isinstance(user['password'], str) else user['password']

            # Comparar el password ingresado con el hash guardado
            if bcrypt.checkpw(password_bytes, hashed_password):
                token = generate_token(user['id'], user['rol'])  # devolver un JWT
                return jsonify({
                    'message': 'Login exitoso',
                    'token': token,
                    'nombre': user['nombre'],
                    'rol': user['rol']
                })
            else:
                return jsonify({'message': 'Contraseña incorrecta'}), 401
        else:
            return jsonify({'message': 'Usuario no encontrado'}), 404

    except Exception as e:
        print(f"[ERROR en login]: {e}")
        return jsonify({'message': 'Error interno del servidor', 'error': str(e)}), 500

def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'Datos de usuario requeridos'}), 400

        required_fields = ['email', 'password', 'nombre', 'apellido']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'message': f'El campo {field} es requerido'}), 400

        result = create_user(data)

        if not result['success']:
            return jsonify({'error': result.get('message', 'Error al registrar usuario')}), 400

        return jsonify({'message': 'Usuario registrado con éxito'}), 201
    
    except Exception as e:
        print(f"[ERROR en register]: {e}")
        return jsonify({'message': 'Error interno del servidor'}), 500


def request_password_reset():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'msg': 'Email requerido'}), 400

    user = get_user_by_email(email)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    code = ''.join(random.choices(string.digits, k=6))
    expires_at = datetime.now() + timedelta(minutes=10)

    save_reset_code(email, code, expires_at)

    print(f"[DEBUG] Código de verificación para {email}: {code}")  # simula envío de email

    return jsonify({'msg': 'Código enviado'}), 200


def reset_password():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    new_password = data.get('new_password')

    if not email or not code or not new_password:
        return jsonify({'msg': 'Todos los campos son requeridos'}), 400

    if not verify_reset_code(email, code):
        return jsonify({'msg': 'Código inválido o expirado'}), 400

    hashed = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    update_user_password(email, hashed)

    return jsonify({'msg': 'Contraseña actualizada correctamente'}), 200
