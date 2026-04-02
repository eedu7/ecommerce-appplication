from fastapi import APIRouter, Depends

from app.schemas.responses.user import UserOut
from core.dependencies.auth import auth_required
from core.dependencies.user import Current_User_Dep

router = APIRouter(dependencies=[Depends(auth_required)])


@router.get(
    "/me",
    response_model=UserOut,
)
async def get_user(current_user: Current_User_Dep):
    return current_user
