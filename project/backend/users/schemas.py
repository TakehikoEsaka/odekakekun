# データのバリデーションやシリアライズ/デシリアライズを行うために使用する

from typing import Union
from pydantic import BaseModel

class UserInfo(BaseModel):
    

    username: str
    password: str

class Token(BaseModel):
    access_token : str
    token_type : str

class TokenData(BaseModel):
    username: Union[str, None] = None




# class UserBase(BaseModel):
#     """Base User scheme"""

#     email: str


# class UserCreate(UserBase):
#     """Input"""

#     password: str


# class User(UserBase):
#     """Output"""

#     id: int
#     is_active: bool

#     class Config:
#         orm_mode = True
