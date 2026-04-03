from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class CategoryOut(BaseModel):
    uid: UUID
    name: str
    description: str
    parent_id: UUID | None = None
    children: List["CategoryOut"] | None = None

    model_config = ConfigDict(from_attributes=True)


CategoryOut.model_rebuild()
