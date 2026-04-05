from uuid import UUID

from pydantic import BaseModel


class ProductIn(BaseModel):
    name: str
    description: str | None = None
    short_description: str | None = None
    price: float
    category_uid: UUID


class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None
    short_description: str | None = None
    price: float | None = None
    category_uid: UUID | None = None
