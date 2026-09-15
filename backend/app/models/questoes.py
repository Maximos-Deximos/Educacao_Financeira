from sqlalchemy import BigInteger, Identity, SmallInteger, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Questao(Base):
    __tablename__ = "questoes"

    questao_id: Mapped[int] = mapped_column(
        BigInteger, Identity(always=True), primary_key=True
    )
    enunciado: Mapped[str] = mapped_column(Text, nullable=False)
    resposta_correta: Mapped[str] = mapped_column(Text, nullable=False)
    modulo: Mapped[int] = mapped_column(SmallInteger, nullable=False)