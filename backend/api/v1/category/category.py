from uuid import UUID

from fastapi import APIRouter, Depends

from core.dependencies.auth import auth_required

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
    dependencies=[Depends(auth_required)],
)
async def create():
    pass


@router.put(
    "/",
    dependencies=[Depends(auth_required)],
)
async def update():
    pass


@router.patch(
    "/",
    dependencies=[Depends(auth_required)],
)
async def partial_update():
    pass


@router.delete(
    "/",
    dependencies=[Depends(auth_required)],
)
async def delete():
    pass
