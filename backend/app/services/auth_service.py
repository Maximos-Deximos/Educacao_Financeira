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

class CredenciaisInvalidasError(Exception):
    pass

def autenticar_usuario(db: Session, usuario: str, senha: str) -> Usuario:
    usuario_db = db.query(Usuario).filter(Usuario.nome == usuario).first()
    if not usuario_db:
        raise CredenciaisInvalidasError()

    try:
        senha_ok = bcrypt.checkpw(
            senha.encode("utf-8"), usuario_db.senha_hash.encode("utf-8")
        )

    except ValueError:
        # Em caso de hashes incorretos
        senha_ok = False

    if not senha_ok:
        raise CredenciaisInvalidasError()
    return usuario_db

# Os seeds de testes não vão funcionar por não serem hash
# todo: Atualizar as senhas dos seeds testes