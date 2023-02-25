from typing import Optional
from datetime import datetime, timedelta
from jose import jwt

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