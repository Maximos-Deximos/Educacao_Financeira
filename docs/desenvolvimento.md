# Como contribuir

Clone o repositório

git clone https://github.com/Maximos-Deximos/Educacao_Financeira

## instalar dependências

### Sistema

Usamos docker para hospedar o banco de dados

- Siga o guia de instalação do docker:

https://docs.docker.com/engine/install

- DBeaver para desenvolver e testar o banco de dados:

https://dbeaver.io/

- Insominia REST para testar às API's

https://insomnia.rest/download

- Qualquer IDE de sua escolha

### Container docker

postgreSQL

### ambientes virtuais .venv

- FastAPI
- Uvicorn
- SQLAlchemy
- Driver PostgreSQL 
- Alembic
- pytest
- httpx 

# Branches

- `main` — código estável
- `feature/front/nome_da_feature-*` — novas funcionalidades do front
- `feature/back/nome_da_feature-*` — novas funcionalidades do back
- `fix/front/nome_do_fix-*` — correções do front
- `fix/back/nome_do_fix-*` — correções do back
- `docs/tipo_de_doc(front-back)/nome_do_fix-*` — documentação

# NUNCA PUSHAR CODIGO DIRETAMENTE NA MAIN
Desenvolvimentos da aplicação DEVEM ser feitos em branches, quando os desenvolvimento passar pelo QA faremos um merger para main.

- Criar uma branch para cada feature/pagina/fix para garantir que o codigo na main continue estável e funcional

## Commits

Usamos Conventional Commits:

exemplo:

feat: adiciona login
fix: corrige validação de usuário
docs: atualiza documentação

## O desenvolvimento seguirá o seguinte cronograma:

```text
                 DESENVOLVIMENTO
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
      FRONT END                  BANCO
   HTML/CSS/JS              PostgreSQL
          │                         │
          │                         ▼
          │                    SQLAlchemy
          │                         │
          └──────────┬──────────────┘
                     ▼
                  BACK END
                  FastAPI
                     │
                     ▼
                 INTEGRAÇÃO
                     │
                     ▼
                  TESTES
```
O frontend poderá trabalhar com dados fictícios enquanto o banco está sendo desenvolvido

# Como configurar ambiente de trabalho

cd /localização_do_projeto_clonado/Educação_Financeira

Localize o arquivo chamado .env.example:
```text
POSTGRES_DB=investimentes
POSTGRES_USER=investimentes_app
POSTGRES_PASSWORD="SENHA"
POSTGRES_PORT=5432
```
Renomeie o arquivo para somente ".env", e adicione a senha de "POSTGRES_PASSWORD="

- Configure a conexão no DBeaver para trabalhar no banco de dados

- Configurações das .venv irão ser feitas Quando o banco de dados estiver pronto


