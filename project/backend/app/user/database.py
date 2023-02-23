from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./user.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread" : False})

sessionLocal = sessionmaker(bind=engine, autoflush=False)

Base = declarative_base()