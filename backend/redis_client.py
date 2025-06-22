import redis
import os

r = redis.Redis.from_url(os.environ["REDIS_URL"])
