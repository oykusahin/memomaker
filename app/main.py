from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from db.database import engine
from db import models  # ensure all models are loaded

from api.upload import router as upload_router
from api.items import router as items_router
from api.faces import router as faces_router
from api.cover_titles import router as cover_titles_router

# Create all tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this for your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static file directory (serves from project root's storage/)
app.mount("/storage", StaticFiles(directory="../storage"), name="storage")

# Root endpoint
@app.get("/")
def root():
    return {"message": "Memomaker App backend is running"}

# Include API routers
app.include_router(upload_router, prefix="/api")
app.include_router(items_router, prefix="/api")
app.include_router(faces_router, prefix="/api")
app.include_router(cover_titles_router, prefix="/api")