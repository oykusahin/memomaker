import os

from pathlib import Path
from fastapi import UploadFile, File, APIRouter, Depends
from sqlalchemy.orm import Session

from services.exif import extract_exif_data
from db.models import Image, Person
from db.database import get_db

router = APIRouter()

@router.get("/items/")
async def get_items(db: Session = Depends(get_db)):
    images = db.query(Image).all()
    persons = db.query(Person).all()
    person_selected_map = {p.id: p.is_selected for p in persons}

    result = []
    for img in images:
        person_ids = set(img.person_ids or [])
        if not person_ids:
            continue
        # Only include images where all person_ids are selected
        if not all(person_selected_map.get(pid, False) for pid in person_ids):
            continue

        result.append({
            "id": img.id,
            "filename": img.file_path.split("/")[-1],
            "file_path": img.file_path,
            "datetime": str(img.datetime) if img.datetime else None,
            "latitude": img.latitude,
            "longitude": img.longitude,
            "person_ids": list(person_ids),
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