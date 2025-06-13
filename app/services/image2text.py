import os
from typing import List
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration

# Load BLIP model and processor once at module level
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def generate_image_caption(image_path: str) -> str:
    """Generate a caption for a single image using BLIP."""
    try:
        image = Image.open(image_path).convert('RGB')
        inputs = processor(image, return_tensors="pt")
        out = model.generate(**inputs)
        caption = processor.decode(out[0], skip_special_tokens=True)
        return caption
    except Exception as e:
        return f"[Caption Error: {str(e)}]"

def suggest_scrapbook_titles(image_paths: List[str], palette: str = None) -> List[str]:
    """
    Generate scrapbook title suggestions based on captions of selected images.
    Optionally include palette name in the suggestion.
    """
    captions = []
    for path in image_paths:
        if os.path.exists(path):
            captions.append(generate_image_caption(path))
    # Simple title suggestion logic: combine captions and palette
    if not captions:
        return ["My Memories", "Special Moments", "Our Story"]

    # Use the most common words or themes for title suggestions
    joined = " ".join(captions)
    base_titles = [
        f"{palette} Memories" if palette else "Memories",
        f"{palette} Adventures" if palette else "Adventures",
        f"{palette} Moments" if palette else "Moments",
        f"{palette} Highlights" if palette else "Highlights",
    ]
    # Add a title based on the first caption
    if captions:
        base_titles.append(f"{captions[0].capitalize()}")

    return base_titles[:5]