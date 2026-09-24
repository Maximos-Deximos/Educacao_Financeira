# Essa arquivo testa o backend da API de autenticação

import pytest
import jwt

from fastapi.testclient import TestClient



# ignore os erros, pytest.ini conserta eles
from app.database import get_db
from app.main import app
from app.security import ALGORITHM, SECRET_KEY

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

# Abaixo segue os testes de autenticação com tokens JWT
def registrar_usuario_de_login(client):
    resp = client.post("/auth/register",
                       json={"usuario": "loginok", 
                             "senha": "666666"},)
    assert resp.status_code == 201
    return resp.json()

def test_login_sucesso_200(client):
    dados = registrar_usuario_de_login(client)
    resp = client.post("/auth/login", json={"usuario": "loginok",
                                            "senha": "666666"},)
    assert resp.status_code == 200
    corpo = resp.json()
    assert corpo["token_type"] == "bearer"
    payload = jwt.decode(corpo["access_token"], SECRET_KEY, algorithms=[ALGORITHM])
    assert payload["sub"] == str(dados["usuario_id"])

def test_login_senha_errada_401(client):
    registrar_usuario_de_login(client)
    resp = client.post("/auth/login",
                       json={"usuario": "loginok", "senha": "erradosenha09"})
    assert resp.status_code == 401 # Meu favorito

def test_login_usuario_inexistente_401(client):
    registrar_usuario_de_login(client)
    resp = client.post("/auth/login", json={"usuario": "nao-existe", "senha": "8989898989"})
    assert resp.status_code == 401

def test_me_sem_token_401(client):
    assert client.get("/auth/me").status_code == 401

def test_me_token_invalido_401(client):
    resp = client.get("/auth/me", headers={"Authorization": "Bearer token-invalido"})
    assert resp.status_code == 401

def test_me_com_token_200(client):
    registrar_usuario_de_login(client)
    login = client.post("/auth/login", json={"usuario": "loginok", "senha": "666666"})
    token = login.json()["access_token"]
    resp = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    assert resp.json()["usuario"] == "loginok"