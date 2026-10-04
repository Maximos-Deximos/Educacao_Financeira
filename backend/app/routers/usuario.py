from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.usuarios import Usuario
from app.schemas.user import UserUpdate, ChangePasswordRequest, UserResponse
from app.security import get_usuario_atual
from app.services.usuario_service import (
    NomeUsuarioJaExisteError,
    SenhaAtualIncorretaError,
    atualizar_nome,
    alterar_senha,
)

router = APIRouter()


@router.patch("/me", response_model=UserResponse)
def atualizar_perfil(
    dados: UserUpdate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_atual),
):
    try:
        usuario_atualizado = atualizar_nome(db, usuario, dados.usuario)
    except NomeUsuarioJaExisteError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Nome de usuário já está em uso.",
        )
    return UserResponse(
        usuario_id=usuario_atualizado.usuario_id,
        usuario=usuario_atualizado.nome,
    )


@router.patch("/me/senha", status_code=status.HTTP_204_NO_CONTENT)
def atualizar_senha(
    dados: ChangePasswordRequest,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_atual),
):
    try:
        alterar_senha(db, usuario, dados.senha_atual, dados.nova_senha)
    except SenhaAtualIncorretaError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Senha atual incorreta.",
        )
    return None