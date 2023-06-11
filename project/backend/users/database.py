from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# TODO appからみた相対パスになってるのでposix pathに直す
# ASK コンテナで管理している時もpytestで仮のDBを作るのは自分のproject内部でよいか -> よいはず

# TODO AWSでRDSにつなげるか確認する
# 参考https://repost.aws/ja/knowledge-center/ecs-fargate-task-database-connection

DEPLOYMENT_STAGE = os.getenv("DEPLOYMENT_STAGE")

if DEPLOYMENT_STAGE == "development" or "test" :
    engine = create_engine("sqlite:///./db/user.db", connect_args={"check_same_thread" : False})

elif DEPLOYMENT_STAGE == "production":
    engine = create_engine("postgresql://{user}:{password}@{host}:{port}/{database}".format(**conf), connect_args={"check_same_thread" : False})
    DB_USER = os.getenv("DBINFO").username
    DB_PASSWORD = os.getenv("DBINFO").password

    # TODO backendからdatabaseにテストデータを入れるスクリプトを作成して実行する
    conf ={
        'host':"odekakekun-db.ciqtwkmmeeo9.ap-northeast-1.rds.amazonaws.com",
        'port':'5432',
        'database':"odekakekundb",
        'user':DB_USER,
        'password':DB_PASSWORD
    }

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