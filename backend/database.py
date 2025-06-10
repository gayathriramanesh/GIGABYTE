from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

URL_DATABASE = 'postgresql://gayathri:presidentofindia1^@localhost:5432/login'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()






