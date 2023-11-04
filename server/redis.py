from redis import Redis, ConnectionPool

from flask import current_app, g


def get_redis():
    if "redis" not in g:
        g.redis = Redis(connection_pool=get_pool())
    return g.redis


def get_pool():
    if "pool" not in g:
        g.pool = ConnectionPool.from_url(current_app.config["REDIS_URL"])
    return g.pool


def close_redis(e=None):
    redis = g.pop("redis", None)

    if redis is not None:
        redis.close()


def init_app(app):
    app.teardown_appcontext(close_redis)
