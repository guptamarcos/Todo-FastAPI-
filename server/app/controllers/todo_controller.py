import app.database as database

# THIS IS GET TODO CONTROLLER
async def get_all_todo():
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute(
                "SELECT * FROM todos"
            )

            users = await cursor.fetchall()   

    return users


# THIS IS ADD TODO CONTROLLER
async def add_todo(todo):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
           await cursor.execute(
               "INSERT INTO todos (title) VALUES (%s)",(todo.title,)
           )
    
    return {
        "message": "Todo added succesfully"
    }


# THIS IS UPDATE TODO CONTROLLER
async def update_todo(id,todo):
    update_data = todo.model_dump(exclude_unset=True)
    print(update_data)
    
    if not update_data: 
        return {"message": "Nothing to update"}
    
    fields = []
    values = []

    for key,val in update_data.items():
        fields.append(f"{key}=%s")
        values.append(val)

    values.append(id)

    query = f"UPDATE todos SET {', '.join(fields)} WHERE id=%s"
    
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute( query, tuple(values))
    
    return {
        "message": "This is update todo route"
    }


# THIS IS DELETE TODO CONTROLLER
async def delete_todo(id):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor: 
            await cursor.execute(
                "DELETE FROM todos WHERE id=%s", (id,)
            )
    
    return {
        "message": "This is delete todo route"
    }

