import os
import joblib
import pandas as pd
from flask import Blueprint, abort, request

from marshmallow import Schema, fields, validate, pre_load, ValidationError

bp = Blueprint("predict", __name__, url_prefix="/api/predict")

dirname = os.path.dirname(__file__)
model = joblib.load(os.path.join(dirname, "model.joblib"))


class PredictBodySchema(Schema):
    HDD65 = fields.Integer(
        required=False, allow_none=True, validate=validate.Range(min=0)
    )
    CDD65 = fields.Integer(
        required=False, allow_none=True, validate=validate.Range(min=0)
    )
    TYPEHUQ = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5"]),
    )
    CELLAR = fields.Boolean(required=False, allow_none=True)
    BASEFIN = fields.Boolean(required=False, allow_none=True)
    ATTIC = fields.Boolean(required=False, allow_none=True)
    ATTICFIN = fields.Boolean(required=False, allow_none=True)
    STORIES = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5"]),
    )
    SIZEOFGARAGE = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3"]),
    )
    YEARMADERANGE = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9"]),
    )
    BEDROOMS = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NCOMBATH = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NHAFBATH = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    WALLTYPE = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5", "6", "7", "99"]),
    )
    ROOFTYPE = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5", "6", "99"]),
    )
    HIGHCEIL = fields.Boolean(required=False, allow_none=True)
    TYPEGLASS = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3"]),
    )
    TREESHAD = fields.Boolean(required=False, allow_none=True)
    ADQINSUL = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4"]),
    )
    FUELPOOL = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["0", "1", "2", "3", "5", "99"]),
    )
    FUELTUB = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "5", "99"]),
    )
    NUMFRIG = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    TYPERFR1 = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5"]),
    )
    ICE = fields.Boolean(required=False, allow_none=True)
    TYPERFR2 = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5"]),
    )
    LOCRFRI2 = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "99"]),
    )
    WINECHILL = fields.Boolean(required=False, allow_none=True)
    NUMFREEZ = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    UPRTFRZR = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2"]),
    )
    RANGEFUEL = fields.String(
        allow_none=True,
        validate=validate.OneOf(["1", "2", "5", "13"]),
    )
    RCOOKUSE = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    ROVENUSE = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    COOKTOPFUEL = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "5"]),
    )
    COOKTOPUSE = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    OVENFUEL = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "5"]),
    )
    OVENUSE = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    MICRO = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    AMTMICRO = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    OUTGRILLFUEL = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "23"]),
    )
    DISHWASH = fields.Boolean(required=False, allow_none=True)
    DWASHUSE = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    DWCYCLE = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5", "6"]),
    )
    CWASHER = fields.Boolean(required=False, allow_none=True)
    TOPFRONT = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2"]),
    )
    WASHLOAD = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    WASHTEMP = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3"]),
    )
    DRYER = fields.Boolean(required=False, allow_none=True)
    DRYRFUEL = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "5"]),
    )
    DRYRUSE = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    TVCOLOR = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    PLAYSTA = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    DESKTOP = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NUMLAPTOP = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NUMTABLET = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NUMSMPHONE = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    HEATHOME = fields.Boolean(required=False, allow_none=True)
    HEATAPT = fields.Boolean(required=False, allow_none=True)
    EQUIPM = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["2", "3", "4", "5", "7", "8", "10", "13", "99"]),
    )
    FUELHEAT = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "5", "7", "99"]),
    )
    EQUIPAUXTYPE = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["0", "5", "8", "9", "10", "13", "99"]),
    )
    EQUIPAUX = fields.Boolean(required=False, allow_none=True)
    FUELAUX = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "5", "7", "99"]),
    )
    NUMPORTEL = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NUMFIREPLC = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    BASEHEAT = fields.Boolean(required=False, allow_none=True)
    ATTCHEAT = fields.Boolean(required=False, allow_none=True)
    GARGHEAT = fields.Boolean(required=False, allow_none=True)
    HUMIDTYPE = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["0", "1", "2"]),
    )
    NUMPORTHUM = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    AIRCOND = fields.Boolean(required=False, allow_none=True)
    COOLAPT = fields.Boolean(required=False, allow_none=True)
    ACEQUIPM_PUB = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "3", "4", "5", "6"]),
    )
    ACEQUIPAUXTYPE_PUB = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["0", "1", "3", "4", "5", "6"]),
    )
    NUMWWAC = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NUMPORTAC = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NUMCFAN = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    NUMFLOORFAN = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    DEHUMTYPE = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["0", "1", "2"]),
    )
    NUMPORTDEHUM = fields.Integer(load_missing=0, validate=validate.Range(min=0))
    TYPETHERM = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["0", "1", "2", "3"]),
    )
    HEATCNTL = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5", "99"]),
    )
    TEMPHOME = fields.Integer(
        required=False, allow_none=True, validate=validate.Range(min=0)
    )
    COOLCNTL = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4", "5", "99"]),
    )
    TEMPHOMEAC = fields.Integer(
        required=False, allow_none=True, validate=validate.Range(min=0)
    )
    H2OAPT = fields.Boolean(required=False, allow_none=True)
    WHEATSIZ = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "4"]),
    )
    FUELH2O = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "5", "7", "8", "99"]),
    )
    MORETHAN1H2O = fields.Boolean(required=False, allow_none=True)
    FUELH2O2 = fields.String(
        required=False,
        allow_none=True,
        validate=validate.OneOf(["1", "2", "3", "5", "7", "8", "99"]),
    )
    EVCHRGHOME = fields.Boolean(required=False, allow_none=True)
    NHSLDMEM = fields.Integer(
        required=False, allow_none=True, validate=validate.Range(min=0)
    )
    SQFTEST = fields.Integer(
        required=False, allow_none=True, validate=validate.Range(min=0)
    )

    @pre_load
    def remove_nulls(self, data, **kwargs):
        return {k: v for k, v in data.items() if v is not None}


class PredictResponseSchema(Schema):
    BTUEL = fields.Integer()
    BTUNG = fields.Integer()
    BTULP = fields.Integer()
    BTUFO = fields.Integer()
    BTUWD = fields.Integer()


@bp.route("/", methods=["PUT"])
def predict_api():
    try:
        body = PredictBodySchema().load(request.get_json())
    except ValidationError as err:
        abort(400, err.messages)

    df = pd.DataFrame(columns=PredictBodySchema().fields.keys())
    df = pd.concat([df, pd.DataFrame(body, index=[0])], ignore_index=True)

    BTUEL, BTUNG, BTULP, BTUFO, BTUWD = model.predict(df)[0]

    return PredictResponseSchema().dump(
        {
            "BTUEL": BTUEL,
            "BTUNG": BTUNG,
            "BTULP": BTULP,
            "BTUFO": BTUFO,
            "BTUWD": BTUWD,
        }
    )
