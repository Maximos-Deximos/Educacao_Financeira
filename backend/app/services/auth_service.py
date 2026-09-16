import bcrypt
from sqlalchemy.orm import Session

from app.models.usuarios import Usuario

class UsuarioJaExisteError(Exception):
    pass

def criar_conta(db: Session, usuario: str, senha: str) -> Usuario:
    # verifica se o nome que o usuario deseja ja existe, caso exista, retorna erro
    existente = db.query(Usuario).filter(Usuario.nome == usuario).first()
    if existente:
        raise UsuarioJaExisteError(usuario)
    
    # Gerar hash da senha
    senha_hash = bcrypt.hashpw(
        senha.encode("utf-8"),
        bcrypt.gensalt(),
    ).decode("utf-8")

    # Salvar no banco
    novo_usuario = Usuario(nome=usuario, senha_hash=senha_hash)
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario) # recarrego usuario_id gerado pelo banco

    return novo_usuario