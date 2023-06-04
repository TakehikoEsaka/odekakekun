from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# TODO appからみた相対パスになってるのでposix pathに直す
# ASK コンテナで管理している時もpytestで仮のDBを作るのは自分のproject内部でよいか -> よいはず

conf ={
    'host':"anonymousendpoint.amazonaws.com",
    'port':'5432',
    'database':"DBname",
    'user':"Project",
    'password':"secret"
}

DEPLOYMENT_STAGE = os.getenv("DEPLOYMENT_STAGE")

if DEPLOYMENT_STAGE == "production" or "test" :
    engine = create_engine("sqlite:///./db/user.db", connect_args={"check_same_thread" : False})
elif DEPLOYMENT_STAGE == "deployment":
    engine = create_engine("postgresql://{user}:{password}@{host}:{port}/{database}".format(**conf), connect_args={"check_same_thread" : False})

sessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit = False)

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