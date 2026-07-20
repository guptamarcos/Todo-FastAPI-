from fastapi import APIRouter,Depends
from app.controllers import todo_controller
from app.schemas.todo_schema import TodoCreate,TodoResponse,TodoUpdate
from app.dependencies.auth import get_current_user

router = APIRouter()

# THIS IS GET TODO ROUTE
@router.get("/")
async def get_all_todos(
    current_user = Depends(get_current_user)
):
    return await todo_controller.get_all_todo(current_user)


# THIS IS ADD TODO ROUTE
@router.post("/")
async def get_all_todos(
    todo:TodoCreate,
    current_user = Depends(get_current_user)
):
    return await todo_controller.add_todo(todo,current_user)


# THIS IS UPDATE TODO ROUTE
@router.patch("/{id}")
async def get_all_todos(
    id: int, todo: TodoUpdate,
    current_user = Depends(get_current_user)
):
    return await todo_controller.update_todo(id, todo, current_user)


# THIS IS DELETE TODO ROUTE
@router.delete("/{id}")
async def get_all_todos(
    id: int, current_user = Depends(get_current_user)
):
    return await todo_controller.delete_todo(id,current_user)