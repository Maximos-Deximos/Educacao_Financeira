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


clone o repositorio

git clone https://github.com/Maximos-Deximos/Educacao_Financeira

cd /localização_do_projeto_clonado/Educação_Financeira

## Configuração de ambienta para desenvolvimento frontend

## Inicialize um servidor http para carregar componentes do frontend

python3 -m http.server [porta_de_sua_escolha]

- exemplo: pyhton3 -m http.server 6767

para acessar o servidor criado basta escrever no navegador:

http://localhost:[porta]

- exemplo: http://localhost:6767

## Configuração de desenvolvimento backend

Localize o arquivo chamado .env.example

- Arquivos que começam com "." são arquivos ocultos, Ctrl + h para deixar-los visiveis (ou ls -a)

Crie um arquivo chamado .env, e adicione a senha de "POSTGRES_PASSWORD="

Configure a conexão no DBeaver para trabalhar no banco de dados

Configurações das .venv irão ser feitas Quando o banco de dados estiver pronto


## Inicialize um servidor http para carregar componentes do frontend

python3 -m http.server [porta_de_sua_escolha]

- exemplo: pyhton3 -m http.server 6767

para acessar o servidor criado basta escrever no navegador:

http://localhost:[porta]

- exemplo: http://localhost:6767


## inicie o container docker

docker compose up -d

Verifique se a instalação da imagem está correta com

docker ps

deve estar:

CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                                         NAMES
xxxxxxxxxxxx   postgres:18   "docker-entrypoint.s…"   10 seconds ago   Up 10 seconds   0.0.0.0:5050->5432/tcp, [::]:5050->5432/tcp   investimentes_db

## Configure o DBeaver

Crie uma nova conexão

Adicione os dados do banco de dados que estão localizados no arquivo .env

Pronto, seu ambiente de trabalho está completo.

### Limpando ambiente de trabalho

Quando você finalizar seus desenvolvimentos do dia

Derrube o container docker com:

docker compose down

- container tem que ser levantado toda vez que você for trabalhar no banco de dados
