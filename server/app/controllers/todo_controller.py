import app.database as database

# THIS IS GET TODO CONTROLLER
async def get_all_todo(current_user):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute(
                "SELECT * FROM todos WHERE user_id=%s",
                (current_user.get("id"),)
            )

            todos = await cursor.fetchall()   

    return todos


# THIS IS ADD TODO CONTROLLER
async def add_todo(todo,current_user):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            try:
                await cursor.execute(
               "INSERT INTO todos (title,user_id) VALUES (%s,%s)",(todo.title,current_user.get("id")))
            except Exception as e:
                print(str(e))
                
    return {
        "message": "Todo added succesfully"
    }


# THIS IS UPDATE TODO CONTROLLER
async def update_todo(id,todo,current_user):
    
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
    values.append(current_user.get("id"))

    query = f"UPDATE todos SET {', '.join(fields)} WHERE id=%s AND user_id=%s"
    
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute( query, tuple(values))
    
    return {
        "message": "This is update todo route"
    }


# THIS IS DELETE TODO CONTROLLER
async def delete_todo(id,current_user):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor: 
            await cursor.execute(
                "DELETE FROM todos WHERE id=%s AND user_id=%s", (id,current_user.get("id"))
            )
    
    return {
        "message": "This is delete todo route"
    }

