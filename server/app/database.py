import asyncmy
from app.config import DB_CONFIG

pool = None

async def create_pool():
    global pool

    pool = await asyncmy.create_pool(
        **DB_CONFIG,
        minsize=1,
        maxsize=10,
        autocommit=True,
    )


async def close_pool():
    global pool

    if pool:
        pool.close()
        await pool.wait_closed()