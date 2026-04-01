from fastapi import APIRouter, status

from app.schemas.requests.auth import AuthIn
from app.schemas.responses.auth import AuthOut
from core.dependencies import Auth_Controller_Dep

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=AuthOut,
)
async def register(data: AuthIn, controller: Auth_Controller_Dep):
    return await controller.register(data)
