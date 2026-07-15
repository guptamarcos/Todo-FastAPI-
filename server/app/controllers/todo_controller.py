from app.database import db_connection

def get_all_todo():
    with db_connection.cursor() as cursor: 
        query = "SELECT * FROM todos"
        cursor.execute(query)
        todos = cursor.fetchall()
    
    return todos

def add_todo():
    
    return {
        "message": "This is add todo route"
    }

def update_todo():
    return {
        "message": "This is update todo route"
    }

def delete_todo():
    return {
        "message": "This is delete todo route"
    }

