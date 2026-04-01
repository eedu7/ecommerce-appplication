from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

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

    def __repr__(self) -> str:
        return f"Category(uid={self.uid!r}, name={self.name!r})"
