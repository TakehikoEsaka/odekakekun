from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# TODO appからみた相対パスになってるのでposix pathに直す
DATABASE_URL = "sqlite:///./db/user.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread" : False})

sessionLocal = sessionmaker(bind=engine, autoflush=False)

Base = declarative_base()

def get_db():
    """endpointからアクセス時に、Dependで呼び出しdbセッションを生成する
    エラー時はcloseする
    """

    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()