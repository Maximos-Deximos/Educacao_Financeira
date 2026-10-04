from sqlalchemy import BigInteger, Identity, SmallInteger, Text, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from decimal import Decimal

from app.database import Base


class Questao(Base):
    __tablename__ = "questoes"

    questao_id: Mapped[int] = mapped_column(
        BigInteger, Identity(always=True), primary_key=True
    )
    # Chave natural usada pelo formulario (m1-q1...)
    # Não confundir com questão_id gerada pelo banco
    codigo: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    enunciado: Mapped[str] = mapped_column(Text, nullable=False)
    resposta_correta: Mapped[str] = mapped_column(Text, nullable=False)
    modulo: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    materia: Mapped[str | None] = mapped_column(Text)
    # Resposta numerica das alternativas das questões
    valor_esperado: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
