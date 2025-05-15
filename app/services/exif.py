from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
from datetime import datetime

def _get_decimal_from_dms(dms, ref):
    degrees, minutes, seconds = dms
    decimal = degrees + (minutes / 60.0) + (seconds / 3600.0)
    if ref in ["S", "W"]:
        decimal = -decimal
    return decimal

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

            if tag == "DateTimeOriginal" or tag == "DateTime":
                try:
                    data["datetime"] = datetime.strptime(value, "%Y:%m:%d %H:%M:%S")
                except Exception:
                    pass

            elif tag == "GPSInfo":
                for key in value:
                    gps_tag = GPSTAGS.get(key, key)
                    gps_info[gps_tag] = value[key]

        if "GPSLatitude" in gps_info and "GPSLatitudeRef" in gps_info:
            lat_dms = [float(x[0]) / float(x[1]) for x in gps_info["GPSLatitude"]]
            data["latitude"] = _get_decimal_from_dms(lat_dms, gps_info["GPSLatitudeRef"])

        if "GPSLongitude" in gps_info and "GPSLongitudeRef" in gps_info:
            lon_dms = [float(x[0]) / float(x[1]) for x in gps_info["GPSLongitude"]]
            data["longitude"] = _get_decimal_from_dms(lon_dms, gps_info["GPSLongitudeRef"])

        return data

    except Exception:
        return {"datetime": None, "latitude": None, "longitude": None}