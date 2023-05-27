from starlette.testclient import TestClient
from app.database import get_db, Base
from app.main import app

def temp_db(f):
    def func(SessionLocal, *args, **kwargs):
        # テスト用のDBに接続するためのsessionmaker instanse
        #  (SessionLocal) をfixtureから受け取る

        def override_get_db():
            try:
                db = SessionLocal()
                db.begin(subtransactions=True)
                yield db
            finally:
                db.rollback()
                db.close()

        # fixtureから受け取るSessionLocalを使うようにget_dbを強制的に変更
        app.dependency_overrides[get_db] = override_get_db
        # Run tests
        f(*args, **kwargs)
        # get_dbを元に戻す
        app.dependency_overrides[get_db] = get_db

    return func


client = TestClient(app)

EMAIL = "example6@example.com"
PASSWORD = "chimichangas4life"

# test_db: Sessionを引数にすることで事前定義したfixtureを使用する事ができる
@temp_db
def test_create_user():

    # OAuth2PasswordRequestFormで受け取るAPIなので、jsonパラメータではなくてdataパラメータを使う
    response = client.post(
        "/create_user/",
        data={"username": EMAIL, "password": PASSWORD},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["username"] == EMAIL 

