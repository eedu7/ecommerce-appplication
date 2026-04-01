from pydantic import BaseModel, ConfigDict


class UserOut(BaseModel):
    username: str
    email: str

    model_config = ConfigDict(from_attributes=True)
