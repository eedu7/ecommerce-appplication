from typing import Annotated

from fastapi import Depends

from app.controllers import AuthController, CategoryController
from app.controllers.product import ProductController
from core.factory import ControllerFactory

Auth_Controller_Dep = Annotated[
    AuthController, Depends(ControllerFactory.get_auth_controller)
]

Category_Controller_Dep = Annotated[
    CategoryController, Depends(ControllerFactory.get_category_controller)
]

Product_Controller_Dep = Annotated[
    ProductController, Depends(ControllerFactory.get_product_controller)
]
