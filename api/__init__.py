from flask import Flask

app = Flask(
    __name__,
    instance_relative_config=True,
)
app.config.from_prefixed_env()


from api import routes
