# Essa arquivo testa o backend da API de autenticação

import pytest
from fastapi.testclient import TestClient

from app.database import get_db
from app.main import app

@pytest.fixture()
def client(db_session):
    # substitui para o banco de dados de testes
    def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()

def test_registro_com_sucesso_201(client):
    resp = client.post(
        "/auth/register",
        json={"usuario": "novousuario", "senha": "porra123"},
    )
    assert resp.status_code == 201
    dados = resp.json()
    assert dados["usuario"] == "novousuario"
    assert isinstance(dados["usuario_id"], int)

def test_registro_usuario_duplicado_409(client):
    body = {"usuario": "duplicado", "senha": "porra123"}
    assert client.post("/auth/register", json=body).status_code == 201
    resp = client.post("/auth/register", json=body)
    assert resp.status_code == 409

def test_resgistro_senha_curta_422(client):
    resp = client.post(
        "/auth/register",
        json={"usuario": "lixo1", "senha": "777"},
    )
    assert resp.status_code == 422

def test_registro_usuario_invalido_422(client):
    resp = client.post(
        "/auth/register",
        json={"usuario": "Lixo$", "senha": "777"},
    )
    assert resp.status_code == 422