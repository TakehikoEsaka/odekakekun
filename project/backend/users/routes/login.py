from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from users.hashing import Hash
from users import schemas
from users import models
from users.database import get_db
from users import oauth2
import logging
# ASK Importの仕方によってエラーが起こる理由を調べる

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
# print文をログに出力するハンドラを追加
handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
logger.addHandler(handler)

router = APIRouter()


@router.post("/api/create_user", tags=["login"])
def create_user(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        hashed_password = Hash.bycrypt(request.password)
        new_user = models.UserInfo(username=request.username, password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()
        # このHTTP Exceptionを使うとDB周りの例外処理が扱いやすくなる
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already registered")
    logger.info("new user is %s", new_user)
    print("new user is ", new_user.username)
    return new_user


# tokenという名前以外はつけれないので注意
@router.post('/api/token', response_model=schemas.Token, tags=["login"])
def get_token(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    userinfo = db.query(models.UserInfo).filter(models.UserInfo.username == request.username).first()

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

    access_token = oauth2.create_access_token(data={'sub': userinfo.username})

    return {
        'access_token': access_token,
        'token_type': 'bearer'
    }


# session check
@router.get('/api/login/session-check', tags=["login"])
def get_suggest(current_user: models.UserInfo = Depends(oauth2.get_current_active_user), db: Session = Depends(get_db)):
    # TODO ここをユーザー情報をつけて認証するフローを入れる。今は
    # print("request.username is : ", request.username)
    if current_user:
        return True
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='401 unauthorized'
        )
