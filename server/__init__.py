import os

from flask import Flask, json
from werkzeug.exceptions import HTTPException

dirname = os.path.dirname(__file__)


def create_app():
    # create and configure the app
    app = Flask(
        __name__,
        static_folder=os.path.join(dirname, "..", "client", "dist"),
        static_url_path="/",
    )
    app.app_context().push()

    app.config.from_prefixed_env()

    # don't require strict slashes
    app.url_map.strict_slashes = False

    # create and register error handler
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

    app.register_error_handler(HTTPException, handle_exception)

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def catch_all(path):
        return app.send_static_file("index.html")

    # register blueprints
    from . import cache
    from . import healthcheck
    from . import geocode
    from . import climate
    from . import predict

    cache.init_app(app)

    app.register_blueprint(healthcheck.bp)

    app.register_blueprint(geocode.bp)

    app.register_blueprint(climate.bp)

    app.register_blueprint(predict.bp)

    return app
