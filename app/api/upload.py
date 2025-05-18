from pathlib import Path
from fastapi import UploadFile, File, APIRouter, Depends
from sqlalchemy.orm import Session

from db.models import ScrapbookItem
from db.database import get_db
from services.exif import extract_exif_data
from services.caption import generate_caption

router = APIRouter()

@router.post("/uploadfile/")
async def create_upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Ensure storage/ folder exists
        storage_dir = Path("storage")
        storage_dir.mkdir(parents=True, exist_ok=True)

        # Save image to disk
        file_path = storage_dir / file.filename
        contents = await file.read()
        file_path.write_bytes(contents)

        # Extract EXIF metadata
        exif = extract_exif_data(file_path)
        exif_datetime = exif.get("datetime")
        exif_latitude = exif.get("latitude")
        exif_longitude = exif.get("longitude")

        # Generate a caption using Ollama
        description = generate_caption(
            date=exif_datetime,
            lat=exif_latitude,
            lon=exif_longitude,
            mode="default"  # later this can be controlled via UI
        )

        # Save all info into DB
        item = ScrapbookItem(
            filename=file.filename,
            file_path=str(file_path),
            exif_datetime=exif_datetime,
            exif_latitude=exif_latitude,
            exif_longitude=exif_longitude,
            description_text=description,
            processing_status="captioned"
        )

        db.add(item)
        db.commit()
        db.refresh(item)

        # Return structured response
        return {
            "id": item.id,
            "filename": item.filename,
            "datetime": str(item.exif_datetime) if item.exif_datetime else None,
            "latitude": item.exif_latitude,
            "longitude": item.exif_longitude,
            "description": item.description_text
        }

    except Exception as e:
        return {"error": str(e)}