from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import random
import string
from typing import Optional
import pandas as pd

import schemas
import models
from database import get_db
import oauth2

router = APIRouter()

def get_suggest(db: Session, email : str):
    suggests = db.query(models.Suggest).filter(models.Suggest.email == email).first()
    if not suggests:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Suggests with {email} not found')
    return suggests

@router.post("/suggest", tags = ["suggest"])
def suggest(question : str, current_user: models.UserInfo = Depends(oauth2.get_current_active_user), db: Session = Depends(get_db)):
    # ここでanswerをchat-gptからget
    answer = "".join(random.choice(string.ascii_lowercase) for i in range(10))

    # ログインしている時はDBに追加・そうでない時は追加しない
    if current_user:
        new_suggest = models.Suggest(user_id = current_user.user_id, question = question, answer = answer)
        db.add(new_suggest)
        db.commit()
        db.refresh(new_suggest)

    return answer

@router.get("/get_all_suggest", tags = ["suggest"])
def get_suggest(current_user: models.UserInfo = Depends(oauth2.get_current_active_user), db: Session = Depends(get_db)):
    
    
    user = db.query(models.UserInfo).filter(models.UserInfo.user_id == current_user.user_id).first()
    
    df = pd.DataFrame(columns=["question", "answer"])
    for s in user.suggestions:
        df = df.append({"question": s.question, "answer": s.answer}, ignore_index=True)

    return df.to_dict(orient="records")