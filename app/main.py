from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from db import models
from db.database import engine
from api.upload import router as upload_router
from api.items import router as items_router

models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directory to serve uploaded images
app.mount("/storage", StaticFiles(directory="storage"), name="storage")

# Create database tables (if not exist)
models.Base.metadata.create_all(bind=engine)

# Root route
@app.get("/")
def root():
    return {"message": "Memomaker App backend is running"}

# Include API routers
app.include_router(upload_router, prefix="/api")
app.include_router(items_router, prefix="/api")
