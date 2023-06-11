from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
from pathlib import Path
from users.models import Base
from users.database import engine
from users.routes.suggest import router as suggest_router
from users.routes.login import router as login_router
import logging
sys.path.append(str(Path(__file__).resolve().parent))
logging.basicConfig(level=logging.DEBUG)


app = FastAPI()

# フロントエンドからのリクエストを受け入れるために、CORSを設定する
# TODO originはこんな感じで指定するでもいいかも（https://stackoverflow.com/questions/71802652/react-not-showing-post-response-from-fastapi-backend-application/71805329#71805329）
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
