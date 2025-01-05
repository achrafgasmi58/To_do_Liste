from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.models import db
from app.routes.tasks import tasks_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://achraf:Pearlexport58@localhost:5433/todo_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the database
    db.init_app(app)

    # Register the blueprint
    app.register_blueprint(tasks_bp)

    with app.app_context():
        db.create_all()

    return app
