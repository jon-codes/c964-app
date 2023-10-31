from requests_cache import CachedSession, SQLiteCache
from timezonefinder import TimezoneFinder

from flask import abort, json, request
from marshmallow import Schema, fields, validate, ValidationError
from werkzeug.exceptions import HTTPException
from api import app
import joblib
import os
import numpy as np
import pandas as pd

backend = SQLiteCache("cache.sqlite", fast_save=True)
session = CachedSession("global", backend=backend)

dirname = os.path.dirname(__file__)
model = joblib.load(os.path.join(dirname, "model.joblib"))

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


@app.route("/api/heartbeat", methods=["GET"])
def heartbeat_api():
    return {"status": "healthy"}


@app.route("/api/geocode", methods=["GET"])
def geocode_api():
    search = request.args.get("search")
    return {}


class ClimateParamsSchema(Schema):
    lat = fields.Float(required=True, validate=validate.Range(min=-90, max=90))
    lng = fields.Float(required=True, validate=validate.Range(min=-180, max=180))


class ClimateResponseSchema(Schema):
    HDD65 = fields.Integer()
    CDD65 = fields.Integer()


@app.route("/api/climate", methods=["GET"])
def climate_api():
    try:
        params = ClimateParamsSchema().load(request.args)
    except ValidationError as err:
        abort(400, err.messages)

    lat, lng = params["lat"], params["lng"]

    payload = {
        "latitude": lat,
        "longitude": lng,
        "start_date": "2022-01-01",
        "end_date": "2023-01-01",
        "daily": "temperature_2m_mean",
        "temperature_unit": "fahrenheit",
        "timezone": tf.timezone_at(lat=lat, lng=lng),
    }

    res = session.get("https://archive-api.open-meteo.com/v1/archive", params=payload)
    res.raise_for_status()

    CDD65 = 0
    HDD65 = 0

    for mean_temp in res.json()["daily"]["temperature_2m_mean"]:
        if mean_temp > 65:
            CDD65 += mean_temp - 65
        elif mean_temp < 65:
            HDD65 += 65 - mean_temp

    return ClimateResponseSchema().dump({"CDD65": CDD65, "HDD65": HDD65})


# class PredictBodySchema(Schema):
#     HDD65 = fields.Integer(required=True)
#     CDD65 = fields.Integer(required=True)
#     TYPEHUQ = fields.Integer(required=True)
#     CELLAR = fields.Integer(required=True)
#     BASEFIN = fields.Integer(required=True)
#     ATTIC = fields.Integer(required=True)
#     ATTICFIN = fields.Integer(required=True)
#     STORIES = fields.Integer(required=True)
#     SIZEOFGARAGE = fields.Integer(required=True)
#     YEARMADERANGE = fields.Integer(required=True)
#     BEDROOMS = fields.Integer(required=True)
#     NCOMBATH = fields.Integer(required=True)
#     NHAFBATH = fields.Integer(required=True)
#     WALLTYPE = fields.Integer(required=True)
#     ROOFTYPE = fields.Integer(required=True)
#     HIGHCEIL = fields.Integer(required=True)
#     TYPEGLASS = fields.Integer(required=True)
#     TREESHAD = fields.Integer(required=True)
#     ADQINSUL = fields.Integer(required=True)
#     FUELPOOL = fields.Integer(required=True)
#     FUELTUB = fields.Integer(required=True)
#     NUMFRIG = fields.Integer(required=True)
#     TYPERFR1 = fields.Integer(required=True)
#     ICE = fields.Integer(required=True)
#     TYPERFR2 = fields.Integer(required=True)
#     LOCRFRI2 = fields.Integer(required=True)
#     WINECHILL = fields.Integer(required=True)
#     NUMFREEZ = fields.Integer(required=True)
#     UPRTFRZR = fields.Integer(required=True)
#     RANGEFUEL = fields.Integer(required=True)
#     RCOOKUSE = fields.Integer(required=True)
#     ROVENUSE = fields.Integer(required=True)
#     COOKTOPFUEL = fields.Integer(required=True)
#     COOKTOPUSE = fields.Integer(required=True)
#     OVENFUEL = fields.Integer(required=True)
#     OVENUSE = fields.Integer(required=True)
#     MICRO = fields.Integer(required=True)
#     AMTMICRO = fields.Integer(required=True)
#     OUTGRILLFUEL = fields.Integer(required=True)
#     DISHWASH = fields.Integer(required=True)
#     DWASHUSE = fields.Integer(required=True)
#     DWCYCLE = fields.Integer(required=True)
#     CWASHER = fields.Integer(required=True)
#     TOPFRONT = fields.Integer(required=True)
#     WASHLOAD = fields.Integer(required=True)
#     WASHTEMP = fields.Integer(required=True)
#     DRYER = fields.Integer(required=True)
#     DRYRFUEL = fields.Integer(required=True)
#     DRYRUSE = fields.Integer(required=True)


@app.route("/api/predict", methods=["POST"])
def predict_api():
    body = request.get_json()
    schema = PredictSchema()
    X = pd.DataFrame([request.get_json()])
    return model.predict(X)[0]
