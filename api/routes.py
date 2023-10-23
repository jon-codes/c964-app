import requests
from timezonefinder import TimezoneFinder

from flask import abort, json, request
from werkzeug.exceptions import HTTPException
from api import app


tf = TimezoneFinder()


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps(
        {
            "code": e.code,
            "name": e.name,
            "description": e.description,
        }
    )
    response.content_type = "application/json"
    return response


@app.route("/api/heartbeat")
def heartbeat_api():
    return {"status": "healthy"}


@app.route("/api/geocode")
def geocode_api():
    search = request.args.get("search")
    return {}


@app.route("/api/reverse_geocode")
def reverse_geocode_api():
    return {}


@app.route("/api/weather")
def weather_api():
    lat = float(request.args.get("lat"))
    lng = float(request.args.get("lng"))
    payload = {
        "latitude": lat,
        "longitude": lng,
        "start_date": "2022-01-01",
        "end_date": "2023-01-01",
        "daily": "temperature_2m_mean",
        "temperature_unit": "fahrenheit",
        "timezone": tf.timezone_at(lat=lat, lng=lng),
    }
    r = requests.get("https://archive-api.open-meteo.com/v1/archive", params=payload)

    CDD65 = 0
    HDD65 = 0

    for mean_temp in r.json()["daily"]["temperature_2m_mean"]:
        if mean_temp > 65:
            CDD65 += mean_temp - 65
        elif mean_temp < 65:
            HDD65 += 65 - mean_temp

    return {"HDD65": int(HDD65), "CDD65": int(CDD65)}


@app.route("/api/predictions")
def predictions_api():
    return {}


@app.route("/api/predict")
def predict_api():
    return {}
