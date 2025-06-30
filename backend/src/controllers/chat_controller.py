from flask import request, jsonify
from src.utils.jwt import decode_token
from src.models.chat_model import guardar_mensaje, obtener_mensajes

def crear_mensaje():
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        return jsonify({"message": "Token requerido"}), 401

    token = auth.split(" ")[1]
    try:
        user_data = decode_token(token)
        id_usuario = user_data["user_id"]
    except:
        return jsonify({"message": "Token inválido"}), 401

    data = request.get_json()
    id_mascota = data.get("id_mascota")
    mensaje = data.get("mensaje")

    if not mensaje or not id_mascota:
        return jsonify({"message": "Mensaje o mascota faltante"}), 400

    guardar_mensaje(id_usuario, id_mascota, mensaje)
    return jsonify({"message": "Mensaje enviado"}), 201

def mensajes_por_mascota(id_mascota):
    mensajes = obtener_mensajes(id_mascota)
    return jsonify(mensajes), 200
