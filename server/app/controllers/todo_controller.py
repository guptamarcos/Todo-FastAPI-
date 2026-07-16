import app.database as database

async def get_all_todo():
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute(
                "SELECT * FROM todos"
            )

            users = await cursor.fetchall()   

    return users

async def add_todo(todo):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
           await cursor.execute(
               "INSERT INTO todos (title) VALUES (%s)",(todo.title,)
           )
    
    return {
        "message": "Todo added succesfully"
    }

def update_todo():
    return {
        "message": "This is update todo route"
    }

def delete_todo(id):
    print(id)
    return {
        "message": "This is delete todo route"
    }

