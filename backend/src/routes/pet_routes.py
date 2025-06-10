from flask import Blueprint
from controllers.pet_controller import register_pet

pet_bp = Blueprint('pet_bp', __name__)

pet_bp.route('/pets/register', methods=['POST'])(register_pet)
