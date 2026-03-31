from core.config import config


def validate_pagination(skip: int, limit: int) -> None:
    if skip < 0:
        raise ValueError("skip must be non-negative")
    if limit <= 0:
        raise ValueError("limit must be positive")
    if limit > config.MAX_PAGE_SIZE:
        raise ValueError(
            f"limit ({limit}) exceeds maximum allowed page size ({config.MAX_PAGE_SIZE})"
        )
