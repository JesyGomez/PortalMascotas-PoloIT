from flask import jsonify
from src.db import get_db_connection

def get_analytics_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM mascotas")
        total_mascotas = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM usuarios")
        total_usuarios = cursor.fetchone()[0]

        total_solicitudes = 58  # simulado
        total_adopciones = 34   # simulado

        tasa_adopcion = round((total_adopciones / total_solicitudes) * 100, 1) if total_solicitudes > 0 else 0
        tiempo_promedio = 12
        satisfaccion = 4.7

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
