from app.repositories import UserRepository
from core.dependencies import Async_Session_Dep


class RepositoryFactory:
    @staticmethod
    def get_user_repository(session: Async_Session_Dep) -> UserRepository:
        return UserRepository(session)
