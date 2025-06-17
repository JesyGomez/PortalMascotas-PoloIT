from flask import Blueprint, request, jsonify
from utils.jwt import decode_token
from db import get_db_connection

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/stats', methods=['GET'])
def get_admin_stats():
    # 1. Verificar token
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"message": "Token no proporcionado"}), 401

    token = auth_header.split(" ")[1]
    try:
        user_data = decode_token(token)
        if user_data.get('rol') != 'admin':
            return jsonify({"message": "Acceso restringido a administradores"}), 403
    except Exception:
        return jsonify({"message": "Token inválido"}), 401

    # 2. Consultar la base de datos
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM mascotas")
        total_mascotas = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM usuarios")
        total_usuarios = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM solicitudes WHERE estado = 'pendiente'")
        solicitudes_pendientes = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM mascotas WHERE estado = 'ofrecimiento_pendiente'")
        ofrecimientos_pendientes = cursor.fetchone()[0]

        cursor.execute("SELECT id, nombre, estado FROM mascotas ORDER BY id DESC LIMIT 3")
        ultimas_mascotas = cursor.fetchall()

        cursor.close()
        conn.close()

        stats = {
            "totalMascotas": total_mascotas,
            "totalUsuarios": total_usuarios,
            "solicitudesPendientes": solicitudes_pendientes,
            "ofrecimientosPendientes": ofrecimientos_pendientes,
            "ultimasMascotas": [
                {"id": row[0], "nombre": row[1], "estado": row[2]}
                for row in ultimas_mascotas
            ]
        }

        return jsonify(stats), 200

    except Exception as e:
        print(f"Error al obtener estadísticas: {e}")
        return jsonify({"message": "Error interno al obtener estadísticas"}), 500
