from flask import Blueprint
from src.controllers.adoption_requests_controller import create_adoption_request

adoption_requests_bp = Blueprint("adoption_requests_bp", __name__)

adoption_requests_bp.route("", methods=["POST"])(create_adoption_request)
