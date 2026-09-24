import os

import pytest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base

import app.models.usuarios
import app.models.questoes
import app.models.usuarios_questoes

# Sincroniza com o banco de dados testes
TESTE_DATABASE_URL = (f"postgresql+psycopg://{os.getenv('POSTGRES_USER', 'investimentes_app')}:"
    f"{os.getenv('POSTGRES_PASSWORD', '55555')}" # senha exposta para fins de testes. Remover depois
    f"@localhost:{os.getenv('POSTGRES_PORT', '5050')}/"
    f"{os.getenv('POSTGRES_TEST_DB', 'investimentes_test')}"
)

test_engine = create_engine(TESTE_DATABASE_URL, pool_pre_ping=True)

# Cria os schemas, mantem o banco de dados novo a cada fez que ele for testado
@pytest.fixture(scope="session")
def engine():
    # Garante que as tabelas das models existam, preserva os seeds
    Base.metadata.create_all(test_engine)
    yield test_engine

# Isola o banco de dados testes
@pytest.fixture()
def db_session(engine):
    """Sessão isolada via transação: rollback ao final, seeds preservados."""
    connection = engine.connect()
    transaction = connection.begin()

    Session = sessionmaker(bind=connection, autoflush=False, autocommit=False)
    session = Session()

    yield session

    session.close()
    transaction.rollback()
    connection.close()

# Um banco de dados testes não é necessáriamente preciso para essa aplicação web
# Mas Acredito que a experiencia de configurar um possa ser valiosa para projetos futuros.