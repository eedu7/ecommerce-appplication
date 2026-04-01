from enum import StrEnum

from sqlalchemy import Boolean, Enum, String
from sqlalchemy.orm import Mapped, mapped_column

from core.database import DBBase
from core.database.mixins import PrimaryKeyMixin, TimestampMixin


class DBUserRole(StrEnum):
    ADMIN = "ADMIN"
    CUSTOMER = "CUSTOMER"
    VENDOR = "VENDOR"


class DBUser(DBBase, PrimaryKeyMixin, TimestampMixin):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(
        String(32),
        unique=True,
        nullable=False,
        index=True,
    )
    first_name: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
    )
    last_name: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
    )
    email: Mapped[str] = mapped_column(String(256), nullable=False, index=True)
    email_verified: Mapped[bool] = mapped_column(Boolean, server_default="false")
    password: Mapped[str] = mapped_column(
        String(256),
        nullable=True,
    )
    role: Mapped[DBUserRole] = mapped_column(
        Enum(DBUserRole),
        nullable=False,
        default=DBUserRole.CUSTOMER,
    )

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, username={self.username!r})"
