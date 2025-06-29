from flask import Blueprint, request, jsonify
from src.utils.jwt import decode_token
from src.db import get_db_connection

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/stats', methods=['GET'])
def get_admin_stats():
    # 1. Verificar token de autenticación
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

    # 2. Consultar base de datos para estadísticas
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Total de mascotas
        cursor.execute("SELECT COUNT(*) FROM mascotas")
        total_mascotas = cursor.fetchone()[0]

        # Total de usuarios
        cursor.execute("SELECT COUNT(*) FROM usuarios")
        total_usuarios = cursor.fetchone()[0]

        # Solicitudes de adopción pendientes
        cursor.execute("SELECT COUNT(*) FROM solicitudes WHERE estado = 'pendiente'")
        solicitudes_pendientes = cursor.fetchone()[0]

        # Ofrecimientos pendientes de aprobación
        cursor.execute("SELECT COUNT(*) FROM mascotas WHERE estado = 'ofrecimiento_pendiente'")
        ofrecimientos_pendientes = cursor.fetchone()[0]

        # Últimas mascotas registradas (pueden incluir pendientes)
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
                {"id": row[0], "nombre": row[1], "estado": row[2]} for row in ultimas_mascotas
            ]
        }

        return jsonify(stats), 200

    except Exception as e:
        print(f"Error al obtener estadísticas: {e}")
        return jsonify({"message": "Error interno al obtener estadísticas"}), 500

@admin_bp.route('/usuarios', methods=['GET'])
def obtener_todos_los_usuarios():
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

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT id, nombre, apellido, email, provincia, localidad, calle,
                   imagenDePerfil, rol, puntajeUsuario, habilitado_adoptar,
                   habilitado_dador, hogar_transito
            FROM usuarios
        """)
        usuarios = cursor.fetchall()

        # Conversión segura para evitar valores None
        for u in usuarios:
            u["habilitado_adoptar"] = int(u.get("habilitado_adoptar") or 0)
            u["habilitado_dador"] = int(u.get("habilitado_dador") or 0)
            u["hogar_transito"] = int(u.get("hogar_transito") or 0)

        cursor.close()
        conn.close()

        return jsonify(usuarios), 200

    except Exception as e:
        print(f"[ERROR] al obtener usuarios: {e}")
        return jsonify({"message": "Error al obtener usuarios"}), 500

@admin_bp.route('/usuarios/<int:user_id>', methods=['PUT'])
def actualizar_usuario(user_id):
    # Verificar token y rol (como en el GET)
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

    data = request.get_json()
    rol = data.get('rol')
    habilitado_adoptar = data.get('habilitado_adoptar')
    habilitado_dador = data.get('habilitado_dador')
    hogar_transito = data.get('hogar_transito')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE usuarios SET
                rol = %s,
                habilitado_adoptar = %s,
                habilitado_dador = %s,
                hogar_transito = %s
            WHERE id = %s
        """, (rol, habilitado_adoptar, habilitado_dador, hogar_transito, user_id))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Usuario actualizado correctamente"}), 200

    except Exception as e:
        print(f"[ERROR] al actualizar usuario: {e}")
        return jsonify({"message": "Error al actualizar usuario"}), 500
