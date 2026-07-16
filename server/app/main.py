from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_pool, close_pool
from app.routes.todo_routes import router as todo_routes


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_pool()      # Startup
    yield
    await close_pool()       # Shutdown


app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo_routes,prefix="/api/todos")