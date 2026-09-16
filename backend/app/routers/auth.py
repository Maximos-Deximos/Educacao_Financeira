from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth import UserCreate, UserResponse
from app.services.auth_service import UsuarioJaExisteError, criar_conta

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

