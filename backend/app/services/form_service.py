import re

from datetime import datetime, timezone
from decimal import Decimal, InvalidOperation

from sqlalchemy import Integer, func
from sqlalchemy.orm import Session

from app.models.questoes import Questao
from app.models.usuarios_questoes import UsuarioQuestao

NOMES_MODULOS = {1: "Básico", 2: "Intermediário"}

# Mesmo formato aceito pelo formulário (js/pages/atividades.js), para que
# o back aceite tudo que o front deixe passar.
RE_NUMERO_BR = re.compile(r"^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$")
RE_NUMERO_PT = re.compile(r"^\d+\.\d{1,2}$")
RE_MILHAR = re.compile(r"^\d{1,3}(?:\.\d{3})+$")
RE_LETRA = re.compile(r"^[a-dA-D]$")

class QuestaoNaoEncontradaError(Exception):
    pass
class RespostaInvalidaError(Exception):
    pass
class ModuloInvalidoError(Exception):
    pass

def normalizar_numero(texto: str) -> Decimal:
    """'R$ 1.234,56' e '1234.56' viram o mesmo Decimal."""
    limpo = texto.strip()
    limpo = re.sub(r"^\s*r\$\s*", "", limpo, flags=re.IGNORECASE)
    limpo = re.sub(r"\s*reais\s*$", "", limpo, flags=re.IGNORECASE).strip()

    if not (RE_NUMERO_BR.match(limpo) or RE_NUMERO_PT.match(limpo)):
        raise RespostaInvalidaError(texto)

    if "," in limpo or RE_MILHAR.match(limpo):
        limpo = limpo.replace(".", "").replace(",", ".")

    try:
        return Decimal(limpo)
    except InvalidOperation:
        raise RespostaInvalidaError(texto)

def conferir_resposta(questao: Questao, resposta_usuario: str) -> bool:
    texto = resposta_usuario.strip()

    if RE_LETRA.match(texto):
        return texto.upper() == questao.resposta_correta.strip().upper()

    # Só as questões de cálculo (m1-q6, m1-q15) aceitam número. Para as
    # demais, um texto que não é letra é resposta malformada.
    if questao.valor_esperado is None:
        raise RespostaInvalidaError(resposta_usuario)

    return normalizar_numero(texto) == Decimal(questao.valor_esperado)


def registrar_resposta(
    db: Session, usuario_id: int, codigo: str, resposta_usuario: str
) -> tuple[UsuarioQuestao, bool]:
    """Grava a resposta e devolve (registro, primeira_vez).

    Só o acerto conclui a questão. Uma questão já concluída não regride:
    reenviar algo errado devolve o registro anterior intacto, o que
    combina com o botão "Confirmado" da atividade.
    """
    questao = db.query(Questao).filter(Questao.codigo == codigo).first()
    if not questao:
        raise QuestaoNaoEncontradaError(codigo)

    existente = db.get(UsuarioQuestao, (usuario_id, questao.questao_id))
    if existente and existente.acertou:
        return existente, False

    ja_existia = existente is not None
    acertou = conferir_resposta(questao, resposta_usuario)
    agora = datetime.now(timezone.utc)

    if ja_existia:
        existente.resposta_usuario = resposta_usuario
        existente.acertou = acertou
        # server_default=func.now() não atualiza em UPDATE, então grava explícito
        existente.data_conclusao = agora
    else:
        existente = UsuarioQuestao(
            usuario_id=usuario_id,
            questao_id=questao.questao_id,
            resposta_usuario=resposta_usuario,
            acertou=acertou,
            data_conclusao=agora,
        )
        db.add(existente)

    db.commit()
    db.refresh(existente)

    return existente, not ja_existia


def calcular_percentual(concluidas: int, total: int) -> float:
    if total == 0:
        return 0.0
    return round(100 * concluidas / total, 1)


def progresso_do_modulo(db: Session, usuario_id: int, modulo: int) -> dict:
    if modulo not in NOMES_MODULOS:
        raise ModuloInvalidoError(modulo)

    total = (
        db.query(func.count(Questao.questao_id))
        .filter(Questao.modulo == modulo)
        .scalar()
        or 0
    )

    # Somente acerto conta como concluído
    concluidas = (
        db.query(func.count(UsuarioQuestao.questao_id))
        .join(Questao, Questao.questao_id == UsuarioQuestao.questao_id)
        .filter(
            UsuarioQuestao.usuario_id == usuario_id,
            UsuarioQuestao.acertou.is_(True),
            Questao.modulo == modulo,
        )
        .scalar()
        or 0
    )

    return {
        "modulo": modulo,
        "nome": NOMES_MODULOS[modulo],
        "concluidas": concluidas,
        "total": total,
        "percentual": calcular_percentual(concluidas, total),
        "concluido": total > 0 and concluidas == total,
    }

def calcular_progresso(db: Session, usuario_id: int) -> dict:
    modulos = [
        progresso_do_modulo(db, usuario_id, numero)
        for numero in sorted(NOMES_MODULOS)
    ]
    total = sum(m["total"] for m in modulos)
    concluidas = sum(m["concluidas"] for m in modulos)

    return {
        "geral": {
            "concluidas": concluidas,
            "total": total,
            "percentual": calcular_percentual(concluidas, total),
        },
        "modulos": modulos,
    }

def listar_respostas(db: Session, usuario_id: int, modulo: int) -> list[dict]:
    linhas = (
        db.query(UsuarioQuestao, Questao.codigo)
        .join(Questao, Questao.questao_id == UsuarioQuestao.questao_id)
        .filter(
            UsuarioQuestao.usuario_id == usuario_id,
            Questao.modulo == modulo,
        )
        # codigo é texto: ORDER BY codigo puro devolveria m1-q10 antes de
        # m1-q2. Ordena pelo sufixo numérico para a lista sair na mesma
        # ordem do formulário. O COALESCE cobre as questões antigas sem
        # número (legacy-qN do seed 001), que vão para o fim.
        .order_by(
            func.split_part(Questao.codigo, "-", 1),
            func.coalesce(
                func.nullif(
                    func.substring(Questao.codigo, "([0-9]+)$"), ""
                ).cast(Integer),
                0,
            ),
        )
        .all()
    )

    return [
        {
            "codigo": codigo,
            "resposta_usuario": registro.resposta_usuario,
            "acertou": registro.acertou,
            "data_conclusao": registro.data_conclusao,
        }
        for registro, codigo in linhas
    ]


def obter_modulo(db: Session, usuario_id: int, modulo: int) -> dict:
    # progresso_do_modulo valida o módulo e levanta ModuloInvalidoError.
    # Precisa vir antes de NOMES_MODULOS[modulo], senão um módulo inválido
    # estoura KeyError no dict em vez de virar 404 no router.
    progresso = progresso_do_modulo(db, usuario_id, modulo)
    return {
        "modulo": modulo,
        "nome": NOMES_MODULOS[modulo],
        "progresso": progresso,
        "respostas": listar_respostas(db, usuario_id, modulo),
    }