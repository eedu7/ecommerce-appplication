from uuid import UUID

from fastapi import APIRouter, Depends

from core.dependencies.auth import auth_required

auth_router = APIRouter(dependencies=[Depends(auth_required)])
router = APIRouter()


@router.get(
    "/{uid}",
)
async def get_category(uid: UUID):
    pass


@router.get("/")
async def get_categories():
    pass


@auth_router.post("/")
async def create():
    pass


@auth_router.put("/")
async def update():
    pass


@auth_router.patch("/")
async def partial_update():
    pass


@auth_router.delete("/")
async def delete():
    pass
