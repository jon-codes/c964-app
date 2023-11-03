from requests_cache import CachedSession, RedisCache
from redis import Redis
from flask import current_app, g


def get_cache():
    if "requests_cache" not in g:
        connection = Redis.from_url(current_app.config["REDIS_URL"])
        backend = RedisCache(connection=connection)
        g.requests_cache = CachedSession("http_cache", backend=backend)
    return g.requests_cache


def close_cache(e=None):
    requests_cache = g.pop("requests_cache", None)

    if requests_cache is not None:
        requests_cache.close()


def init_app(app):
    app.teardown_appcontext(close_cache)
