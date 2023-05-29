from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

class Hash():
    def bycrypt(password : str):
        return pwd_context.hash(password)

    def verify(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

if __name__ == "__main__":
    print(Hash.verify("peanut", "$2b$12$4rZCSOeSxiGrb.3Lc4mAYOtuK/8i6r26dnLcCrR4lvoaVhFNULWB2"))