from uuid import UUID

from fastapi import APIRouter, Depends

from core.dependencies.auth import auth_required
from core.dependencies.get_role import admin_required
from core.dependencies.user import Current_User_Dep

router = APIRouter()


@router.get(
    "/{uid}",
)
async def get_category(uid: UUID):
    pass


@router.get("/")
async def get_categories():
    pass


@router.post(
    "/",
    dependencies=[Depends(auth_required), Depends(admin_required)],
)
async def create(current_user: Current_User_Dep):
    pass


@router.put(
    "/",
    dependencies=[Depends(auth_required), Depends(admin_required)],
)
async def update(current_user: Current_User_Dep):
    pass


@router.patch(
    "/",
    dependencies=[Depends(auth_required), Depends(admin_required)],
)
async def partial_update(current_user: Current_User_Dep):
    pass


@router.delete(
    "/",
    dependencies=[Depends(auth_required)],
)
async def delete(current_user: Current_User_Dep):
    pass
