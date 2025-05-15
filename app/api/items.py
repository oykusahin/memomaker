import os
from pathlib import Path
from fastapi import UploadFile, File, APIRouter, Depends
from services.exif import extract_exif_data
from db.models import ScrapbookItem
from db.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/items/")
async def get_items(db: Session = Depends(get_db)):
    items = db.query(ScrapbookItem).all()

    result = []
    for item in items:
        result.append({
            "id": item.id,
            "filename": item.filename,
            "datetime": str(item.exif_datetime) if item.exif_datetime else None,
            "latitude": item.exif_latitude,
            "longitude": item.exif_longitude
        })

    return result
