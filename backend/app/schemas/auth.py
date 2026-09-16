from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    # Mesmas regras do frontend, apenas letras minúsculas e numeros.
    usuario: str = Field(
        ...,
        min_length=3,
        max_length=20,
        pattern=r"^[a-z0-9]+$", # pydantic valida isso automaticamente.
                                # daora
    )
    # Senha minima
    senha: str = Field(
    ...,
    min_length=6,
    max_length=128
    )

class UserResponse(BaseModel):
    # Não devolve senha hash
    usuario_id: int
    usuario: str