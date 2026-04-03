from typing import List, Optional
from uuid import UUID

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import DBBase
from core.database.mixins import PrimaryKeyMixin, TimestampMixin


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
    parent_id: Mapped[UUID | None] = mapped_column(
        ForeignKey(
            "categories.uid",
            ondelete="CASCADE",
        ),
        nullable=True,
        index=True,
    )
    parent: Mapped[Optional["DBCategory"]] = relationship(
        "DBCategory",
        remote_side="DBCategory.uid",
        back_populates="children",
    )
    children: Mapped[List["DBCategory"]] = relationship(
        "DBCategory",
        back_populates="parent",
        cascade="all, delete-orphan",
        # single_parent=True,
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"Category(uid={self.uid!r}, name={self.name!r})"
