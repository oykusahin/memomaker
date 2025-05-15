from fastapi import FastAPI
from db import models
from db.database import engine
from api.upload import router as upload_router 
from api.items import router as items_router 

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Memomaker App backend is running"}

app.include_router(upload_router, prefix="/api")
app.include_router(items_router, prefix="/api")