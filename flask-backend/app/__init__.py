from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.models import db
from app.routes.tasks import tasks_bp  # Import du blueprint
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}) 

    # Configuration de la base de données
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://achraf:Pearlexport58@localhost:5433/todo_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialisation de la base de données
    db.init_app(app)

    # Enregistrer le blueprint
    app.register_blueprint(tasks_bp)

    with app.app_context():
        db.create_all()

    return app
