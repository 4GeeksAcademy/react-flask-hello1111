"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

api = Blueprint('api', __name__)
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'msg': 'Email y contraseña requeridos'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'msg': 'Usuario ya existe'}), 409

    # Crear usuario y hashear contraseña
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'msg': 'Usuario creado'}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'msg': 'Email y contraseña requeridos'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'msg': 'Credenciales inválidas'}), 401

    # Generar JWT con el ID de usuario como identidad
    access_token = create_access_token(identity=user.id)
    return jsonify({
        'token': access_token,
        'user': user.serialize()
    }), 200


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Obtiene la identidad (user id) del token
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    return jsonify(user.serialize()), 200