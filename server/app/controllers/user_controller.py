import app.database as database
from asyncmy.errors import IntegrityError
from fastapi import HTTPException 

async def get_user(user_email):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute(
                "SELECT username, id, email FROM users WHERE email=%s",
                (user_email,)
            )

            db_user = await cursor.fetchone()
            
            if ((db_user is None)):
                return None
            
            return {
                "id": db_user[0],
                "username": db_user[1],
                "email": db_user[2]
            }
            
            


async def register_user(user):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            try:
                await cursor.execute(
                    """
                    INSERT INTO users (username, email, password)
                    VALUES (%s, %s, %s)
                    """,
                    (user.name, user.email, user.password)
                )

                return {
                    "message": "User created successfully"
                }

            except IntegrityError:
                raise HTTPException(
                    status_code = 409,
                    detail= "Email already exist"
                )


async def login_user(user):
    async with database.pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute(
                "SELECT id, username,password FROM users WHERE email=%s",
                (user.email,)
            )
            
            db_user = await cursor.fetchone()

            if ((db_user is None) or (db_user[2] != user.password)):
                return False
            
            return True
            
