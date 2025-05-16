from fastapi import FastAPI
from db import models
from db.database import engine
from api.upload import router as upload_router 
from api.items import router as items_router 
from ui.gradio_ui import build_gradio_app
from gradio.routes import mount_gradio_app

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Memomaker App backend is running"}

app.include_router(upload_router, prefix="/api")
app.include_router(items_router, prefix="/api")

gradio_app = build_gradio_app()
app = mount_gradio_app(app, gradio_app, path="/ui")
