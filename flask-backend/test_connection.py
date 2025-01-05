from sqlalchemy import create_engine

DATABASE_URI = 'postgresql://achraf:Pearlexport58@localhost:5433/todo_db'
engine = create_engine(DATABASE_URI)

try:
    connection = engine.connect()
    print("Connection successful!")
    connection.close()
except Exception as e:
    print("Connection failed:", e)
