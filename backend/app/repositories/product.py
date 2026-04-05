from sqlalchemy.ext.asyncio import AsyncSession

from app.models import DBProduct
from core.repository import BaseRepository


class ProductRepository(BaseRepository[DBProduct]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(DBProduct, session)
