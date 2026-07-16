from fastapi import APIRouter
from app.controllers import todo_controller
from app.schemas.todo_schema import (TodoCreate,TodoResponse,TodoUpdate,TodoDelete)

router = APIRouter()

@router.get("/")
async def get_all_todos():
    return await todo_controller.get_all_todo()


@router.post("/")
async def get_all_todos(todo:TodoCreate):
    return await todo_controller.add_todo(todo)

@router.patch("/")
def get_all_todos():
    return todo_controller.update_todo()


@router.delete("/")
def get_all_todos(id: TodoDelete):
    print(id)
    return todo_controller.delete_todo(id)