from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from db.models import Image as DBImage
from db.database import get_db
from services.face_detector import detect_and_store_faces
import os
from datetime import datetime

router = APIRouter()

@router.post("/uploadfiles/")
async def upload_files(files: list[UploadFile] = File(...), db: Session = Depends(get_db)):
    for file in files:
        file_location = f"storage/{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        # Create image record
        image = DBImage(
            file_path=file_location,
            datetime=datetime.now()
        )
        db.add(image)
        db.flush()  # Get image.id
        detect_and_store_faces(file_location, image.id, db)
    db.commit()
    return {"status": "ok"}