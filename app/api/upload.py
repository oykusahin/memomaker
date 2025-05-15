import os
from pathlib import Path
from fastapi import UploadFile, File, APIRouter
from services.exif import extract_exif_data
from db.models import ScrapbookItem
from sqlalchemy.orm import Session
from fastapi import Depends
from db.database import get_db

router = APIRouter()

@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...),
                             db: Session = Depends(get_db)):
    try:
        storage_dir = Path("storage")
        storage_dir.mkdir(parents=True, exist_ok=True)

        file_path = storage_dir / file.filename

        contents = await file.read()
        file_path.write_bytes(contents)
        exif = extract_exif_data(file_path)
        exif_datetime = exif.get("datetime")
        exif_latitude = exif.get("latitude")
        exif_longitude = exif.get("longitude")

        item = ScrapbookItem(
            filename=file.filename,
            file_path=str(file_path),
            exif_datetime=exif_datetime,
            exif_latitude=exif_latitude,
            exif_longitude=exif_longitude,
            processing_status="uploaded"
        )
        db.add(item)
        db.commit()
        db.refresh(item)

        return {
            "id": item.id,
            "filename": item.filename,
            "datetime": str(exif_datetime) if exif_datetime else None,
            "latitude": exif_latitude,
            "longitude": exif_longitude
        }

    except Exception as e:
        return {"error": str(e)}