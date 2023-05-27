import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, drop_database
from app.database import get_db, Base
from app.main import app
from fastapi.testclient import TestClient

@pytest.fixture(scope="function")
def SessionLocal():
    # settings of test database
    TEST_SQLALCHEMY_DATABASE_URL = "sqlite:///./db/test_temp.db"
    engine = create_engine(
        TEST_SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )

    # assert not database_exists(
    #     TEST_SQLALCHEMY_DATABASE_URL
    # ), "Test database already exists. Aborting tests."

    # Create test database and tables
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Run the tests
    yield SessionLocal

    # Drop the test database
    drop_database(TEST_SQLALCHEMY_DATABASE_URL)

# @pytest.fixture(scope = "module")
# def client(SessionLocal, *args, **kwargs):
#     # テスト用のDBに接続するためのsessionmaker instanse
#     #  (SessionLocal) をfixtureから受け取る

#     def override_get_db():
#         try:
#             db = SessionLocal()
#             # db.begin(subtransactions=True)
#             yield db
#         finally:
#             # TODO ここの役割調べる
#             db.rollback()

#             # ASK clientから実行するごとに実行されてる。これがないと次のDBとの接続で同時に接続しようとしてエラーが出る。その理解で間違いないか？
#             db.close()
#             pass

#     # fixtureから受け取るSessionLocalを使うようにget_dbを強制的に変更
#     app.dependency_overrides[get_db] = override_get_db

#     with TestClient(app) as client:
#         yield client