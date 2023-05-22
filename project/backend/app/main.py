from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))
from models import Base
from database import engine
from routes.suggest import router as suggest_router
from routes.login import router as login_router

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