from flask import Blueprint, jsonify, request
from app.services.task_service import (
    get_all_tasks,
    create_new_task,
    update_existing_task,
    delete_task_by_id
)


tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = get_all_tasks()
    return jsonify(tasks), 200


@tasks_bp.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    task = create_new_task(data)
    return jsonify(task), 201


@tasks_bp.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = update_existing_task(id, data)
    return jsonify(task), 200


@tasks_bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    result = delete_task_by_id(id)
    return jsonify(result), 200
