from fastapi import FastAPI
import requests as re
import random

app = FastAPI()

@app.get("/")
def Hello():
    return {"Hello":"World!"}

@app.get("/ping")
def pong():
    print('health endpoint')

@app.get("/suggest")
def suggest(place = None, way = None, time = None, id : int = 10):
    if place == None or way == None or time == None:
        return False
    else:
        # res = chatGPT()
        res = re.get("https://jsonplaceholder.typicode.com/todos/").json()[id]["title"]
    return res

if __name__ == "__main__":
    print(suggest())