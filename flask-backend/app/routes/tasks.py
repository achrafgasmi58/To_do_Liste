from flask import Blueprint, jsonify, request
from app.models import db, Task

tasks_bp = Blueprint('tasks', __name__)  # Définir le blueprint

@tasks_bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks]), 200

@tasks_bp.route('/tasks', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        print("Données reçues :", data)  # Log pour voir les données envoyées
        new_task = Task(
            title=data.get('title'),
            description=data.get('description'),
            category=data.get('category'),
            due_date=data.get('due_date'),
            is_completed=data.get('is_completed', False)
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_dict()), 201
    except Exception as e:
        print("Erreur lors de la création de la tâche :", str(e))  # Log de l'erreur
        return jsonify({"error": "Une erreur s'est produite lors de la création de la tâche"}), 500


@tasks_bp.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.category = data.get('category', task.category)
    task.due_date = data.get('due_date', task.due_date)
    task.is_completed = data.get('is_completed', task.is_completed)
    db.session.commit()
    return jsonify(task.to_dict()), 200


@tasks_bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"}), 200
