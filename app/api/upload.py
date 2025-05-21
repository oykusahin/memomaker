from fastapi import UploadFile, File, APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from pathlib import Path

from services.exif import extract_exif_data
from db.models import ScrapbookItem
from db.database import get_db

router = APIRouter()


@router.post("/uploadfile/")
async def create_upload_files(
    files: List[UploadFile] = File(...),
    mode: str = "default",
    db: Session = Depends(get_db),
):
    storage_dir = Path("storage")
    storage_dir.mkdir(parents=True, exist_ok=True)

    responses = []

    for file in files:
        file_path = storage_dir / file.filename
        contents = await file.read()
        file_path.write_bytes(contents)

        exif = extract_exif_data(file_path)

        item = ScrapbookItem(
            filename=file.filename,
            datetime=exif.get("datetime"),
            latitude=exif.get("latitude"),
            longitude=exif.get("longitude"),
            description_text="Caption will go here",  # Optional: insert actual caption generation later
        )
        db.add(item)
        db.commit()
        db.refresh(item)

        responses.append(
            {
                "id": item.id,
                "filename": item.filename,
                "datetime": item.datetime,
                "latitude": item.latitude,
                "longitude": item.longitude,
                "description": item.description_text,
            }
        )

    return responses
