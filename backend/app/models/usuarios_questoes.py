from datetime import datetime

from sqlalchemy import BigInteger, Boolean, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class UsuarioQuestao(Base):
    __tablename__ = "usuarios_questoes"

    usuario_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("usuarios.usuario_id", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    questao_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("questoes.questao_id", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    resposta_usuario: Mapped[str] = mapped_column(Text, nullable=False)
    data_conclusao: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    acertou: Mapped[bool] = mapped_column(Boolean, nullable=False)