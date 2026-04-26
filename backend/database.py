from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+pymysql://root:root@127.0.0.1:3306/Parnet"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

import pymysql

conn = pymysql.connect(
    host="127.0.0.1",
    user="root",
    password="root",
    port=3306
)

print("Conectado")