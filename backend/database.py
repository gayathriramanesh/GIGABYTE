from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
import os
from dotenv import load_dotenv

env_mode = os.getenv("ENV_MODE", "development")
if env_mode == "production":
    load_dotenv(".env.production")
else:
    load_dotenv(".env")  


URL_DATABASE = os.getenv("DATABASE_URL")

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()






