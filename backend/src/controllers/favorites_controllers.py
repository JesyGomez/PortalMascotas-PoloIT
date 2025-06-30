from flask import request, jsonify
from src.utils.jwt import decode_token
from src.models.favorites_model import agregar_favorito, quitar_favorito, obtener_favoritos

def add_favorite():
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        return jsonify({"message": "Token requerido"}), 401

    token = auth.split(" ")[1]
    try:
        user_data = decode_token(token)
        id_usuario = user_data.get("user_id")
    except:
        return jsonify({"message": "Token inválido"}), 401

    data = request.get_json()
    id_mascota = data.get("id_mascota")

    if not id_mascota:
        return jsonify({"message": "ID de mascota requerido"}), 400

    success = agregar_favorito(id_usuario, id_mascota)
    if success:
        return jsonify({"message": "Mascota agregada a favoritos"}), 201
    else:
        return jsonify({"message": "Error al agregar favorito"}), 500
    
def remove_favorite(id_mascota):
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        return jsonify({"message": "Token requerido"}), 401

    token = auth.split(" ")[1]
    try:
        user_data = decode_token(token)
        id_usuario = user_data.get("user_id")
    except:
        return jsonify({"message": "Token inválido"}), 401

    if not id_mascota:
        return jsonify({"message": "ID de mascota requerido"}), 400

    success = quitar_favorito(id_usuario, id_mascota)
    if success:
        return jsonify({"message": "Mascota eliminada de favoritos"}), 200
    else:
        return jsonify({"message": "Error al quitar favorito"}), 500

def get_favorites():
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        return jsonify({"message": "Token requerido"}), 401

    token = auth.split(" ")[1]
    try:
        user_data = decode_token(token)
        id_usuario = user_data.get("user_id")
    except:
        return jsonify({"message": "Token inválido"}), 401

    favoritos = obtener_favoritos(id_usuario)
    return jsonify(favoritos), 200
