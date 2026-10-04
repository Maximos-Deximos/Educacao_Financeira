from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, Field


# Limite curto de propósito: o back compara a resposta com o gabarito,
# não a guarda como documento.
RespostaCurta = Annotated[str, Field(min_length=1, max_length=500)]


class RespostaCreate(BaseModel):
    """Corpo de POST /form/respostas."""

    codigo: Annotated[
        str,
        Field(
            min_length=1,
            max_length=20,
            # Só minúsculas e hífens, como nos códigos do formulário
            # (m1-q1, m2-q16). Rejeita maiúsculas e "_", que não existem
            # em nenhum código válido e indicam cliente com bug.
            pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
            description="Chave natural da questão, ex.: m1-q1",
        ),
    ]
    resposta_usuario: RespostaCurta


class RespostaSalva(BaseModel):
    """Uma questão já respondida, como devolvida em GET /form/modulos/{n}."""

    codigo: str
    resposta_usuario: str
    acertou: bool
    data_conclusao: datetime | None = None


class RespostaResponse(RespostaSalva):
    """POST /form/respostas: 201 na primeira gravação, 200 nas seguintes."""

    questao_id: int
    # False quando a resposta substitui uma gravação anterior ou quando a
    # questão já estava acertada (nesse caso o registro volta intacto).
    primeira_vez: bool


class ProgressoModulo(BaseModel):
    modulo: int
    nome: str
    concluidas: int
    total: int
    percentual: float
    concluido: bool


class ProgressoGeral(BaseModel):
    concluidas: int
    total: int
    percentual: float


class ProgressoResponse(BaseModel):
    """GET /form/progresso."""

    geral: ProgressoGeral
    modulos: list[ProgressoModulo]


class ModuloDetalheResponse(BaseModel):
    """GET /form/modulos/{modulo}: progresso + respostas para reidratar o form."""

    modulo: int
    nome: str
    progresso: ProgressoModulo
    respostas: list[RespostaSalva]
