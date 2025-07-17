from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
import os

# Inicializamos la extensión
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configuración inline para no crear config.py extra
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'super-secret')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///users.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-jwt')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

    db.init_app(app)
    JWTManager(app)

    # Importar y registrar blueprint de rutas
    from .routes import auth_bp
    app.register_blueprint(auth_bp)

    with app.app_context():
        db.create_all()

    return app