from uuid import UUID

from pydantic import BaseModel, ConfigDict


class CategoryOut(BaseModel):
    uuid: UUID
    name: str
    description: str
    model_config = ConfigDict(from_attributes=True)
