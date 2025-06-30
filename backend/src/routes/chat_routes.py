from flask import Blueprint
from src.controllers.chat_controller import crear_mensaje, mensajes_por_mascota

chat_bp = Blueprint("chat_bp", __name__)

chat_bp.route("", methods=["POST"])(crear_mensaje)
chat_bp.route("/<int:id_mascota>", methods=["GET"])(mensajes_por_mascota)
