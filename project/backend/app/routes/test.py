#TODO pytestでテストを実行する
#TODO github actionsでテストが自動的に実行されるようにする

import pytest
from fastapi.testclient import TestClient
from app import app  # あなたのFastAPIアプリケーションのエントリーポイント
from sqlalchemy.orm import Session
from database import get_db
import models

client = TestClient(app)

@pytest.fixture(scope="module")
def test_db():
    # テスト用のデータベースセッションを準備
    db = next(get_db())
    try:
        # テスト用のデータをセットアップ
        user = models.UserInfo(email="test@example.com", password="password")
        db.add(user)
        db.commit()
        db.refresh(user)
        yield db
    finally:
        # テスト用のデータをクリーンアップ
        db.query(models.UserInfo).delete()
        db.commit()

def test_create_user():
    # テストケース1: ユーザーの作成が成功する場合
    response = client.post(
        "/create_user",
        data={
            "username": "new_user@example.com",
            "password": "password"
        }
    )
    assert response.status_code == 200
    assert response.json()["email"] == "new_user@example.com"

    # テストケース2: 既に登録されているユーザーの場合
    response = client.post(
        "/create_user",
        data={
            "username": "test@example.com",
            "password": "password"
        }
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "User already registered"

def test_get_token(test_db: Session):
    # テストケース1: 正しい認証情報の場合
    response = client.post(
        "/token",
        data={
            "username": "test@example.com",
            "password": "password"
        }
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

    # テストケース2: 存在しないユーザーの場合
    response = client.post(
        "/token",
        data={
            "username": "nonexistent@example.com",
            "password": "password"
        }
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Invalid credentials"

    # テストケース3: パスワードが間違っている場合
    response = client.post(
        "/token",
        data={
            "username": "test@example.com",
            "password": "wrong_password"
        }
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Incorrect password"

def test_get_suggest():
    # テストケース1: ログインしている場合
    response = client.get("/login/session-check", headers={"Authorization": "Bearer valid_token"})
    assert response.status_code == 200
    assert response.json() is True

    # テストケース2: ログイン
