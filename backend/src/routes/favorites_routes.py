from flask import Blueprint
from src.controllers.favorites_controllers import add_favorite, remove_favorite, get_favorites

favorites_bp = Blueprint("favorites_bp", __name__)

favorites_bp.route("", methods=["POST"])(add_favorite)
favorites_bp.route("/<int:id_mascota>", methods=["DELETE"])(remove_favorite)
favorites_bp.route("", methods=["GET"])(get_favorites)
