from __future__ import annotations

from decimal import Decimal
from typing import TYPE_CHECKING, Optional
from uuid import UUID

from sqlalchemy import ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import DBBase
from core.database.mixins import PrimaryKeyMixin, TimestampMixin

if TYPE_CHECKING:
    from .category import DBCategory


class DBProduct(
    DBBase,
    PrimaryKeyMixin,
    TimestampMixin,
):
    __tablename__ = "products"

    name: Mapped[str] = mapped_column(String(256), nullable=False, index=True)
    sku: Mapped[str] = mapped_column(String(256), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    short_description: Mapped[str] = mapped_column(String(256), nullable=True)
    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), default=Decimal(0), nullable=False
    )

    # Foreign Key
    category_uid: Mapped[UUID] = mapped_column(
        ForeignKey(
            "categories.uid",
            ondelete="SET NULL",
        ),
        nullable=True,
    )

    # Relationship
    category: Mapped[Optional["DBCategory"]] = relationship(
        "DBCategory",
        back_populates="products",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"Product(uid={self.uid!r}), name={self.name!r}"
