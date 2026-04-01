from fastapi import APIRouter, Response, status

from app.schemas.requests.auth import AuthIn, AuthLogin
from app.schemas.responses.auth import AuthOut
from core.dependencies.controller import Auth_Controller_Dep

router = APIRouter()


@router.post(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=AuthOut,
)
async def register(
    response: Response, data: AuthIn, controller: Auth_Controller_Dep
) -> AuthOut:
    return await controller.register(data, response)


@router.post(
    "/login",
    response_model=AuthOut,
)
async def login(
    response: Response,
    data: AuthLogin,
    controller: Auth_Controller_Dep,
) -> AuthOut:
    return await controller.login(data, response)
