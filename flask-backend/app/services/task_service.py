from app.models import db, Task
from datetime import datetime


def get_all_tasks():
    tasks = Task.query.all()
    return [task.to_dict() for task in tasks]


def create_new_task(data):
    due_date = data.get('due_date', None)
    if due_date:
        due_date = datetime.strptime(due_date, '%Y-%m-%d').date()
    
    new_task = Task(
        title=data.get('title'),
        description=data.get('description'),
        category=data.get('category'),
        due_date=due_date,
        is_completed=data.get('is_completed', False)
    )
    db.session.add(new_task)
    db.session.commit()
    return new_task.to_dict()


def update_existing_task(id, data):
    task = Task.query.get_or_404(id)
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.category = data.get('category', task.category)
    task.due_date = data.get('due_date', task.due_date)
    task.is_completed = data.get('is_completed', task.is_completed)
    db.session.commit()
    return task.to_dict()


def delete_task_by_id(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return {"message": "Task deleted"}
