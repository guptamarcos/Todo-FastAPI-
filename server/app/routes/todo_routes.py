from fastapi import APIRouter
from app.controllers import todo_controller
from app.schemas.todo_schema import TodoCreate,TodoResponse,TodoUpdate

router = APIRouter()

# THIS IS GET TODO ROUTE
@router.get("/")
async def get_all_todos():
    return await todo_controller.get_all_todo()


# THIS IS ADD TODO ROUTE
@router.post("/")
async def get_all_todos(todo:TodoCreate):
    return await todo_controller.add_todo(todo)


# THIS IS UPDATE TODO ROUTE
@router.patch("/{id}")
async def get_all_todos(id: int, todo: TodoUpdate):
    return await todo_controller.update_todo(id, todo)


# THIS IS DELETE TODO ROUTE
@router.delete("/{id}")
async def get_all_todos(id: int):
    return await todo_controller.delete_todo(id)