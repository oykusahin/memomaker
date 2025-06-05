from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import ScrapbookItem, Face, Person
from pydantic import BaseModel
from typing import List

class SelectedPersonsRequest(BaseModel):
    person_ids: List[str]

router = APIRouter()

@router.post("/selected_persons/")
def save_selected_persons(
    req: SelectedPersonsRequest,
    db: Session = Depends(get_db)
):
    # Set is_selected=True for selected, False for others
    all_persons = db.query(Person).all()
    for person in all_persons:
        person.is_selected = person.id in req.person_ids
    db.commit()
    return {"status": "ok", "selected_person_ids": req.person_ids}

@router.get("/faces/")
def get_faces(db: Session = Depends(get_db)):
    faces = db.query(Face).all()
    result = []
    for face in faces:
        person = db.query(Person).filter(Person.id == face.person_id).first()
        result.append({
            "id": face.id,
            "img": "/" + face.face_path if face.face_path else "",
            "name": person.name if person else "",
            "person_id": face.person_id,
            "person_is_selected": person.is_selected if person else False,
        })
    return result