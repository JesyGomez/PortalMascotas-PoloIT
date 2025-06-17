from flask import request, jsonify
from db import get_db_connection
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

def get_user_pets():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token no proporcionado'}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = decode_token(token)
    except Exception as e:
        return jsonify({'message': 'Token inválido'}), 401

    user_id = user_data.get('user_id')
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT id, nombre, edad, estado, imagen_url FROM mascotas WHERE id_usuario = %s"
        cursor.execute(query, (user_id,))
        mascotas = cursor.fetchall()
        return jsonify(mascotas), 200
    except Exception as e:
        return jsonify({'message': f'Error al obtener mascotas: {str(e)}'}), 500

# obtengo todas las mascotas (para admin)
def get_all_pets():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT id, nombre, especie, raza, edad, sexo, imagen_url, estado, salud, tamanio, ubicacion, info_adicional
            FROM mascotas
        """
        cursor.execute(query)
        mascotas = cursor.fetchall()
        return jsonify(mascotas), 200
    except Exception as e:
        return jsonify({'message': f'Error al obtener mascotas: {str(e)}'}), 500

from flask import request, jsonify
from utils.jwt import decode_token

def update_pet(pet_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token no proporcionado'}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = decode_token(token)
    except Exception:
        return jsonify({'message': 'Token inválido'}), 401

    data = request.get_json()
    # Validar que data no sea None
    if not data:
        return jsonify({'message': 'No hay datos para actualizar'}), 400

    # Validar campos mínimos para no fallar con KeyError
    required_fields = ['nombre', 'especie']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'Campo {field} requerido para actualizar'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        UPDATE mascotas SET
            nombre = %s,
            especie = %s,
            raza = %s,
            edad = %s,
            sexo = %s,
            imagen_url = %s,
            estado = %s,
            salud = %s,
            tamanio = %s,
            ubicacion = %s,
            info_adicional = %s
        WHERE id = %s
        """

        cursor.execute(query, (
            data['nombre'],
            data['especie'],
            data.get('raza'),
            data.get('edad'),
            data.get('sexo', 'desconocido'),
            data.get('imagen_url'),
            data.get('estado', 'disponible'),
            data.get('salud'),
            data.get('tamanio'),
            data.get('ubicacion'),
            data.get('info_adicional'),
            pet_id
        ))

        conn.commit()
        return jsonify({'message': 'Mascota actualizada con éxito'}), 200
    except Exception as e:
        print(f"[ERROR update_pet]: {e}")  # Loguea el error para debug
        return jsonify({'message': f'Error al actualizar mascota: {str(e)}'}), 500

def get_pet(pet_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Token no proporcionado'}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = decode_token(token)
    except Exception:
        return jsonify({'message': 'Token inválido'}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)  # Para obtener dicts
        cursor.execute('SELECT * FROM mascotas WHERE id = %s', (pet_id,))
        mascota = cursor.fetchone()
        if not mascota:
            return jsonify({'message': 'Mascota no encontrada'}), 404
        return jsonify(mascota), 200
    except Exception as e:
        print(f"[ERROR get_pet]: {e}")
        return jsonify({'message': 'Error al obtener mascota'}), 500


def delete_pet(pet_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM mascotas WHERE id = %s", (pet_id,))
        conn.commit()
        return jsonify({'message': 'Mascota eliminada con éxito'}), 200
    except Exception as e:
        return jsonify({'message': f'Error al eliminar mascota: {str(e)}'}), 500