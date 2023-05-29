from sqlalchemy.orm import Session
from hashlib import md5 as hash_func
from . import models
from . import schemas
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
# print文をログに出力するハンドラを追加
handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
logger.addHandler(handler)


def get_user_by_email_query(db: Session, email: str):
    """get user by email"""
    return db.query(models.User).filter(models.User.email == email).first()


def create_user_query(db: Session, user: schemas.UserCreate):
    """create user by email and password"""
    hashed_password = hash_func(user.password.encode()).hexdigest()
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    # db.refresh(db_user)

    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    user_id = str(db_user.id)
    logger.info("db user id is %s", user_id)
    return db_user
