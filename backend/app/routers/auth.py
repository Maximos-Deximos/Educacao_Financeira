from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth import UserCreate, UserResponse, Token, UserLogin
from app.services.auth_service import UsuarioJaExisteError, criar_conta, CredenciaisInvalidasError, autenticar_usuario

from app.security import criar_token_acesso, get_usuario_atual

router = APIRouter()

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastro um novo usuário",
)

def cadastrar_usuario(dados: UserCreate, db: Session = Depends(get_db)):
    try:
        usuario = criar_conta(db, dados.usuario, dados.senha)
    except UsuarioJaExisteError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Usuário já existe.",
        )

    return UserResponse(usuario_id=usuario.usuario_id, usuario=usuario.nome)

@router.post("/login", response_model=Token)
def login(dados: UserLogin,
          db: Session = Depends(get_db)
          ):
    try:
        usuario = autenticar_usuario(db,
                                     dados.usuario,
                                     dados.senha)
    except CredenciaisInvalidasError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nome de usuário ou senha incorretos.",
        )
    token = criar_token_acesso(usuario.usuario_id)
    return Token(access_token=token)

@router.get("/me", response_model=UserResponse,
            dependencies=[Depends(get_usuario_atual)])    
def usuario_atual(usuario: Usuario = Depends(get_usuario_atual)):
    return UserResponse(usuario_id=usuario.usuario_id, usuario=usuario.nome)