from pydantic import BaseModel

# Request Models
class TodoCreate(BaseModel):
    title: str

class TodoUpdate(BaseModel):
    id: int
    title: str
    completed: bool

class TodoDelete(BaseModel):
    id: int

# Response Models
class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool

