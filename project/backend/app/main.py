from fastapi import FastAPI
from models import Base
from database import engine

app = FastAPI()

from routes.suggest import router as suggest_router
from routes.login import router as login_router
app.include_router(suggest_router)
app.include_router(login_router)

Base.metadata.create_all(engine)    

@app.get("/")
def pong():
    return "for health check"