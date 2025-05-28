from flask import Flask, request, jsonify
from flask_cors import CORS
# from mysql.connector import connect  # <-- Descomentamos cuando tengamos la base de datos lista
# import bcrypt  

app = Flask(__name__)
CORS(app)  # Permite peticiones desde el frontend (por ejemplo, React)

# ======= CONFIGURACIÓN PARA CONEXIÓN A LA BASE DE DATOS =======
# conn = connect(
#     host="localhost",
#     user="",
#     password="",
#     database="portal-mascotas"
# )
# cursor = conn.cursor(dictionary=True)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # ======= BLOQUE TEMPORAL SIN BASE DE DATOS =======
    if email == 'admin@admin.com' and password == '1234':
        return jsonify({
            'message': 'Login exitoso!',
            'nombre': 'Administrador'  # Este nombre se mostrará en React
        }), 200
    else:
        return jsonify({'error': 'Credenciales inválidas'}), 401

    # ======= CÓDIGO REAL PARA USO CON BASE DE DATOS Y BCRYPT (cuando lo activemos) =======
    # cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
    # usuario = cursor.fetchone()

    # if usuario and bcrypt.checkpw(password.encode('utf-8'), usuario['password'].encode('utf-8')):
     #   return jsonify({'message': 'Login exitoso!', 'nombre': usuario['nombre']}), 200
    # else:
    #     return jsonify({'error': 'Credenciales inválidas'}), 401

if __name__ == '__main__':
    app.run(debug=True)
