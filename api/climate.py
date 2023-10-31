from flask import Blueprint, abort, request

from timezonefinder import TimezoneFinder
from marshmallow import Schema, fields, validate, ValidationError
from api.cache import get_cache

bp = Blueprint("climate", __name__, url_prefix="/api/climate")


tf = TimezoneFinder()


class DailyTempSchema(Schema):
    day = fields.String()
    temp = fields.Float()


class ClimateParamsSchema(Schema):
    lat = fields.Float(required=True, validate=validate.Range(min=-90, max=90))
    lng = fields.Float(required=True, validate=validate.Range(min=-180, max=180))


class ClimateResponseSchema(Schema):
    HDD65 = fields.Integer()
    CDD65 = fields.Integer()
    stats = fields.List(fields.Nested(DailyTempSchema))


@bp.route("/", methods=["GET"])
def api_climate():
    try:
        params = ClimateParamsSchema().load(request.args)
    except ValidationError as err:
        abort(400, err.messages)

    lat, lng = params["lat"], params["lng"]
    payload = {
        "latitude": lat,
        "longitude": lng,
        "start_date": "2022-01-01",
        "end_date": "2022-12-31",
        "daily": "temperature_2m_mean",
        "temperature_unit": "fahrenheit",
        "timezone": tf.timezone_at(lat=lat, lng=lng),
    }

    res = get_cache().get(
        "https://archive-api.open-meteo.com/v1/archive", params=payload
    )
    res.raise_for_status()

    time_data = res.json()["daily"]["time"]
    temp_data = res.json()["daily"]["temperature_2m_mean"]
    stats = []

    CDD65 = 0
    HDD65 = 0
    for idx, temp in enumerate(temp_data):
        if temp > 65:
            CDD65 += temp - 65
        elif temp < 65:
            HDD65 += 65 - temp
        stats.append({"day": time_data[idx], "temp": temp})

    return ClimateResponseSchema().dump(
        {"CDD65": CDD65, "HDD65": HDD65, "stats": stats}
    )
