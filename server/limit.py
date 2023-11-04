from limits.storage import RedisStorage
from limits.strategies import FixedWindowRateLimiter

from flask import g

from server.redis import get_pool


def get_limiter():
    if "limiter" not in g:
        storage = RedisStorage("redis://", connection_pool=get_pool())
        g.limiter = FixedWindowRateLimiter(storage)
    return g.limiter


def close_limits():
    limits = g.pop("limits", None)

    if limits is not None:
        limits.close()
