from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)
# Conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='portal_mascotas'
    )

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify({
            'message': 'Login exitoso',
            'nombre': user['nombre'],
            'rol': user['rol']  
        })
    else:
        return jsonify({'message': 'Credenciales incorrectas'}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)
