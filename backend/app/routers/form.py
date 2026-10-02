from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.usuarios import Usuario
from app.schemas.forms import (
    ModuloDetalheResponse,
    ProgressoGeral,
    ProgressoModulo,
    ProgressoResponse,
    RespostaCreate,
    RespostaResponse,
    RespostaSalva,
)
from app.security import get_usuario_atual
from app.services.form_service import (
    ModuloInvalidoError,
    QuestaoNaoEncontradaError,
    RespostaInvalidaError,
    calcular_progresso,
    obter_modulo,
    registrar_resposta,
)

router = APIRouter()


@router.post(
    "/respostas",
    response_model=RespostaResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Envia a resposta de uma questão e corrige no back-end",
    responses={200: {"description": "A questão já tinha sido registrada antes."}},
)
def responder_questao(
    dados: RespostaCreate,
    resposta: Response,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_atual),
):
    try:
        registro, primeira_vez = registrar_resposta(
            db, usuario.usuario_id, dados.codigo, dados.resposta_usuario
        )
    except QuestaoNaoEncontradaError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Questão não encontrada.",
        )
    except RespostaInvalidaError:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Resposta inválida para esta questão.",
        )

    if not primeira_vez:
        resposta.status_code = status.HTTP_200_OK

    return RespostaResponse(
        questao_id=registro.questao_id,
        codigo=dados.codigo,
        resposta_usuario=registro.resposta_usuario,
        acertou=registro.acertou,
        data_conclusao=registro.data_conclusao,
        primeira_vez=primeira_vez,
    )


@router.get(
    "/progresso",
    response_model=ProgressoResponse,
    summary="Progresso geral e por módulo do usuário autenticado",
)
def obter_progresso(
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_atual),
):
    dados = calcular_progresso(db, usuario.usuario_id)
    return ProgressoResponse(
        geral=ProgressoGeral(**dados["geral"]),
        modulos=[ProgressoModulo(**m) for m in dados["modulos"]],
    )


@router.get(
    "/modulos/{modulo}",
    response_model=ModuloDetalheResponse,
    summary="Progresso e respostas já salvas de um módulo",
)
def obter_detalhe_modulo(
    modulo: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_usuario_atual),
):
    try:
        dados = obter_modulo(db, usuario.usuario_id, modulo)
    except ModuloInvalidoError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Módulo não encontrado.",
        )

    return ModuloDetalheResponse(
        modulo=dados["modulo"],
        nome=dados["nome"],
        progresso=ProgressoModulo(**dados["progresso"]),
        respostas=[RespostaSalva(**r) for r in dados["respostas"]],
    )