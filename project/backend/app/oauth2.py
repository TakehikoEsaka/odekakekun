from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from typing import Optional
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt
from jose.exceptions import JWTError

import models
import schemas
from database import get_db

# ログインしている時としていない時でAPIを共通化するためにauthorizeをoptionalにする
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

SECRET_KEY ="6f978666cf23294cea2d486a5a6fc17f9b368dac153cdc011fc01fa11703b419"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_TIME = 30

def create_access_token(data: dict, expire_delta : Optional[timedelta] = None):
    to_encode = data.copy()
    if expire_delta:
        expire = datetime.utcnow() + expire_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_TIME)
    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # フロントからのデータのもらい方は要改善
    if token != "None":
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Colud not validate credentials',
            headers={'WWW-Authenticate': "Bearer"}
        )

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            email: str = payload.get("sub")
            if email is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        current_user = db.query(models.UserInfo).filter(models.UserInfo.email == schemas.TokenData(email=email).email).first()
        if current_user is None:
            raise credentials_exception
        return current_user
    else:
        return None

async def get_current_active_user(current_user: schemas.UserInfo = Depends(get_current_user)):
    return current_user