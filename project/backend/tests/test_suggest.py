EMAIL = "example6@example.com"
PASSWORD = "chimichangas4life"

PLACE = "出町柳"
TIME = "30分"
WAY = "自転車"


# TODO ここにpytestの時間待機の文を入れる
def test_suggest(test_client):

    # ログイン処理の共通化をどうするか考える
    response = test_client.post(
        "/create_user/",
        data={"username": EMAIL, "password": PASSWORD},
    )
    assert response.status_code == 200, response.text

    response = test_client.post(
        "/token/",
        data={"username": EMAIL, "password": PASSWORD},
    )
    assert response.status_code == 200, response.text
    token = response.json()["access_token"]

    response = test_client.post(
        "/suggest/",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
            "accept": "application/json"
        },
        params={
            "place": PLACE,
            "time": TIME,
            "way": WAY
        }
    )
    assert response.status_code == 200, response.text


def test_get_all_suggest(test_client):
    response = test_client.post(
        "/token/",
        data={"username": EMAIL, "password": PASSWORD},
    )
    assert response.status_code == 200, response.text
    token = response.json()["access_token"]

    response = test_client.get(
        "/get_all_suggest/",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
            "accept": "application/json"
        }
    )
    assert response.status_code == 200, response.text
