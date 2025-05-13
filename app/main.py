from fastapi import FastAPI
from db import models
from db.database import engine
from api.upload import router as upload_router  # adjust if your path is different

# Create all tables from models
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Health check route
@app.get("/")
def root():
    return {"message": "Scrapbook backend is running"}

# Register your /uploadfile/ route with /api prefix
app.include_router(upload_router, prefix="/api")