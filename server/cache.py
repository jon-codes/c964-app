from requests_cache import CachedSession, RedisCache

from flask import g

from server.redis import get_redis


def get_cache():
    if "requests_cache" not in g:
        connection = get_redis()
        backend = RedisCache(connection=connection)
        g.requests_cache = CachedSession("http_cache", backend=backend)
    return g.requests_cache


def close_cache(e=None):
    requests_cache = g.pop("requests_cache", None)

    if requests_cache is not None:
        requests_cache.close()


def init_app(app):
    app.teardown_appcontext(close_cache)
