from app.controllers import AuthController, UserController
from core.dependencies.repository import User_Repository_Dep
from core.dependencies.security import JWT_Service_Dep, Password_Service_Dep


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
