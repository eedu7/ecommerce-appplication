from app.controllers import AuthController, CategoryController, UserController
from app.controllers.product import ProductController
from core.dependencies.repository import (
    Category_Repository_Dep,
    Product_Repository_Dep,
    User_Repository_Dep,
)
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

    @staticmethod
    def get_category_controller(
        repository: Category_Repository_Dep,
    ) -> CategoryController:
        return CategoryController(repository)

    @staticmethod
    def get_product_controller(repository: Product_Repository_Dep) -> ProductController:
        return ProductController(repository)
