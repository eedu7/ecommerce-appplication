from typing import Annotated

from fastapi import Depends, Request

from app.models import DBUser
from core.dependencies.controller import Auth_Controller_Dep


async def get_current_user(request: Request, controller: Auth_Controller_Dep) -> DBUser:
    return await controller.get_by_uid(request.state.user.uid)


Current_User_Dep = Annotated[DBUser, Depends(get_current_user)]
