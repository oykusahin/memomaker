from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class TitleRequest(BaseModel):
    palette: str

class TitleSuggestions(BaseModel):
    suggestions: List[str]

@router.post("/generate_cover_title/", response_model=TitleSuggestions)
async def generate_cover_title(data: TitleRequest):
    palette = data.palette
    # TODO: Replace with your AI logic
    suggestions = [
        f"{palette} Memories",
        f"{palette} Adventures",
        f"{palette} Moments",
    ]
    return {"suggestions": suggestions}