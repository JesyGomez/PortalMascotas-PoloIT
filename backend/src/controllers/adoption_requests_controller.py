from flask import request, jsonify
from src.utils.jwt import decode_token
from src.models.adoption_requests_model import guardar_solicitud


def create_adoption_request():
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

    result = guardar_solicitud(id_usuario, id_mascota)
    if result == "exists":
        return jsonify({"message": "Ya estás postulado para esta mascota"}), 409
    elif result:
        return jsonify({"message": "Solicitud de adopción registrada"}), 201
    else:
        return jsonify({"message": "Error al registrar solicitud"}), 500
