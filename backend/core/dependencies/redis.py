from typing import Annotated

from fastapi import Depends
from redis.asyncio import Redis

from core.redis import get_redis

Redis_Dep = Annotated[Redis, Depends(get_redis)]
