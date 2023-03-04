from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
import random
import string
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))

# pathlib対応する
import schemas
import models
from database import get_db
from oauth2 import oauth2_scheme, create_access_token
from hashing import Hash
import oauth2

router = APIRouter()

def get_suggest(db: Session, email : str):
    suggests = db.query(models.Suggest).filter(models.Suggest.email == email).first()
    if not suggests:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Suggests with {email} not found')
    return suggests

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
def get_suggest(current_user: models.UserInfo = Depends(oauth2.get_current_active_user), db: Session = Depends(get_db)):
    suggests = db.query(models.Suggest).all()
    return suggests

@router.post('/token', response_model=schemas.Token)
def get_token(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.UserInfo).filter(models.UserInfo.email == request.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Invalid credentials'
        )

    if not Hash.verify(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Incorrect password'
        )
    
    access_token = create_access_token(data={'sub': user.email})

    return {
        'access_token': access_token,
        'token_type': 'bearer'
    }