from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from db.models import Image as DBImage
from db.database import get_db
from services.face_detector import detect_and_store_faces
import os
from datetime import datetime

router = APIRouter()

# Define the absolute storage directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STORAGE_DIR = os.path.join(PROJECT_ROOT, "storage/images/")

@router.post("/uploadfiles/")
async def upload_files(files: list[UploadFile] = File(...), db: Session = Depends(get_db)):
    os.makedirs(STORAGE_DIR, exist_ok=True)
    for file in files:
        file_location = os.path.join(STORAGE_DIR, file.filename)
        with open(file_location, "wb") as f:
            f.write(await file.read())
        # Save relative path in DB
        db_file_path = f"storage/images/{file.filename}"
        image = DBImage(
            file_path=db_file_path,
            datetime=datetime.now()
        )
        db.add(image)
        db.flush()
        detect_and_store_faces(file_location, image.id, db)
    db.commit()
    return {"status": "ok"}