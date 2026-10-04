import bcrypt
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.usuarios import Usuario


class NomeUsuarioJaExisteError(Exception):
    pass


class SenhaAtualIncorretaError(Exception):
    pass


def atualizar_nome(db: Session, usuario: Usuario, novo_nome: str) -> Usuario:
    if novo_nome == usuario.nome:
        return usuario

    existente = db.query(Usuario).filter(Usuario.nome == novo_nome).first()
    if existente:
        raise NomeUsuarioJaExisteError()

    usuario.nome = novo_nome
    db.add(usuario)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise NomeUsuarioJaExisteError()

    db.refresh(usuario)
    return usuario


def alterar_senha(db: Session, usuario: Usuario, senha_atual: str, nova_senha: str) -> Usuario:
    try:
        senha_ok = bcrypt.checkpw(
            senha_atual.encode("utf-8"),
            usuario.senha_hash.encode("utf-8"),
        )
    except ValueError:
        senha_ok = False

    if not senha_ok:
        raise SenhaAtualIncorretaError()

    nova_senha_hash = bcrypt.hashpw(
        nova_senha.encode("utf-8"),
        bcrypt.gensalt(),
    ).decode("utf-8")

    usuario.senha_hash = nova_senha_hash
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario