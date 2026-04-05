from uuid import UUID

from sqlalchemy import select

from app.models import DBCategory
from app.repositories.category import CategoryRepository
from app.schemas.requests.category import (
    CategoryIn,
    CategoryUpdate,
)
from core.controller import BaseController
from core.exceptions import DuplicateValueException, NotFoundException


class CategoryController(BaseController[DBCategory]):
    def __init__(
        self,
        repository: CategoryRepository,
    ) -> None:
        super().__init__(DBCategory, repository)
        self.repository = repository

    async def get_by_uid(self, uid: UUID) -> DBCategory:
        category = await self.repository.get_by_uid(uid)
        if category is None:
            raise NotFoundException(
                message="Category not found",
                error_code="CategoryNotFound",
            )
        return category

    async def create(self, data: CategoryIn) -> DBCategory:
        existing = await self.repository.get_by_name(data.name)

        if existing:
            raise DuplicateValueException(
                message=f"Category with name '{data.name}' already exists",
                error_code="DuplicateCategoryName",
            )

        if data.parent_uid:
            parent = await self.repository.get_by_uid(data.parent_uid)
            if not parent:
                raise NotFoundException(
                    message="Parent category not found",
                    error_code="ParentCategoryNotFound",
                )

        category = await self.repository.create(data.model_dump(exclude_none=True))
        await self.commit()
        await self.flush()
        await self.refresh(category)
        return category

    async def update(self, uid: UUID, data: CategoryUpdate) -> DBCategory:
        category = await self.get_by_uid(uid)
        if category is None:
            raise NotFoundException()

        await self.repository.update(category, data.model_dump(exclude_none=True))
        await self.commit()
        await self.refresh(category)
        return category

    async def delete(self, uid: UUID) -> None:
        stmt = select(DBCategory).where(DBCategory.uid == uid)
        result = await self.repository.session.execute(stmt)
        category = result.scalars().first()
        if category is None:
            raise NotFoundException()
        await self.repository.delete(category)
        await self.commit()
