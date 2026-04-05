from fastapi import APIRouter

from .auth import router as auth_router
from .category import router as category_router
from .product import router as product_router
from .user import router as user_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
router.include_router(user_router, prefix="/users", tags=["User"])
router.include_router(category_router, prefix="/categories", tags=["Category"])
router.include_router(product_router, prefix="/products", tags=["Product"])
