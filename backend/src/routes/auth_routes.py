from flask import Blueprint
from controllers.auth_controller import login, register
from controllers.auth_controller import request_password_reset, reset_password

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/login', methods=['POST'])(login)
auth_bp.route('/register', methods=['POST'])(register)

auth_bp.route('/request-reset', methods=['POST'])(request_password_reset)
auth_bp.route('/reset-password', methods=['POST'])(reset_password)
