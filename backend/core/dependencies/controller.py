from typing import Annotated

from fastapi import Depends

from app.controllers import AuthController, CategoryController
from core.factory import ControllerFactory

Auth_Controller_Dep = Annotated[
    AuthController, Depends(ControllerFactory.get_auth_controller)
]

Category_Controller_Dep = Annotated[
    CategoryController, Depends(ControllerFactory.get_category_controller)
]
