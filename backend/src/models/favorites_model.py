from src.db import get_db_connection

def agregar_favorito(id_usuario, id_mascota):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT IGNORE INTO favoritos (id_usuario, id_mascota) VALUES (%s, %s)", (id_usuario, id_mascota))
        conn.commit()
        return True
    except Exception as e:
        print(f"[ERROR agregar_favorito]: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

def quitar_favorito(id_usuario, id_mascota):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM favoritos WHERE id_usuario = %s AND id_mascota = %s", (id_usuario, id_mascota))
        conn.commit()
        return True
    except Exception as e:
        print(f"[ERROR quitar_favorito]: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

def obtener_favoritos(id_usuario):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT m.*
            FROM mascotas m
            INNER JOIN favoritos f ON m.id = f.id_mascota
            WHERE f.id_usuario = %s
        """, (id_usuario,))
        favoritos = cursor.fetchall()
        return favoritos
    except Exception as e:
        print(f"[ERROR obtener_favoritos]: {e}")
        return []
    finally:
        cursor.close()
        conn.close()
