from flask import Blueprint, jsonify
from db import get_db_connection

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/api/analytics', methods=['GET'])
def get_analytics():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Contar mascotas
        cursor.execute("SELECT COUNT(*) FROM mascotas")
        total_mascotas = cursor.fetchone()[0]

        # Contar usuarios
        cursor.execute("SELECT COUNT(*) FROM usuarios")
        total_usuarios = cursor.fetchone()[0]

        # Simulación: total solicitudes y adopciones
        total_solicitudes = 58  # dato simulado
        total_adopciones = 34  # dato simulado

        # Opcional: más métricas simuladas
        tasa_adopcion = round((total_adopciones / total_solicitudes) * 100, 1) if total_solicitudes > 0 else 0
        tiempo_promedio = 12  # días promedio (simulado)
        satisfaccion = 4.7    # puntuación promedio (simulado)

        data = {
            "topMetrics": {
                "totalMascotas": total_mascotas,
                "totalUsuarios": total_usuarios,
                "totalSolicitudes": total_solicitudes,
                "totalAdopciones": total_adopciones,
                "adoptionRate": tasa_adopcion,
                "averageTime": tiempo_promedio,
                "userSatisfaction": satisfaccion
            }
        }

        return jsonify(data)

    except Exception as e:
        print(f"[ERROR en analytics]: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500
    finally:
        cursor.close()
        conn.close()
