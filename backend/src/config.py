import os

class DevelopmentConfig:
    DEBUG = True
    JWT_SECRET = os.getenv('JWT_SECRET', 'tu_clave_secreta_segura') 

config = {
    'development': DevelopmentConfig
}
