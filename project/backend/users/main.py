from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))
from models import Base
from database import engine
from routes.suggest import router as suggest_router
from routes.login import router as login_router

# from fastapi import Depends, FastAPI, HTTPException
# from sqlalchemy.orm import Session
# from . import models, schemas
# from .crud import get_user_by_email_query, create_user_query
# from .database import SessionLocal, engine, get_db
# import logging
# logging.basicConfig(level=logging.DEBUG)

import logging
logging.basicConfig(level=logging.DEBUG)


app = FastAPI()

# フロントエンドからのリクエストを受け入れるために、CORSを設定する
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(suggest_router)
app.include_router(login_router)

Base.metadata.create_all(engine)    

@app.get("/")
def pong():
    return "for health check !!"

# @app.post("/users/", response_model=schemas.User)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = get_user_by_email_query(db=db, email=user.email)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     return create_user_query(db=db, user=user)