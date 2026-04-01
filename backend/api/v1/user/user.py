from fastapi import APIRouter, Depends, Request

from core.dependencies.auth import auth_required

router = APIRouter(dependencies=[Depends(auth_required)])


@router.get("/")
async def get_user(request: Request):
    return {
        "uid": request.state.user.uid,
    }
