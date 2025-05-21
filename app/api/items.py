import os

from pathlib import Path
from fastapi import UploadFile, File, APIRouter, Depends
from sqlalchemy.orm import Session

from services.exif import extract_exif_data
from db.models import ScrapbookItem
from db.database import get_db


router = APIRouter()

@router.get("/items/")
async def get_items(db: Session = Depends(get_db)):
    items = db.query(ScrapbookItem).all()

    result = []
    for item in items:
        result.append({
            "id": item.id,
            "filename": item.filename,
            "datetime": str(item.datetime) if item.datetime else None,
            "latitude": item.latitude,
            "longitude": item.longitude,

        })

    return result

@router.get("/items/{item_id}")
async def get_item_by_id(item_id: int, db: Session = Depends(get_db)):
    item = db.query(ScrapbookItem).filter(ScrapbookItem.id == item_id).first()

    if not item:
        return {"error": f"No item found with id {item_id}"}

    return {
        "id": item.id,
        "filename": item.filename,
        "datetime": str(item.datetime) if item.datetime else None,
        "latitude": item.latitude,
        "longitude": item.longitude,
        "status": item.processing_status
    }

