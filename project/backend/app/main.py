from fastapi import FastAPI

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))
from models import Base
from database import engine
from routes.suggest import router as suggest_router
from routes.login import router as login_router

app = FastAPI()
app.include_router(suggest_router)
app.include_router(login_router)

Base.metadata.create_all(engine)    

@app.get("/")
def pong():
    return "for health check"