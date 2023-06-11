import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import drop_database
from users.database import get_db, Base
from users.main import app
from fastapi.testclient import TestClient
import os


@pytest.fixture(autouse=True)
def set_environment_variables():
    os.environ["DEPLOYMENT_STAGE"] = "test"


@pytest.fixture(scope="module")
def SessionLocal():
    # settings of test database
    TEST_SQLALCHEMY_DATABASE_URL = "sqlite:///./test_temp.db"
    engine = create_engine(
        TEST_SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )

    # Create test database and tables
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Run the tests
    yield SessionLocal

    # Drop the test database
    drop_database(TEST_SQLALCHEMY_DATABASE_URL)


@pytest.fixture(scope="module")
def test_client(SessionLocal, *args, **kwargs):
    # テスト用のDBに接続するためのsessionmaker instanse
    #  (SessionLocal) をfixtureから受け取る

    def override_get_db():
        try:
            db = SessionLocal()
            yield db
        finally:
            # db.rollback()

            # ASK clientから実行するごとに実行されてるか見ておく
            db.close()
            pass

    # fixtureから受け取るSessionLocalを使うようにget_dbを強制的に変更
    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as client:
        yield client
