from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models import DBUserRole


class UserOut(BaseModel):
    uid: UUID
    username: str
    email: str
    role: DBUserRole

    model_config = ConfigDict(from_attributes=True)
