import os
import uuid
from pathlib import Path
from PIL import Image
import numpy as np
import face_recognition
from torchreid import utils
from db.models import Person, Face, Image as DBImage

extractor = utils.FeatureExtractor(
    model_name='osnet_x1_0',
    model_path='app/cv/osnet_ms_d_c.pth.tar',
    device='cpu'
)

def is_same_person(feature1, feature2, threshold=0.6):
    feature1 = np.array(feature1)
    feature2 = np.array(feature2)
    similarity = np.dot(feature1, feature2) / (np.linalg.norm(feature1) * np.linalg.norm(feature2))
    return similarity > threshold

def detect_and_store_faces(image_path, image_id, db):
    output_dir = "storage/faces"
    os.makedirs(output_dir, exist_ok=True)

    image = face_recognition.load_image_file(image_path)
    face_locations = face_recognition.face_locations(image)

    # Load all existing persons and their features
    existing_persons = db.query(Person).all()
    person_features = []
    for person in existing_persons:
        if person.feature_vector is not None:
            person_features.append((person, np.array(person.feature_vector)))

    base_filename = Path(image_path).stem

    for idx, (top, right, bottom, left) in enumerate(face_locations):
        face_image = image[top:bottom, left:right]
        pil_image = Image.fromarray(face_image)
        feature = extractor(face_image)[0].tolist()

        matched_person = None
        for person, avatar_feature in person_features:
            if is_same_person(feature, avatar_feature):
                matched_person = person
                break

        face_id = str(uuid.uuid4())
        face_filename = f"{base_filename}_face_{idx}_{face_id}.jpg"
        face_path = os.path.join(output_dir, face_filename)
        pil_image.save(face_path)

        if matched_person:
            person_id = matched_person.id
        else:
            # Create new person
            person_id = str(uuid.uuid4())
            new_person = Person(
                id=person_id,
                avatar_path=face_path,
                feature_vector=feature
            )
            db.add(new_person)
            db.flush()  # Get id for relationship

        # Store face instance
        new_face = Face(
            id=face_id,
            person_id=person_id,
            image_id=image_id,
            bbox={"top": top, "right": right, "bottom": bottom, "left": left},
            feature_vector=feature,
            face_path=face_path
        )
        db.add(new_face)

    db.commit()