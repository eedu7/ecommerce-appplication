from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class CategoryOut(BaseModel):
    uid: UUID
    name: str
    description: str | None = None
    parent_uid: UUID | None = None
    children: List["CategoryOut"] = []

    model_config = ConfigDict(from_attributes=True)


CategoryOut.model_rebuild()
