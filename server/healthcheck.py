from flask import Blueprint
from marshmallow import Schema, fields


bp = Blueprint("healthcheck", __name__, url_prefix="/api/healthcheck")


class HealthcheckResponseSchema(Schema):
    status = fields.String()


@bp.route("/", methods=["GET"])
def heartbeat_api():
    return HealthcheckResponseSchema().dump({"status": "ok"})
