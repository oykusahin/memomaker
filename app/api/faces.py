from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.models import Person
from db.database import get_db

import os

router = APIRouter()

@router.get("/faces/")
def list_faces(db: Session = Depends(get_db)):
    faces = db.query(Person).all()
    return [
        {
            "id": person.id,
            "img": f"/storage/faces/{os.path.basename(person.avatar_path)}" if person.avatar_path else None,
            "name": person.name or f"Person {i+1}"
        }
        for i, person in enumerate(faces)
    ]