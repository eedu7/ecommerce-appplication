from typing import Annotated

from fastapi import Depends

from core.security import (
    JWTService,
    PasswordService,
    get_jwt_service,
    get_password_service,
)

JWT_Service_Dep = Annotated[JWTService, Depends(get_jwt_service)]

Password_Service_Dep = Annotated[PasswordService, Depends(get_password_service)]
