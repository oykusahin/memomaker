from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from services.image2text import suggest_scrapbook_titles

router = APIRouter()

class TitleRequest(BaseModel):
    palette: str
    image_path: Optional[str] = None  # Add this field

class TitleSuggestions(BaseModel):
    suggestions: List[str]

@router.post("/generate_cover_title/", response_model=TitleSuggestions)
async def generate_cover_title(data: TitleRequest):
    palette = data.palette
    image_paths = [data.image_path] if data.image_path else []
    suggestions = suggest_scrapbook_titles(image_paths, palette)
    return {"suggestions": suggestions}