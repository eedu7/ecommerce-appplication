from typing import Annotated

from fastapi.params import Depends

from app.controllers import AuthController, UserController
from app.repositories import UserRepository
from core.dependencies.security import JWT_Service_Dep, Password_Service_Dep
from core.factory.repository import RepositoryFactory

User_Repository_Dep = Annotated[
    UserRepository, Depends(RepositoryFactory.get_user_repository)
]


class ControllerFactory:
    @staticmethod
    def get_auth_controller(
        repository: User_Repository_Dep,
        jwt: JWT_Service_Dep,
        password: Password_Service_Dep,
    ) -> AuthController:
        return AuthController(repository, jwt, password)

    @staticmethod
    def get_user_controller(repository: User_Repository_Dep) -> UserController:
        return UserController(repository)
