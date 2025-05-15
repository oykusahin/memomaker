from fastapi import FastAPI
from db import models
from db.database import engine
from api.upload import router as upload_router 

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Scrapbook backend is running"}

app.include_router(upload_router, prefix="/api")