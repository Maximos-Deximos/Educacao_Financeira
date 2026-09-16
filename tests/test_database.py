from sqlalchemy import text

# ignore os erros pytest.ini conserta eles
from app.models.questoes import Questao
from app.models.usuarios import Usuario
from app.models.usuarios_questoes import UsuarioQuestao


#Validação da conexão

def test_conexao_banco(db_session):
    resultado = db_session.execute(text("SELECT 1"))
    assert resultado.scalar() == 1


#alidação dos seeds (4 usuários, 4 questões, 4 respostas)

def test_seed_usuarios(db_session):
    assert db_session.query(Usuario).count() == 4


def test_seed_questoes(db_session):
    assert db_session.query(Questao).count() == 4


def test_seed_usuarios_questoes(db_session):
    assert db_session.query(UsuarioQuestao).count() == 4


# Validação das models/relacionamentos

def test_questao_segundo_modulo(db_session):
    avancadas = db_session.query(Questao).filter(Questao.modulo == 2)
    assert avancadas.count() == 2  # questao3 e questao4


def test_respostas_do_usuario_1(db_session):
    usuario = db_session.get(Usuario, 1)
    respostas = db_session.query(UsuarioQuestao)\
        .filter(UsuarioQuestao.usuario_id == usuario.usuario_id)

    assert respostas.count() == 2
    assert all(r.acertou in (True, False) for r in respostas)


def test_insert_rollback(db_session):
    """Prova o isolamento: dado inserido aqui não persiste após o teste."""
    novo = Usuario(nome="isolamento", senha_hash="hash_isolamento")
    db_session.add(novo)
    db_session.flush()

    assert db_session.query(Usuario).count() == 5

# O rollback da transação descarta o 'novo' após este teste;
# o próximo teste volta a ver contagem == 4.