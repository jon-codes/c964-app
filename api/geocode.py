from flask import Blueprint, abort, request, current_app

from marshmallow import Schema, fields, validate, ValidationError
from api.cache import get_cache

bp = Blueprint("geocode", __name__, url_prefix="/api/geocode")


class GeocodeParamsSchema(Schema):
    search = fields.String(required=False, validate=validate.Length(min=3))
    lat = fields.Float(required=False, validate=validate.Range(-90, 90))
    lng = fields.Float(required=False, validate=validate.Range(-180, 180))


class GeocodeResponseSchema(Schema):
    id = fields.String()
    formatted = fields.String()
    lat = fields.Float()
    lng = fields.Float()


def format_result(result):
    targets = [
        "postcode",
        "city",
        "state",
        "country",
    ]

    formatted_parts = []

    for target in targets:
        if target in result["components"]:
            formatted_parts.append(result["components"][target])

    return ", ".join(formatted_parts)


@bp.route("/", methods=["GET"])
def api_geocode():
    try:
        params = GeocodeParamsSchema().load(request.args)
    except ValidationError as err:
        abort(400, err.messages)

    if params.get("search"):
        search = params["search"]
    else:
        search = f"{params['lat']}, {params['lng']}"

    payload = {
        "q": search,
        "abbrv": 1,
        "countrycode": "us",
        "limit": 5,
        "no_record": 1,
        "key": current_app.config["OPENCAGE_KEY"],
    }

    res = get_cache().get(
        "https://api.opencagedata.com/geocode/v1/json", params=payload
    )
    res.raise_for_status()

    results = res.json()

    results = res.json()["results"]
    unique_results = list(
        {result["annotations"]["geohash"]: result for result in results}.values()
    )
    formatted_results = [
        {
            "id": result["annotations"]["geohash"],
            "formatted": format_result(result),
            "lat": result["geometry"]["lat"],
            "lng": result["geometry"]["lng"],
        }
        for result in unique_results
    ]

    return GeocodeResponseSchema(
        many=True, only=["id", "formatted", "lat", "lng"]
    ).dump(formatted_results)
