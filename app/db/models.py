from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship
from db.database import Base
from sqlalchemy.dialects.postgresql import ARRAY

import uuid

class Image(Base):
    __tablename__ = "images"
    id = Column(Integer, primary_key=True, index=True)
    file_path = Column(String, nullable=False)
    datetime = Column(DateTime, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    description_text = Column(String, nullable=True)
    faces = relationship("Face", back_populates="image")
    person_ids = Column(ARRAY(String), nullable=True)

class Person(Base):
    __tablename__ = "person"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    name = Column(String, nullable=True)
    avatar_path = Column(String, nullable=True)
    is_selected = Column(Boolean, default=False) 
    faces = relationship("Face", back_populates="person")

class Face(Base):
    __tablename__ = "faces"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    person_id = Column(String, ForeignKey("person.id"), nullable=True)  # <-- FIXED
    image_id = Column(Integer, ForeignKey("images.id"))
    bbox = Column(JSON, nullable=True)  # {top, right, bottom, left}
    face_path = Column(String, nullable=True)
    person = relationship("Person", back_populates="faces")
    image = relationship("Image", back_populates="faces")

class ScrapbookItem(Base):
    __tablename__ = "scrapbook_items"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    datetime = Column(DateTime, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    processing_status = Column(String, nullable=True)
    selected_face_ids = Column(ARRAY(String), nullable=True)  # <-- NEW COLUMN