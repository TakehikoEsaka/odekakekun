from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import random
import string
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))

# pathlib対応する
import schemas
import models
from database import get_db

router = APIRouter()

@router.post("/suggest", tags = ["suggest"])
def suggest(question : str, db: Session = Depends(get_db)):
    # ここでanswerをchat-gptからget
    answer = "".join(random.choice(string.ascii_lowercase) for i in range(10))

    new_suggest = models.Suggest(question = question, answer = answer)
    db.add(new_suggest)
    db.commit()
    db.refresh(new_suggest)
    return new_suggest

@router.get("/get_all_suggest", tags = ["suggest"])
def get_suggest(db: Session = Depends(get_db)):
    suggests = db.query(models.Suggest).all()
    return suggests
