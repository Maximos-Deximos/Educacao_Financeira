from decimal import Decimal

import pytest

from fastapi.testclient import TestClient


# ignore os erros, pytest.ini conserta eles
from app.database import get_db
from app.main import app
from app.models.questoes import Questao

# codigo, enunciado, resposta_correta, modulo, valor_esperado
# Códigos t1/t2 para não colidir com o seed 004 (que NÃO vai na base de testes)
QUESTOES_TESTE = [
    ("t1-q1", "Questao de teste 1", "A", 1, None),
    ("t1-q2", "Questao de teste 2", "B", 1, None),
    ("t1-q3", "Questao de teste 3", "C", 1, None),
    ("t1-q4", "Questao de teste 4", "D", 1, None),
    ("t1-q5", "Questao de calculo", "A", 1, Decimal("40")),
    ("t2-q1", "Questao do modulo 2", "A", 2, None),
    ("t2-q2", "Questao do modulo 2", "B", 2, None),
]


@pytest.fixture()
def client(db_session):
    # substitui para o banco de dados de testes
    def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture()
def questoes(client, db_session):
    """Cria questões com gabarito conhecido. O rollback da db_session remove tudo."""
    for codigo, enunciado, correta, modulo, valor in QUESTOES_TESTE:
        db_session.add(
            Questao(
                codigo=codigo,
                enunciado=enunciado,
                resposta_correta=correta,
                modulo=modulo,
                materia="Materia de teste",
                valor_esperado=valor,
            )
        )
    db_session.commit()
    return QUESTOES_TESTE


@pytest.fixture()
def usuario(client):
    resp = client.post("/auth/register", json={"usuario": "aluno", "senha": "porra123"})
    assert resp.status_code == 201
    login = client.post("/auth/login", json={"usuario": "aluno", "senha": "porra123"})
    assert login.status_code == 200
    return {"Authorization": f"Bearer {login.json()['access_token']}"}


# Ajudantes
def responder(client, usuario, codigo, resposta):
    return client.post(
        "/form/respostas",
        json={"codigo": codigo, "resposta_usuario": resposta},
        headers=usuario,
    )


def modulo_do_progresso(client, usuario, numero):
    corpo = client.get("/form/progresso", headers=usuario).json()
    return next(m for m in corpo["modulos"] if m["modulo"] == numero)


def modulo_com_total(client, usuario, numero, esperado):
    """Pula o teste se a base tiver questões além do fixture.

    Sem isso, as asserções de percentual quebrariam sem avisar o porquê.
    A causa costumeira é database/seeds/001_questoes_teste.sql, que cria
    as questões fictícias "questao1".."questao4" (após a migration 007
    elas viram legacy-q1..legacy-q4 e entram na contagem do módulo).
    """
    dados = modulo_do_progresso(client, usuario, numero)
    if dados["total"] != esperado:
        pytest.skip(
            f"A base de testes tem {dados['total']} questões no módulo {numero} "
            f"(o fixture cria {esperado}). Remova as questões do seed "
            "001_questoes_teste.sql de investimentes_test para este teste "
            "rodar."
        )
    return dados


# ---------- POST /form/respostas ----------
def test_registrar_resposta_201(client, questoes, usuario):
    resp = responder(client, usuario, "t1-q1", "A")
    assert resp.status_code == 201
    corpo = resp.json()
    assert corpo["codigo"] == "t1-q1"
    assert corpo["acertou"] is True
    assert corpo["primeira_vez"] is True
    assert corpo["data_conclusao"] is not None


def test_reenvio_resposta_200(client, questoes, usuario):
    assert responder(client, usuario, "t1-q1", "A").status_code == 201
    resp = responder(client, usuario, "t1-q1", "B")
    assert resp.status_code == 200
    assert resp.json()["primeira_vez"] is False


def test_resposta_errada_nao_conclui(client, questoes, usuario):
    resp = responder(client, usuario, "t1-q1", "B")
    assert resp.status_code == 201
    assert resp.json()["acertou"] is False


def test_letra_minuscula_conta_como_acerto(client, questoes, usuario):
    assert responder(client, usuario, "t1-q1", "a").json()["acertou"] is True


def test_questao_de_calculo_aceita_formatos(client, questoes, usuario):
    for texto in ("40", "40,00", "R$ 40,00", "40.00", "R$40"):
        resp = responder(client, usuario, "t1-q5", texto)
        # 201 só na primeira: as demais são reenvios de uma questão já
        # registrada, e voltam com 200.
        assert resp.status_code in (200, 201), texto
        assert resp.json()["acertou"] is True, texto


def test_questao_de_calculo_valor_errado(client, questoes, usuario):
    assert responder(client, usuario, "t1-q5", "50").json()["acertou"] is False


def test_questao_desconhecida_404(client, questoes, usuario):
    assert responder(client, usuario, "t1-zz", "A").status_code == 404


def test_resposta_vazia_422(client, questoes, usuario):
    assert responder(client, usuario, "t1-q1", "").status_code == 422


def test_resposta_malformada_422(client, questoes, usuario):
    assert responder(client, usuario, "t1-q1", "xyz").status_code == 422


def test_codigo_malformado_422(client, questoes, usuario):
    resp = client.post(
        "/form/respostas",
        json={"codigo": "QUESTAO_1", "resposta_usuario": "A"},
        headers=usuario,
    )
    assert resp.status_code == 422


# ---------- autenticação ----------
def test_rota_sem_token_401(client, questoes):
    assert client.post(
        "/form/respostas", json={"codigo": "t1-q1", "resposta_usuario": "A"}
    ).status_code == 401
    assert client.get("/form/progresso").status_code == 401
    assert client.get("/form/modulos/1").status_code == 401


def test_rota_token_invalido_401(client, questoes):
    cab = {"Authorization": "Bearer token-invalido"}
    assert client.post(
        "/form/respostas", json={"codigo": "t1-q1", "resposta_usuario": "A"}, headers=cab
    ).status_code == 401
    assert client.get("/form/progresso", headers=cab).status_code == 401


# ---------- GET /form/progresso ----------
def test_progresso_inicia_em_zero(client, questoes, usuario):
    resp = client.get("/form/progresso", headers=usuario)
    assert resp.status_code == 200
    corpo = resp.json()
    assert corpo["geral"]["concluidas"] == 0
    assert corpo["geral"]["percentual"] == 0.0
    assert [m["modulo"] for m in corpo["modulos"]] == [1, 2]
    assert [m["nome"] for m in corpo["modulos"]] == ["Básico", "Intermediário"]


def test_progresso_so_avanca_com_acerto(client, questoes, usuario):
    antes = modulo_do_progresso(client, usuario, 1)
    responder(client, usuario, "t1-q1", "A")
    depois = modulo_do_progresso(client, usuario, 1)

    assert depois["concluidas"] == antes["concluidas"] + 1
    assert depois["total"] == antes["total"]
    assert depois["percentual"] == pytest.approx(
        round(100 * depois["concluidas"] / depois["total"], 1)
    )

    responder(client, usuario, "t1-q2", "Z")
    estavel = modulo_do_progresso(client, usuario, 1)
    assert estavel["concluidas"] == depois["concluidas"]


def test_progresso_nao_regressa_apos_acerto(client, questoes, usuario):
    responder(client, usuario, "t1-q1", "A")
    responder(client, usuario, "t1-q1", "B")
    assert modulo_do_progresso(client, usuario, 1)["concluidas"] == 1


def test_geral_soma_os_modulos(client, questoes, usuario):
    # As quatro respostas batem com o gabarito do fixture, então as quatro
    # contam como concluídas.
    responder(client, usuario, "t1-q1", "A")
    responder(client, usuario, "t1-q2", "B")
    responder(client, usuario, "t2-q1", "A")
    responder(client, usuario, "t2-q2", "B")

    corpo = client.get("/form/progresso", headers=usuario).json()
    assert corpo["geral"]["concluidas"] == 4
    assert corpo["geral"]["concluidas"] == sum(m["concluidas"] for m in corpo["modulos"])
    assert corpo["geral"]["total"] == sum(m["total"] for m in corpo["modulos"])


def test_modulo_completo(client, questoes, usuario):
    for codigo, gabarito in (("t1-q1", "A"), ("t1-q2", "B"), ("t1-q3", "C"),
                             ("t1-q4", "D"), ("t1-q5", "40")):
        responder(client, usuario, codigo, gabarito)

    modulo = modulo_com_total(client, usuario, 1, 5)
    assert modulo["concluidas"] == 5
    assert modulo["percentual"] == 100.0
    assert modulo["concluido"] is True


def test_modulo_incompleto(client, questoes, usuario):
    """Um acerto não fecha o módulo, qualquer que seja o total do módulo.

    Não fixa o total de propósito: a base de testes carrega as questões
    fictícias do seed 001, e o módulo 1 somaria 7 em vez de 5.
    """
    antes = modulo_do_progresso(client, usuario, 1)
    responder(client, usuario, "t1-q1", "A")
    modulo = modulo_do_progresso(client, usuario, 1)

    assert modulo["concluidas"] == antes["concluidas"] + 1
    assert modulo["total"] == antes["total"]
    assert modulo["concluido"] is False
    assert modulo["percentual"] == pytest.approx(
        round(100 * modulo["concluidas"] / modulo["total"], 1)
    )


# ---------- GET /form/modulos/{modulo} ----------
def test_detalhe_modulo_traz_respostas_salvas(client, questoes, usuario):
    responder(client, usuario, "t1-q1", "A")
    responder(client, usuario, "t1-q2", "B")
    responder(client, usuario, "t2-q1", "A")

    mod1 = client.get("/form/modulos/1", headers=usuario)
    assert mod1.status_code == 200
    corpo = mod1.json()
    assert corpo["modulo"] == 1
    assert corpo["nome"] == "Básico"
    assert [r["codigo"] for r in corpo["respostas"]] == ["t1-q1", "t1-q2"]
    assert corpo["respostas"][0]["acertou"] is True
    assert corpo["progresso"]["concluidas"] == 2

    mod2 = client.get("/form/modulos/2", headers=usuario).json()
    assert [r["codigo"] for r in mod2["respostas"]] == ["t2-q1"]


def test_detalhe_modulo_reidratavel(client, questoes, usuario):
    """O que a Home/atividade leem precisa bater com o que foi gravado."""
    resp = responder(client, usuario, "t1-q5", "R$ 40,00")
    salva = client.get("/form/modulos/1", headers=usuario).json()["respostas"]
    assert len(salva) == 1
    assert salva[0]["codigo"] == "t1-q5"
    assert salva[0]["resposta_usuario"] == "R$ 40,00"
    assert salva[0]["acertou"] is True
    assert salva[0]["data_conclusao"] == resp.json()["data_conclusao"]


def test_detalhe_modulo_invalido_404(client, questoes, usuario):
    assert client.get("/form/modulos/9", headers=usuario).status_code == 404
    assert client.get("/form/modulos/0", headers=usuario).status_code == 404