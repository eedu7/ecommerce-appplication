from app.models import DBCategory
from app.repositories.category import CategoryRepository
from app.schemas.requests.category import CategoryIn
from core.controller import BaseController
from core.exceptions import DuplicateValueException


class CategoryController(BaseController[DBCategory]):
    def __init__(
        self,
        repository: CategoryRepository,
    ) -> None:
        super().__init__(DBCategory, repository)
        self.repository = repository

    async def create(self, data: CategoryIn):

        if await self.repository.get_by_name(data.name):
            raise DuplicateValueException()

        category = await self.create(**data.model_dump(exclude_none=True))
        await self.commit()
        return category
