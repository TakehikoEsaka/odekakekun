from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

from hashing import Hash
import schemas
import models
from oauth2 import create_access_token
from hashing import Hash
from database import get_db
import oauth2

router = APIRouter()

@router.post("/create_user", tags = ["login"])  
def create_user(request: schemas.UserInfo, db: Session = Depends(get_db)):
    try:
        hashed_password = Hash.bycrypt(request.password)
        new_user = models.UserInfo(email = request.email, password = hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError as e:
        db.rollback()
        # このHTTP Exceptionを使うとDB周りの例外処理が扱いやすくなる
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already registered")
    return new_user

# tokenという名前以外はつけれないので注意
@router.post('/token', response_model=schemas.Token, tags = ["login"])
def get_token(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    userinfo = db.query(models.UserInfo).filter(models.UserInfo.email == request.username).first()

    if not userinfo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Invalid credentials'
        )

    if not Hash.verify(request.password, userinfo.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Incorrect password'
        )
    
    access_token = oauth2.create_access_token(data={'sub': userinfo.email})

    return {
        'access_token': access_token,
        'token_type': 'bearer'
    }