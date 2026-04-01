from app.models import DBUser, DBUserRole
from app.repositories import UserRepository
from app.schemas.requests.auth import AuthIn
from app.schemas.responses.auth import AuthOut
from app.schemas.responses.user import UserOut
from core.controller import BaseController
from core.security import JWTService
from core.security.password import PasswordService


class AuthController(BaseController[DBUser]):
    def __init__(
        self, repository: UserRepository, jwt: JWTService, password: PasswordService
    ) -> None:
        super().__init__(DBUser, repository)
        self.repository = repository
        self.jwt = jwt
        self.password = password

    async def register(self, data: AuthIn, role: DBUserRole) -> AuthOut:
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
                "role": role,
            }
        )

        token = self.jwt.build_token_pair(
            str(user.uid),
            extra_claims={"user": {"username": user.username, "email": user.email}},
        )

        return AuthOut(token=token, user=UserOut.model_validate(user))
