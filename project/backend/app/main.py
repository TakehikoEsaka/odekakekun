from fastapi import FastAPI

app = FastAPI()

@app.get("/ping")
def pong():
    return {"Hello": "world!"}

@app.get("/suggest")
def suggest():
    