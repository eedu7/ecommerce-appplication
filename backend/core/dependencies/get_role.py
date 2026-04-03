from app.models import DBUser, DBUserRole
from core.dependencies.user import Current_User_Dep
from core.exceptions import ForbiddenException


async def admin_required(current_user: Current_User_Dep) -> DBUser:
    if not current_user or current_user.role != DBUserRole.ADMIN:
        raise ForbiddenException(
            message="Admin access required",
            error_code="ADMIN_REQUIRED",
        )
    return current_user
