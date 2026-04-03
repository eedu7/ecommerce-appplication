from uuid import UUID

from fastapi import APIRouter, Depends

from app.schemas.requests.category import CategoryIn
from core.dependencies.auth import auth_required
from core.dependencies.controller import Category_Controller_Dep
from core.dependencies.get_role import admin_required

router = APIRouter()


@router.get(
    "/{uid}",
)
async def get_category(uid: UUID, controller: Category_Controller_Dep):
    pass


@router.get("/")
async def get_categories(controller: Category_Controller_Dep):
    pass


@router.post(
    "/",
    dependencies=[Depends(auth_required), Depends(admin_required)],
)
async def create(data: CategoryIn, controller: Category_Controller_Dep):
    return await controller.create(data)


@router.put(
    "/{uid}",
    dependencies=[Depends(auth_required), Depends(admin_required)],
)
async def update(uid: UUID, controller: Category_Controller_Dep):
    pass


@router.patch(
    "/{uid}",
    dependencies=[Depends(auth_required), Depends(admin_required)],
)
async def partial_update(uid: UUID, controller: Category_Controller_Dep):
    pass


@router.delete(
    "/{uid}",
    dependencies=[Depends(auth_required)],
)
async def delete(uid: UUID, controller: Category_Controller_Dep):
    pass
