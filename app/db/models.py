from sqlalchemy import Column, Integer, String, Float, DateTime
from db.database import Base

class ScrapbookItem(Base):
    __tablename__ = "scrapbook_items"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    datetime = Column(DateTime, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    description_text = Column(String, nullable=True)
