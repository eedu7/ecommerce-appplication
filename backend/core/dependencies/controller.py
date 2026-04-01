from typing import Annotated

from fastapi import Depends

from app.controllers import AuthController
from core.factory import ControllerFactory

Auth_Controller_Dep = Annotated[
    AuthController, Depends(ControllerFactory.get_auth_controller)
]
