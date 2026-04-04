from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends

from app.schemas.requests.category import (
    CategoryIn,
    CategoryUpdate,
)
from app.schemas.responses.category import CategoryOut
from core.dependencies.auth import auth_required
from core.dependencies.controller import Category_Controller_Dep
from core.dependencies.get_role import admin_required

router = APIRouter()


@router.get(
    "/{uid}",
    response_model=CategoryOut,
)
async def get_category(uid: UUID, controller: Category_Controller_Dep):
    return await controller.get_by_uid(uid)


@router.get(
    "/",
    response_model=List[CategoryOut],
)
async def get_categories(controller: Category_Controller_Dep):
    return await controller.get_all()


@router.post(
    "/",
    dependencies=[Depends(auth_required), Depends(admin_required)],
    response_model=CategoryOut,
)
async def create(data: CategoryIn, controller: Category_Controller_Dep):
    return await controller.create(data)


@router.put(
    "/{uid}",
    dependencies=[Depends(auth_required), Depends(admin_required)],
    response_model=CategoryOut,
)
async def update(uid: UUID, data: CategoryUpdate, controller: Category_Controller_Dep):
    return await controller.update(uid, data)


@router.delete(
    "/{uid}",
    dependencies=[Depends(auth_required)],
)
async def delete(uid: UUID, controller: Category_Controller_Dep):
    await controller.delete(uid)
