from flask import Blueprint
from controllers.pet_controller import register_pet, get_user_pets, get_all_pets, update_pet, get_pet, delete_pet


pet_bp = Blueprint('pet_bp', __name__, url_prefix='/api/mascotas')

pet_bp.route('/', methods=['GET'])(get_all_pets)
pet_bp.route('/registrar', methods=['POST'])(register_pet)
pet_bp.route('/usuario', methods=['GET'])(get_user_pets)
pet_bp.route('/<int:pet_id>', methods=['PUT'])(update_pet)
pet_bp.route('/<int:pet_id>', methods=['GET'])(get_pet)
pet_bp.route('/<int:pet_id>', methods=['DELETE'])(delete_pet)

# from flask import Blueprint
# from controllers.pet_controller import register_pet, get_user_pets, get_all_pets, update_pet, delete_pet

# pet_bp = Blueprint('pet_bp', __name__)

# pet_bp.route('/pets/register', methods=['POST'])(register_pet)
# pet_bp.route('/pets/user', methods=['GET'])(get_user_pets)
# pet_bp.route('/api/mascotas', methods=['GET'])(get_all_pets)
# pet_bp.route('/api/mascotas/<int:pet_id>', methods=['PUT'])(update_pet)
# pet_bp.route('/api/mascotas/<int:pet_id>', methods=['DELETE'])(delete_pet)