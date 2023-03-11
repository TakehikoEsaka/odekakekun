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

    print("starts")
    # ログインしている時はDBに追加・そうでない時は追加しない
    if current_user:
        print("youre logined")
        new_suggest = models.Suggest(user_id = current_user.user_id, question = question, answer = answer)
        db.add(new_suggest)
        db.commit()
        db.refresh(new_suggest)
        print("put into DB")

    return answer

@router.get("/get_all_suggest", tags = ["suggest"])
def get_suggest(current_user: models.UserInfo = Depends(oauth2.get_current_active_user), db: Session = Depends(get_db)):

    user = db.query(models.UserInfo).filter(models.UserInfo.user_id == current_user.user_id).first()
    print(user)

    df = pd.DataFrame(columns=["question", "answer"])    
    for s in user.suggestions[-1:-10:-1]:
        df = pd.concat([df, pd.DataFrame([{"question": s.question, "answer": s.answer}])], ignore_index=True)

    print(df.shape)
    return df.to_dict(orient="records")