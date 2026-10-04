from pydantic import BaseModel, Field


class UserUpdate(BaseModel):
    usuario: str = Field(
        ...,
        min_length=3,
        max_length=20,
        pattern=r"^[a-z0-9]+$",
    )


class ChangePasswordRequest(BaseModel):
    senha_atual: str = Field(..., min_length=6, max_length=128)
    nova_senha: str = Field(..., min_length=6, max_length=128)


class UserResponse(BaseModel):
    usuario_id: int
    usuario: str

    class Config:
        from_attributes = True