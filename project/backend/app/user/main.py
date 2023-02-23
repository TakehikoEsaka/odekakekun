from fastapi import FastAPI
from schemas import UserInfo
from models import Base
from database import engine

app = FastAPI()

Base.metadata.create_all(engine)

@app.get("/ping")
def pong():
    return {"Hello": "world!"}

@app.post("login")  
def login(userinfo: UserInfo):
    return {"hello", "take"}
