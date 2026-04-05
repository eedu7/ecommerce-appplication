from typing import Annotated

from fastapi.params import Depends

from app.repositories import ProductRepository, UserRepository
from app.repositories.category import CategoryRepository
from core.factory.repository import RepositoryFactory

User_Repository_Dep = Annotated[
    UserRepository, Depends(RepositoryFactory.get_user_repository)
]

Category_Repository_Dep = Annotated[
    CategoryRepository, Depends(RepositoryFactory.get_category_repository)
]

Product_Repository_Dep = Annotated[
    ProductRepository, Depends(RepositoryFactory.get_product_repository)
]
