# import mysql.connector
# import os

# def get_db_connection():
#     return mysql.connector.connect(
#         host=os.environ.get('DB_HOST'),
#         user=os.environ.get('DB_USER'),
#         password=os.environ.get('DB_PASSWORD'),
#         database=os.environ.get('DB_NAME'),
#         port=int(os.environ.get('DB_PORT', 3306))
#     )
import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='portal_mascotas'
    )