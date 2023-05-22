import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
import random, string

SQLALCHEMY_DATABASE_URL = "sqlite:///./db/test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

# テスト用のデータベースセッションを生成するfixture
@pytest.fixture(scope="module")
def test_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        print("we will roll back !!")
        db.rollback()
        db.close()
        print("rollbaced !!")

# 別のSessionを使用するように上書き
app.dependency_overrides[get_db] = test_db

client = TestClient(app)

# TODO 今はランダムな名前にしているけど採取的にはtest@example.comでtestDBに入れて採取的にはクリーンアップしたい
EMAIL = "".join([random.choice(string.ascii_letters + string.digits) for i in range(10)]) + "@example.com"
PASSWORD = "chimichangas4life"

# TODO タイムアウトをずらして検証する
# タイムアウトを15秒に設定
@pytest.mark.timeout(10)  
def test_suggest_endpoint(test_db: Session):
    # テスト用のデータを準備
    place = "Tokyo"
    time = "1 hour"
    way = "train"

    # POSTリクエストを送信
    # TODO リクエストのタイムスタンプを記録どこかにとっておく
    # TODO リクエストの仕方がおかしいらしいのでみておく
    response = client.post(
        "/suggest",
        json={"place": place, "time": time, "way": way}
    )

    # レスポンスのステータスコードを検証
    assert response.status_code == 200

    # レスポンスのデータを検証
    data = response.json()
    assert "suggest_place" in data
    assert "suggest_distance" in data
    assert "suggest_description" in data

    # データベースのデータを検証
    # suggests = db.query(models.Suggest).filter(models.Suggest.place == place).all()
    # assert len(suggests) == 3
    # assert suggests[0].place == place
    # assert suggests[0].time == time
    # assert suggests[0].way == way

def test_get_all_suggest_endpoint(test_db: Session):
    response = client.post("/token", data={"username": EMAIL, "password": PASSWORD})

    # レスポンスのステータスコードやデータを検証する
    assert response.status_code == 200
    assert 'access_token' in response.json()
    assert response.json()['token_type'] == 'bearer'

    token = response.json()["access_token"]


    # テスト用のデータを準備
    # TODO ここはユーザーIDを入れる必要がありそう。test_DBがいるのかな
    # user = db.query(models.UserInfo).filter(models.UserInfo.username == "testuser").first()
    # user_id = user.user_id

    # GETリクエストを送信
    response = client.get("/get_all_suggest", headers={"Authorization": "Bearer {}".format(token)})

    # レスポンスのステータスコードを検証
    assert response.status_code == 200

    # レスポンスのデータ型を検証
    data = response.json()
    assert isinstance(data, list)

    # データベースのデータを検証
    # suggests = db.query(models.Suggest).filter(models.Suggest.user_id == user_id).all()
    # assert len(data) == len(suggests)