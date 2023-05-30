EMAIL = "example6@example.com"
PASSWORD = "chimichangas4life"

# test_db: Sessionを引数にすることで事前定義したfixtureを使用する事ができる
def test_create_user(test_client):

    # OAuth2PasswordRequestFormで受け取るAPIなので、jsonパラメータではなくてdataパラメータを使う
    response = test_client.post(
        "/create_user/",
        data={"username": EMAIL, "password": PASSWORD},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["username"] == EMAIL
