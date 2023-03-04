from database import Base
from sqlalchemy import Column, String, Integer

class Suggest(Base):
    __tablename__ = "suggestion"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String)
    answer = Column(String)

class UserInfo(Base):
    __tablename__ = "userinfo"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    password = Column(String)
