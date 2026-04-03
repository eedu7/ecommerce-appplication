from tkinter.scrolledtext import example

from pydantic import BaseModel, Field


class CategoryIn(BaseModel):
    name: str = Field(..., examples=["Clothes"])
    description: str | None = Field(None, examples=["Item you wear"])


class CategoryUpdate(BaseModel):
    name: str
    description: str | None = None


class CategoryPartialUpdate(CategoryIn):
    name: str | None = None
    description: str | None = None
