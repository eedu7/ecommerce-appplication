from typing import Annotated

from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.schemas.extra.token import TokenPayload
from core.dependencies.security import JWT_Service_Dep
from core.exceptions import UnauthorizedException


async def auth_required(
    request: Request,
    jwt: JWT_Service_Dep,
    credentials: Annotated[
        HTTPAuthorizationCredentials | None, Depends(HTTPBearer(auto_error=False))
    ],
) -> TokenPayload:
    if credentials:
        token = credentials.credentials
    else:
        cookie_token = request.cookies.get("ACCESS_TOKEN")
        if cookie_token:
            token = cookie_token
        else:
            raise UnauthorizedException(
                message="Authorization header is missing",
                error_code="AUTH_HEADER_MISSING",
            )

    payload = jwt.decode_token(token, expected_token="access")

    revoked = await jwt.is_token_revoked(payload.jti)

    if revoked:
        raise UnauthorizedException(
            message="Token has been revoked", error_code="AUTH_TOKEN_REVOKED"
        )

    return payload


Authentication_Required = Annotated[TokenPayload, Depends(auth_required)]
