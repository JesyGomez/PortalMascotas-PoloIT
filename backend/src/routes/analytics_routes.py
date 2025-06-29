from flask import Blueprint
from src.controllers.analytics_controller import get_analytics_data

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('', methods=['GET'])
def get_analytics():
    return get_analytics_data()
