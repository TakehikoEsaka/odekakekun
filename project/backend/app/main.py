from fastapi import FastAPI, Depends, HTTPException, status
import schemas
from models import Base
import models
from database import engine, sessionLocal
from sqlalchemy.orm import Session
from hashing import Hash
import random
import string

app = FastAPI()

# from routes import suggest
# app.include_router(suggest) 

Base.metadata.create_all(engine)    

@app.get("/ping")
def pong():
    return {"Hello": "world!"}
