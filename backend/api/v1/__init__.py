from fastapi import APIRouter, Depends

from core.dependencies.auth import auth_required

from .auth import router as auth_router
from .category import category_auth_router, category_router
from .user import router as user_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
router.include_router(user_router, prefix="/users", tags=["User"])
router.include_router(category_router, prefix="/categories", tags=["Category"])
router.include_router(
    category_auth_router,
    prefix="/categories",
    tags=["Authenticated Category"],
    dependencies=[Depends(auth_required)],
)
