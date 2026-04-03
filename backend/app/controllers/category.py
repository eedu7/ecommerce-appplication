from uuid import UUID

from app.models import DBCategory
from app.repositories.category import CategoryRepository
from app.schemas.requests.category import (
    CategoryIn,
    CategoryPartialUpdate,
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

        if await self.repository.get_by_name(data.name):
            raise DuplicateValueException()

        category = await self.create(**data.model_dump(exclude_none=True))
        await self.commit()
        return category

    async def update(
        self, uid: UUID, data: CategoryUpdate | CategoryPartialUpdate
    ) -> DBCategory:
        category = await self.get_by_uid(uid)
        if category is None:
            raise NotFoundException()

        await self.repository.update(category, data.model_dump(exclude_none=True))
        await self.commit()
        return category

    async def delete(self, uid: UUID) -> None:
        category = await self.get_by_uid(uid)
        if category is None:
            raise NotFoundException()
        await self.repository.delete(category)
        await self.commit()
