from uuid import UUID

from app.models import DBProduct
from app.repositories import ProductRepository
from app.schemas.requests.product import ProductIn, ProductUpdate
from core.controller import BaseController
from core.exceptions import NotFoundException


class ProductController(BaseController[DBProduct]):
    def __init__(
        self,
        repository: ProductRepository,
    ) -> None:
        super().__init__(DBProduct, repository)
        self.repository = repository

    async def get_by_uid(self, uid: UUID) -> DBProduct:
        product = await self.repository.get_by_uid(uid)
        if product is None:
            raise NotFoundException()
        return product

    async def create_product(self, data: ProductIn) -> DBProduct:
        product = await self.repository.create(
            {**data.model_dump(), "sku": data.name.lower().strip().replace(" ", "_")}
        )
        await self.commit()
        return product

    async def update_product(self, uid: UUID, data: ProductUpdate) -> DBProduct:
        product = await self.get_by_uid(uid)

        updated_product = await self.repository.update(
            product, data.model_dump(exclude_none=True)
        )

        await self.commit()
        await self.refresh(updated_product)
        return updated_product

    async def delete_product(self, uuid: UUID):
        product = await self.get_by_uid(uuid)
        await self.repository.delete(product)
        await self.commit()
