from pydantic import BaseModel

# Request Models
class TodoCreate(BaseModel):
    title: str

class TodoUpdate(BaseModel):
    title: str|None = None
    completed: bool | None = None

# Response Models
class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool

