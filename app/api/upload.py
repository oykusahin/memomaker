import os
from pathlib import Path
from fastapi import UploadFile, File, APIRouter

router = APIRouter()

@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    try:
        # Ensure storage folder exists
        storage_dir = Path("storage")
        storage_dir.mkdir(parents=True, exist_ok=True)

        # Build file path
        file_path = storage_dir / file.filename

        # Save file
        contents = await file.read()
        file_path.write_bytes(contents)

        return {
            "message": "File saved successfully",
            "filename": file.filename,
            "saved_path": str(file_path)
        }
    except Exception as e:
        return {"error": str(e)}
