import pymysql
from app.config import DB_CONFIG

db_connection = pymysql.connect(**DB_CONFIG)