from fastapi import FastAPI
from database import Base
from sqlalchemy import Column, String, Integer

class UserInfo(Base):
    __tablename__ = "userinfo"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    password = Column(String)
