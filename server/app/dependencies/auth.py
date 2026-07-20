from fastapi import Cookie, HTTPException
import app.database as database 
from app.utils.generate_token import decode_access_token


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
                "id": db_user[1],
                "username": db_user[0],
                "email": db_user[2]
            }


async def get_current_user(
    access_token : str | None = Cookie(default=None)
):
    
    if (access_token is None) :
        raise HTTPException(
            status_code = 401,
            detail = "Access Token is missing"
        )
        
    payload = decode_access_token(access_token)
    
    if (payload is None) :
        raise HTTPException(
            status_code = 401,
            detail = "Not a valid token"
        )
        
    
    current_user = await get_user(payload.get("sub"))
    
    if current_user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )
        
    return current_user
        