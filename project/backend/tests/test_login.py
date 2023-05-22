#TODO github actionsでテストが自動的に実行されるようにする
#TODO テスト用のDBに値が入るようにする
#TODO fixtureを使って処理前にテスト用のsessionを作るようにする

import pytest
import os
from fastapi.testclient import TestClient
# アプリケーションエントリーポイントがimportされた時点で、本番用のBase.metadata.create_all(engine)が走ってuser.dbが生成される
from app.main import app
from app.database import get_db, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
import random, string
import logging
# ASK これは読み込まなくてもいいのか？
# import app.models
# TODO 先に他のテスト書いておくとよさそう（ランダムな値とかで入れておく）

SQLALCHEMY_DATABASE_URL = "sqlite:///./db/test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

# TODO fixtureファイルの共通化
# テスト用のデータベースセッションを生成するfixture
@pytest.fixture(scope="module")
def test_db():
    # テスト用のデータベースセッションを生成
    db = TestingSessionLocal()
    try:
        # テストの前処理（例：データの準備）
        yield db
    finally:
        # rollbackはcommitする前のものをもとに戻す行為なので今回のAPIの場合だとつけなくてもいい気がするが一応つけておく
        db.rollback()
        db.close()

        # ASK この2つを見てもわかる通りなぜかuser.db側にデータが入っている。なぜか？？
        # os.remove("db/test.db")
        os.remove("db/user.db")

        # これでテーブルが初期化されないのはなぜ？？
        # Base.metadata.drop_all(bind=engine)

# 別のSessionを使用するように上書き
app.dependency_overrides[get_db] = test_db

client = TestClient(app)

# TODO 今はランダムな名前にしているけど採取的にはtest@example.comでtestDBに入れて採取的にはクリーンアップしたい
# TODO ユーザー名は固定にしておかないと他のtestでバッティングしてしまう。本番のDBでもいいからrollbackがなぜできないのかみておきたい
# EMAIL = "".join([random.choice(string.ascii_letters + string.digits) for i in range(10)]) + "@example.com"
EMAIL = "example6@example.com"
PASSWORD = "chimichangas4life"

# test_db: Sessionを引数にすることで事前定義したfixtureを使用する事ができる
def test_create_user(test_db: Session):

    # OAuth2PasswordRequestFormで受け取るAPIなので、jsonパラメータではなくてdataパラメータを使う
    response = client.post(
        "/create_user/",
        data={"username": EMAIL, "password": PASSWORD},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["username"] == EMAIL 

def test_token_session_check(test_db : Session):

    # TODO ここがなぜか404になってるので解決する
    response = client.post("/token", data={"username": EMAIL, "password": PASSWORD})

    # レスポンスのステータスコードやデータを検証する
    assert response.status_code == 200
    assert 'access_token' in response.json()
    assert response.json()['token_type'] == 'bearer'

    token = response.json()["access_token"]
    print(token)
    
    response = client.get("/login/session-check", headers={"Authorization": "Bearer {}".format(token)})
    assert response.status_code == 200

