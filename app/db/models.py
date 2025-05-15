from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from app.db.database import Base

class ScrapbookItem(Base):
    __tablename__ = "scrapbook_items"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    upload_timestamp = Column(DateTime(timezone=True), server_default=func.now())
    exif_datetime = Column(DateTime, nullable=True)
    exif_latitude = Column(Float, nullable=True)
    exif_longitude = Column(Float, nullable=True)
    location_text = Column(String, nullable=True)     
    description_text = Column(Text, nullable=True)   
    processing_status = Column(String, default="pending")
