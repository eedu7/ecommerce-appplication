from sqlalchemy.ext.asyncio import AsyncSession

from app.models import DBCategory
from core.repository import BaseRepository


class CategoryRepository(BaseRepository[DBCategory]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(DBCategory, session)

    async def get_by_name(self, name: str) -> DBCategory | None:
        return await self.get_one_by_filters({"name": name})
