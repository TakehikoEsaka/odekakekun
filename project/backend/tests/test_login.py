EMAIL = "example6@example.com"
PASSWORD = "chimichangas4life"

# fixtureで定義したtest_client関数を引数に指定することで紐付けが可能
def test_create_user(test_client):

    response = test_client.post(
        "/create_user/",
        data={"username": EMAIL, "password": PASSWORD},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["username"] == EMAIL

def test_get_token(test_client):

    response = test_client.post(
        "/token/",
        data={"username": EMAIL, "password": PASSWORD},
    )
    assert response.status_code == 200, response.text

    TOKEN = response.json()["access_token"]

def test_session_check(test_client):

    # TODO test関数は上から順番に実行されているみたいだが、1つ前のテストの値を再利用する事はできないのか
    token = test_client.post(
        "/token/",
        data={"username": EMAIL, "password": PASSWORD},
    ).json()["access_token"]

    response = test_client.get(
        "/login/session-check/",
        headers = {
            "Authorization": f"Bearer {token}"
        }
    )
    assert response.status_code == 200, response.text