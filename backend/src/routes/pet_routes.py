from flask import Blueprint
from controllers.pet_controller import register_pet, get_user_pets

pet_bp = Blueprint('pet_bp', __name__)

pet_bp.route('/pets/register', methods=['POST'])(register_pet)
pet_bp.route('/pets/user', methods=['GET'])(get_user_pets)