from flask import Blueprint
from controllers.auth_controller import login, register
from controllers.auth_controller import request_password_reset, reset_password, get_user_info
from controllers.auth_controller import update_user_info_controller
from controllers.auth_controller import delete_user_controller

auth_bp = Blueprint('auth_bp', __name__)
@auth_bp.before_request
def before_any_request():
    print("🔍 Antes de cualquier request en auth_bp")

auth_bp.route('/login', methods=['POST'])(login)
auth_bp.route('/register', methods=['POST'])(register)
auth_bp.route('/request-reset', methods=['POST'])(request_password_reset)
auth_bp.route('/reset-password', methods=['POST'])(reset_password)
auth_bp.route('/user-info', methods=['GET'])(get_user_info)
auth_bp.route("/update-user", methods=["PUT"])(update_user_info_controller)
auth_bp.route("/delete-user", methods=["DELETE"])(delete_user_controller)
