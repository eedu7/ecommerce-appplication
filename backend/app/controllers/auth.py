from fastapi import Request, Response

from app.models import DBUser
from app.repositories import UserRepository
from app.schemas.requests.auth import AuthIn, AuthLogin, AuthLogout
from app.schemas.responses.auth import AuthOut
from app.schemas.responses.user import UserOut
from core.config import config
from core.controller import BaseController
from core.exceptions import BadRequestException, UnauthorizedException
from core.security import JWTService
from core.security.password import PasswordService
from core.utils import delete_auth_cookies, set_auth_cookies


class AuthController(BaseController[DBUser]):
    def __init__(
        self, repository: UserRepository, jwt: JWTService, password: PasswordService
    ) -> None:
        super().__init__(DBUser, repository)
        self.repository = repository
        self.jwt = jwt
        self.password = password

    async def register(self, data: AuthIn, response: Response) -> AuthOut:
        if await self.repository.get_by_email(data.email):
            raise
        if await self.repository.get_by_username(data.username):
            raise

        hashed_password = self.password.hash_password(data.password)

        user = await self.repository.create(
            {
                "email": data.email,
                "username": data.username,
                "password": hashed_password,
                "role": data.role,
            }
        )

        await self.commit()

        token = self.jwt.build_token_pair(
            str(user.uid),
            extra_claims={"user": {"username": user.username, "email": user.email}},
        )

        set_auth_cookies(token, response)

        return AuthOut(token=token, user=UserOut.model_validate(user))

    async def login(self, data: AuthLogin, response: Response) -> AuthOut:

        user = await self.repository.get_by_username_or_email(data.username_or_email)
        if user is None:
            print("User", user)
            raise UnauthorizedException(
                message="Invalid credentials",
                error_code="INVALID_CREDENTIALS",
            )

        if user.password and not self.password.verify_password(
            user.password, data.password
        ):
            print("Password not matched")
            raise UnauthorizedException(
                message="Invalid credentials",
                error_code="INVALID_CREDENTIALS",
            )

        token = self.jwt.build_token_pair(
            str(user.uid),
            extra_claims={"user": {"username": user.username, "email": user.email}},
        )

        set_auth_cookies(token, response)

        return AuthOut(token=token, user=UserOut.model_validate(user))

    async def logout(
        self, data: AuthLogout, request: Request, response: Response
    ) -> None:
        access_token = data.access_token
        refresh_token = data.refresh_token
        if not access_token:
            access_token = request.cookies.get(config.COOKIE_ACCESS_TOKEN_KEY)
        if not refresh_token:
            refresh_token = request.cookies.get(config.COOKIE_REFRESH_TOKEN_KEY)

        if not access_token or not refresh_token:
            print("Hello-World")
            raise BadRequestException("No credentials provided")

        print("STEP - 01")

        await self.jwt.revoke_tokens(access_token, refresh_token)
        print("STEP - 02")
        delete_auth_cookies(response)
