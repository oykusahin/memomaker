import gradio as gr
import requests

API_URL = "http://localhost:8000/api/uploadfile/"

def upload_and_display(file):
    with open(file.name, "rb") as f:
        files = {"file": (file.name, f, "multipart/form-data")}
        response = requests.post(API_URL, files=files)
        if response.status_code == 200:
            data = response.json()
            return f""" Uploaded: {data['filename']}
                        Datetime: {data.get('datetime')}
                        Latitude: {data.get('latitude')}
                        Longitude: {data.get('longitude')}
                        """
        else:
            return f"Upload failed: {response.text}"

def build_gradio_app():
    demo = gr.Interface(
        fn=upload_and_display,
        inputs=gr.File(type="filepath", label="Upload Image"),
        outputs=gr.Textbox(label="EXIF Metadata"),
        title="Scrapbook Uploader",
        description="Upload a photo and get EXIF metadata (datetime + GPS)"
    )
    return demo
