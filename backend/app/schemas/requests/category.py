from uuid import UUID

from pydantic import BaseModel, Field


class CategoryIn(BaseModel):
    name: str = Field(..., examples=["Clothes"])
    description: str | None = Field(None, examples=["Item you wear"])
    parent_uid: UUID | None = None


class CategoryUpdate(BaseModel):
    name: str
    description: str
    parent_uid: UUID | None = None
