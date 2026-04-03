from uuid import UUID

from pydantic import BaseModel, Field


class CategoryIn(BaseModel):
    name: str = Field(..., examples=["Clothes"])
    description: str | None = Field(None, examples=["Item you wear"])
    parent_id: UUID | None = None


class CategoryUpdate(BaseModel):
    name: str
    description: str
    parent_id: UUID | None = None


class CategoryPartialUpdate(CategoryIn):
    name: str | None = None
    description: str | None = None
    parent_id: UUID | None = None
