from users.database import Base
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class UserInfo(Base):
    __tablename__ = "userinfo"
    # __table_args__ = {'extend_existing': True}

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)

class Suggest(Base):
    __tablename__ = "suggestion"
    # __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('userinfo.user_id'), nullable=False)
    question_uuid = Column(String)
    place = Column(String)
    time = Column(String)
    way = Column(String)
    suggest_place = Column(String)
    suggest_description = Column(String)
    suggest_distance = Column(String)

    # ここに相手のクラス名を入れておくとUserクラスからSuggestの内容をとれてコードの冗長化を防げる
    # 1対多の多側に入れておく
    user = relationship("UserInfo", backref="suggestions")

# class User(Base):
#     __tablename__ = "users"
#     # __table_args__ = {'extend_existing': True}

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)
#     is_active = Column(Boolean, default=True)
