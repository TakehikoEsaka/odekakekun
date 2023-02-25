from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from hashing import Hash
import random
import string

# pathlib対応する
from .. import schemas
from .. import models
from .. import get_db

router = APIRouter()

@router.get("/user/{id}", tags = ["user"])
def get_user(email : str, db: Session = Depends(get_db)):
    user = db.query(models.UserInfo).filter(models.email == email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"your userinfo is not found")
    return user

@router.post("/create_user", tags = ["user"])  
def create_user(request: schemas.UserInfo, db: Session = Depends(get_db)):
    # ここに一位なemailが入ってくることを記述する 

    hashed_password = Hash.bycrypt(request.password)
    new_user = models.UserInfo(email = request.email, password = hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/login", tags = ["user"])
def login(request: schemas.UserInfo, db: Session = Depends(get_db)):
    userinfo = db.query(models.UserInfo).filter(models.UserInfo.email == request.email).first()
    if not userinfo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"invalid credentials")
    
    if not Hash.verify(userinfo.password, request.email):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Incorrect password")
    return userinfo