from flask import request, jsonify
from utils.jwt import decode_token
from models.pet_model import insert_pet

def register_pet():
    auth_header = request.headers.get('Authorization')
    print("Authorization header:", auth_header)

    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token no proporcionado'}), 401

    token = auth_header.split(" ")[1]  # <-- acá sacás el token

    try:
        user_data = decode_token(token)
    except Exception as e:
        return jsonify({"error": "Token inválido"}), 401

    if not user_data:
        return jsonify({'message': 'Token inválido'}), 401

    user_id = user_data.get('user_id')

    data = request.get_json()

    required_fields = ['nombre', 'especie', 'raza', 'edad', 'sexo', 'imagen_url', 'estado', 'salud', 'tamanio', 'ubicacion', 'info_adicional']

    for field in ['nombre', 'especie']:
        if not data.get(field):
            return jsonify({'message': f'Campo {field} requerido'}), 400

    mascota_data = {field: data.get(field) for field in required_fields}

    result = insert_pet(mascota_data, user_id)

    if not result['success']:
        return jsonify({'message': result['message']}), 500

    return jsonify({'message': 'Mascota registrada con éxito'}), 201
