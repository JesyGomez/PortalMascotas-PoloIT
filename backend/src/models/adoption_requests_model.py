from src.db import get_db_connection

def guardar_solicitud(id_usuario, id_mascota):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            # Verificar si ya existe una solicitud
            cursor.execute(
                "SELECT COUNT(*) FROM solicitudes_adopcion WHERE id_usuario = %s AND id_mascota = %s",
                (id_usuario, id_mascota),
            )
            result = cursor.fetchone()
            if result[0] > 0:
                return "exists"

            # Insertar si no existe
            cursor.execute(
                "INSERT INTO solicitudes_adopcion (id_usuario, id_mascota) VALUES (%s, %s)",
                (id_usuario, id_mascota),
            )
        connection.commit()
        return True
    except Exception as e:
        print("Error al guardar solicitud:", e)
        return False
