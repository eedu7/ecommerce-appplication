from app.models import DBCategory
from app.repositories.category import CategoryRepository
from core.controller import BaseController


class CategoryController(BaseController[DBCategory]):
    def __init__(
        self,
        repository: CategoryRepository,
    ) -> None:
        super().__init__(DBCategory, repository)
