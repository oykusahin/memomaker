import requests

def generate_caption(date=None, lat=None, lon=None, mode="default", model="mistral") -> str:
    # Build base prompt
    prompt = "Generate a short caption for a photograph."

    if date:
        prompt += f" The photo was taken on {date}."
    if lat is not None and lon is not None:
        prompt += f" The GPS coordinates are {lat:.5f}, {lon:.5f}."

    # Adjust prompt based on mode
    if mode == "romantic":
        prompt += " Make the caption emotionally expressive and romantic."
    elif mode == "historical":
        prompt += " Explain the possible historical context of the photo's location and time."
    elif mode == "journalistic":
        prompt += " Use a formal and informative tone as if writing for a news article."

    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post("http://localhost:11434/api/generate", json=payload)
        response.raise_for_status()
        result = response.json()
        return result.get("response", "").strip()
    except Exception as e:
        return f"[Caption Error: {str(e)}]"