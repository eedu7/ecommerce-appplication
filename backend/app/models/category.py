from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import DBBase
from core.database.mixins import PrimaryKeyMixin, TimestampMixin

if TYPE_CHECKING:
    from .product import DBProduct


class DBCategory(DBBase, PrimaryKeyMixin, TimestampMixin):
    __tablename__ = "categories"

    name: Mapped[str] = mapped_column(
        String(32),
        unique=True,
    )
    description: Mapped[str | None] = mapped_column(
        String(256),
        nullable=True,
    )

    # Relationships
    parent_uid: Mapped[UUID | None] = mapped_column(
        ForeignKey(
            "categories.uid",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
    )
    parent: Mapped[Optional["DBCategory"]] = relationship(
        "DBCategory",
        remote_side="DBCategory.uid",
        back_populates="children",
        foreign_keys=[parent_uid],
    )
    children: Mapped[List["DBCategory"]] = relationship(
        "DBCategory",
        back_populates="parent",
        foreign_keys=[parent_uid],
        lazy="selectin",
    )
    products: Mapped[List["DBProduct"]] = relationship(
        "DBProduct",
        back_populates="category",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"Category(uid={self.uid!r}, name={self.name!r})"
