from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
from datetime import datetime

def _convert_to_degrees(value):
    def to_float(x):
        return float(x[0]) / float(x[1]) if isinstance(x, tuple) else float(x)

    d = to_float(value[0])
    m = to_float(value[1])
    s = to_float(value[2])

    return d + (m / 60.0) + (s / 3600.0)

def extract_exif_data(image_path: str) -> dict:
    try:
        image = Image.open(image_path)
        exif_data = image._getexif()
       
        if not exif_data:
            return {"datetime": None, "latitude": None, "longitude": None}

        data = {
            "datetime": None,
            "latitude": None,
            "longitude": None,
        }

        gps_info = {}

        for tag_id, value in exif_data.items():
            tag = TAGS.get(tag_id, tag_id)

            if tag in ["DateTimeOriginal", "DateTime"]:
                try:
                    data["datetime"] = datetime.strptime(value, "%Y:%m:%d %H:%M:%S")
                except Exception:
                    pass

            elif tag == "GPSInfo":
                for key in value:
                    gps_tag = GPSTAGS.get(key, key)
                    gps_info[gps_tag] = value[key]

        if "GPSLatitude" in gps_info and "GPSLatitudeRef" in gps_info:
            lat = _convert_to_degrees(gps_info["GPSLatitude"])
            if gps_info["GPSLatitudeRef"] in ["S"]:
                lat = -lat
            data["latitude"] = lat

        if "GPSLongitude" in gps_info and "GPSLongitudeRef" in gps_info:
            lon = _convert_to_degrees(gps_info["GPSLongitude"])
            if gps_info["GPSLongitudeRef"] in ["W"]:
                lon = -lon
            data["longitude"] = lon

        return data

    except Exception as e:
        print("EXIF error:", e)
        return {"datetime": None, "latitude": None, "longitude": None}