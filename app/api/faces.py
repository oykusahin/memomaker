from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.models import Person
from db.database import get_db

router = APIRouter()

@router.get("/faces/")
def list_faces(db: Session = Depends(get_db)):
    faces = db.query(Person).all()
    return [
        {
            "id": person.person_id,
            "img": f"/static/{person.avatar_path}",  # Adjust path as needed
            "name": f"Person {i+1}"  # Or use a real name if available
        }
        for i, person in enumerate(faces)
    ]