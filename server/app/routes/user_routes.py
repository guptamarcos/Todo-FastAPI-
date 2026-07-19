from fastapi import APIRouter, Response, HTTPException, Cookie
from app.controllers import user_controller
from app.schemas.user_schema import UserLogin,UserRegister
from app.utils.generate_token import generate_access_token, decode_access_token

router = APIRouter()


@router.get("/me")
async def get_user(access_token: str | None = Cookie(default = None)):
    if(access_token is None):
        raise HTTPException(
            status_code = 401,
            detail = "Token missing"
        )
    
    payload = decode_access_token(access_token)
    if (payload is None): 
        raise HTTPException(
            status_code = 401,
            detail = "Invalid token",
        )
    
    user_email = payload.get("sub")

    return await user_controller.get_user(user_email)
    
    
@router.post("/register")
async def register_user(user:UserRegister):
    return await user_controller.register_user(user)


@router.post("/login")
async def login_user(user:UserLogin,response:Response):
    # VERIFY USERNAME AND PASSWORD
    res = await user_controller.login_user(user)

    if(not res):
        raise HTTPException(
            status_code = 400,
            detail = "Incorrect Credentials"
        )

    token = generate_access_token({
        "sub": user.email
    })

    response.set_cookie(
        key="access_token", 
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=1800
    )

    return {
        "message": "Login successfuly"
    }


@router.post("/logout")
async def logout_user(response:Response):
    response.delete_cookie(
        key="access_token"
    )

    return {
        "message": "User logout successfully"
    }


