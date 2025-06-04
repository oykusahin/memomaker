from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import ScrapbookItem, Face, Person
from pydantic import BaseModel
from typing import List

class SelectedFacesRequest(BaseModel):
    face_ids: List[str]
    scrapbook_id: int

router = APIRouter()

@router.post("/selected_faces/")
def save_selected_faces(
    req: SelectedFacesRequest,
    db: Session = Depends(get_db)
):
    scrapbook = db.query(ScrapbookItem).filter(ScrapbookItem.id == req.scrapbook_id).first()
    if not scrapbook:
        raise HTTPException(status_code=404, detail="Scrapbook not found")
    scrapbook.selected_face_ids = req.face_ids
    db.commit()
    return {"status": "ok"}

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
        })
    return result

@router.patch("/faces/person/{person_id}/")
def update_person_name(person_id: str, name: str = Query(...), db: Session = Depends(get_db)):
    person = db.query(Person).filter(Person.id == person_id).first()
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    person.name = name
    db.commit()
    db.refresh(person)
    return {"id": person.id, "name": person.name}