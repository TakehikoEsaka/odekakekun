from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from hashing import Hash
import schemas
import models
import oauth2
from database import get_db

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

@router.post("/login", tags = ["user"])
def login(request: schemas.UserInfo, db: Session = Depends(get_db)):
    userinfo = db.query(models.UserInfo).filter(models.UserInfo.email == request.email).first()
    if not userinfo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"invalid credentials")
    
    print(request.password)
    print(userinfo.password)

    if Hash.verify(request.password, userinfo.password):
        print("wrong")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Incorrect password")
    
    print("correct")
    # token = access_token.create_access_token(data = {"sub" : request.email})
    # return {"token" : token, "token_type" : "bearer"}

    return 