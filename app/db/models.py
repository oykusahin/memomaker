from sqlalchemy import Column, Integer, String
from db.database import Base

class Test(Base):
    __tablename__ = "test"

    id = Column(Integer, primary_key=True, index=True)
    test_text = Column(String, nullable=False)
