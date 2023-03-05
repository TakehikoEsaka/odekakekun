from database import Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

class UserInfo(Base):
    __tablename__ = "userinfo"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    password = Column(String)

class Suggest(Base):
    __tablename__ = "suggestion"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('userinfo.user_id'), nullable=False)
    question = Column(String)
    answer = Column(String)

    # ここに相手のクラス名を入れておくとUserクラスからSuggestの内容をとれてコードの冗長化を防げる
    # 1対多の多側に入れておく
    user = relationship("UserInfo", backref="suggestions")