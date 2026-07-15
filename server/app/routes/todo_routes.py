from fastapi import APIRouter
from app.controllers import todo_controller

router = APIRouter()

@router.get("/")
def get_all_todos():
    return todo_controller.get_all_todo()


@router.post("/")
def get_all_todos():
    return todo_controller.add_todo()

@router.patch("/")
def get_all_todos():
    return todo_controller.update_todo()


@router.delete("/")
def get_all_todos():
    return todo_controller.delete_todo()