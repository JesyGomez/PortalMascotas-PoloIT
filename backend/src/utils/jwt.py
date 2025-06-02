import jwt
from datetime import datetime, timedelta
from flask import current_app, request, jsonify
from functools import wraps

def generate_token(user_id, rol):
    payload = {
        'user_id': user_id,
        'rol': rol,
        'exp': datetime.utcnow() + timedelta(hours=24)  # token válido 24h
    }
    token = jwt.encode(payload, current_app.config['JWT_SECRET'], algorithm='HS256')
    return token

def decode_token(token):
    try:
        payload = jwt.decode(token, current_app.config['JWT_SECRET'], algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise Exception('Token expirado')
    except jwt.InvalidTokenError:
        raise Exception('Token inválido')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')

        if auth_header:
            parts = auth_header.split()
            if len(parts) == 2 and parts[0].lower() == 'bearer':
                token = parts[1]

        if not token:
            return jsonify({'message': 'Token es requerido'}), 401

        try:
            payload = decode_token(token)
            # Si querés, podés guardar info en flask.g para usar en la ruta
            # from flask import g
            # g.user_id = payload['user_id']
            # g.rol = payload['rol']
        except Exception as e:
            return jsonify({'message': str(e)}), 401

        return f(*args, **kwargs)
    return decorated
