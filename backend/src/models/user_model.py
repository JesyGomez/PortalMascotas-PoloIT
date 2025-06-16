from db import get_db_connection
import bcrypt

def get_user_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    return user


def create_user(data):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Verificar si el email ya existe
        cursor.execute("SELECT id FROM usuarios WHERE email = %s", (data.get('email'),))
        if cursor.fetchone():
            return {'success': False, 'message': 'El email ya está registrado'}

        # Hashear la contraseña
        password_bytes = data.get('password').encode('utf-8')
        hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt())

        # Insertar nuevo usuario
        cursor.execute("""
            INSERT INTO usuarios 
                (nombre, apellido, email, password, provincia, localidad, calle, puntajeUsuario, habilitado_adoptar, habilitado_dador, imagenDePerfil, rol)
            VALUES 
                (%s, %s, %s, %s, %s, %s, %s, 0, false, false, %s, %s)
        """, (
            data.get('nombre'),
            data.get('apellido'),
            data.get('email'),
            hashed_password,
            data.get('provincia'),
            data.get('localidad'),
            data.get('calle'),
            data.get('imagenDePerfil'),
            data.get('rol', 'usuario')
        ))

        conn.commit()
        return {'success': True}
    except Exception as e:
        print(f"Error al crear usuario: {e}")
        return {'success': False, 'message': 'Error interno al registrar usuario'}
    finally:
        cursor.close()
        conn.close()

def update_user_password(email, hashed_password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET password=%s WHERE email=%s", (hashed_password, email))
    conn.commit()
    cursor.close()
    conn.close()
def update_user_info(user_id, nombre, email, ciudad):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            UPDATE usuarios
            SET nombre = %s, email = %s, localidad = %s
            WHERE id = %s
        """
        cursor.execute(query, (nombre, email, ciudad, user_id))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error al actualizar usuario: {e}")
        return False
    finally:
        cursor.close()
        conn.close()
