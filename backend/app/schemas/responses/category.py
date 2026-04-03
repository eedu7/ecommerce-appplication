from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class CategoryOut(BaseModel):
    uuid: UUID
    name: str
    description: str
    parent_id: UUID | None = None
    children: List["CategoryOut"] = []

    model_config = ConfigDict(from_attributes=True)


CategoryOut.model_rebuild()
