from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.schemas.requests.product import ProductIn
from core.dependencies.auth import auth_required
from core.dependencies.controller import Product_Controller_Dep

router = APIRouter()


@router.get("/{uid}")
async def get_product(uid: UUID, controller: Product_Controller_Dep):
    return await controller.get_by_uid(uid)


@router.get("/")
async def get_products(
    controller: Product_Controller_Dep,
    offset: int = 0,
    limit: int = 100,
):
    return await controller.get_all(offset=offset, limit=limit)


@router.post(
    "/",
    dependencies=[Depends(auth_required)],
    status_code=status.HTTP_201_CREATED,
)
async def create_product(data: ProductIn, controller: Product_Controller_Dep):
    return await controller.create_product(data)


@router.put(
    "/{uid}",
    dependencies=[
        Depends(auth_required),
    ],
)
async def update_product(uid: UUID, controller: Product_Controller_Dep):
    pass


@router.delete(
    "/{uid}",
    dependencies=[
        Depends(auth_required),
    ],
)
async def delete_product(uid: UUID, controller: Product_Controller_Dep):
    pass
