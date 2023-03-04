from typing import Union
from pydantic import BaseModel

class UserInfo(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token : str
    token_type : str

class TokenData(BaseModel):
    email: Union[str, None] = None