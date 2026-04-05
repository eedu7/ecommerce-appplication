from typing import Sequence
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import DBCategory
from core.repository import BaseRepository


class CategoryRepository(BaseRepository[DBCategory]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(DBCategory, session)

    async def get_by_uid(self, uid: UUID) -> DBCategory | None:
        stmt = select(DBCategory).options(selectinload(DBCategory.children))
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_by_name(self, name: str) -> DBCategory | None:
        return await self.get_one_by_filters({"name": name})

    async def get_all(
        self, offset: int = 0, limit: int | None = None
    ) -> Sequence[DBCategory]:
        stmt = (
            select(DBCategory)
            .offset(offset)
            .limit(limit)
            .options(selectinload(DBCategory.children))
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()
