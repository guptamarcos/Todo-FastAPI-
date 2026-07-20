from fastapi import APIRouter, Response, HTTPException, Cookie, Depends
from app.controllers import user_controller
from app.schemas.user_schema import UserLogin,UserRegister
from app.utils.generate_token import generate_access_token, decode_access_token
from app.dependencies.auth import get_current_user

router = APIRouter()


@router.get("/me")
async def get_user(current_user = Depends(get_current_user)):
    return current_user
    
    
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
async def logout_user(
    response:Response, 
    current_user = Depends(get_current_user)
):
    response.delete_cookie(
        key="access_token"
    )

    return {
        "message": "User logout successfully"
    }


