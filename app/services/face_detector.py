import os
import uuid
from pathlib import Path
from PIL import Image, ExifTags
import numpy as np
import face_recognition
from db.models import ScrapbookItem, Face, Person, Image as DBImage

# Absolute path to the faces directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FACES_DIR = os.path.join(PROJECT_ROOT, "storage", "faces")

def _load_and_orient_image(image_path):
    pil_image = Image.open(image_path)
    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = pil_image._getexif()
        if exif is not None:
            orientation_value = exif.get(orientation, None)
            if orientation_value == 3:
                pil_image = pil_image.rotate(180, expand=True)
            elif orientation_value == 6:
                pil_image = pil_image.rotate(270, expand=True)
            elif orientation_value == 8:
                pil_image = pil_image.rotate(90, expand=True)
    except Exception:
        pass
    return np.array(pil_image)

def detect_and_store_faces(image_path, image_id, db):
    os.makedirs(FACES_DIR, exist_ok=True)

    # Fix orientation before detection
    image = _load_and_orient_image(image_path)
    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)

    # --- Remove area-based filtering: process all detected faces ---
    filtered_face_locations = face_locations
    filtered_face_encodings = face_encodings

    # Get all persons and their avatar encodings
    existing_persons = db.query(Person).all()
    person_encodings = []
    for person in existing_persons:
        if person.avatar_path:
            avatar_img_path = os.path.join(PROJECT_ROOT, person.avatar_path)
            if os.path.exists(avatar_img_path):
                avatar_img = _load_and_orient_image(avatar_img_path)
                avatar_locations = face_recognition.face_locations(avatar_img)
                avatar_encodings = face_recognition.face_encodings(avatar_img, avatar_locations)
                if avatar_encodings:
                    person_encodings.append((person, avatar_encodings[0]))

    base_filename = Path(image_path).stem
    detected_person_ids = set()

    for idx, (location, encoding) in enumerate(zip(filtered_face_locations, filtered_face_encodings)):
        top, right, bottom, left = location
        face_image = image[top:bottom, left:right]
        pil_image = Image.fromarray(face_image)

        matched_person = None
        for person, avatar_encoding in person_encodings:
            # Slightly increase tolerance for better matching
            matches = face_recognition.compare_faces([avatar_encoding], encoding, tolerance=0.6)
            if matches[0]:
                matched_person = person
                break

        face_id = str(uuid.uuid4())
        face_filename = f"{base_filename}_face_{idx}_{face_id}.jpg"
        abs_face_path = os.path.join(FACES_DIR, face_filename)
        pil_image.save(abs_face_path)
        rel_face_path = f"storage/faces/{face_filename}"

        if matched_person:
            person_id = matched_person.id
        else:
            person_id = str(uuid.uuid4())
            new_person = Person(
                id=person_id,
                avatar_path=rel_face_path
            )
            db.add(new_person)
            db.flush()
            person_encodings.append((new_person, encoding))

        detected_person_ids.add(person_id)

        new_face = Face(
            id=face_id,
            person_id=person_id,
            image_id=image_id,
            bbox={"top": top, "right": right, "bottom": bottom, "left": left},
            face_path=rel_face_path
        )
        db.add(new_face)

    image_row = db.query(DBImage).filter(DBImage.id == image_id).first()
    if image_row:
        image_row.person_ids = list(detected_person_ids)

    db.commit()