from app.repositories import UserRepository
from app.repositories.category import CategoryRepository
from core.dependencies.session import Async_Session_Dep


class RepositoryFactory:
    @staticmethod
    def get_user_repository(session: Async_Session_Dep) -> UserRepository:
        return UserRepository(session)

    @staticmethod
    def get_category_repository(session: Async_Session_Dep) -> CategoryRepository:
        return CategoryRepository(session)
