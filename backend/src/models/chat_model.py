from src.db import get_db_connection

def guardar_mensaje(id_usuario, id_mascota, mensaje):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO mensajes_chat (id_usuario, id_mascota, mensaje)
        VALUES (%s, %s, %s)
    """, (id_usuario, id_mascota, mensaje))
    conn.commit()
    cursor.close()
    conn.close()

def obtener_mensajes(id_mascota):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT m.mensaje, m.fecha, u.nombre AS autor
        FROM mensajes_chat m
        JOIN usuarios u ON m.id_usuario = u.id
        WHERE m.id_mascota = %s
        ORDER BY m.fecha ASC
    """, (id_mascota,))
    mensajes = cursor.fetchall()
    cursor.close()
    conn.close()
    return mensajes
