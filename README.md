# InvestiMentes: Educação Financeira

IvestiMentes: Educação Financeira é uma aplicação web voltada para estudantes que visa ensinar conceitos de educação financeiras à aqueles que desejam aprender.

## Objetivo

Ensinar conceitos de educação financeira através conteúdos organizados em dois módulos, materiais complementares, videoaulas, exercícios, avaliações e acompanhamento do progresso. O objetivo pedagógico consiste em apresentar os conteúdos de forma progressiva.

## Tecnologias

- Front-end: HTML + CSS + JS
- Back-end: python (fastAPI)
- Banco: PostgreSQL

## Como executar

Veja desenvolvimento.md

- Essa seção será atualizado no final do projeto

### Pré-requisitos

- docker
- python3
- Dbeaver ou outro editor de banco de dados

## Instalação

### 1. Clonar o repositório

git clone https://github.com/Maximos-Deximos/Educacao_Financeira/tree/main

cd /local-de-clonagem/InvestiMentes

### 2. Configurar o banco de dados

TODO: exibir senha de .env?

Na raiz do projeto execute:
```text
docker compose up -d
```
Verifique que o container docker está rodando:
```text
docker ps
```

Criação das tabelas

Após iniciar o banco de dados, execute o scrip schema.sql dentro do Dbeaver

### 3. Configurar ambiente virtual python

Crie o ambiente virtual:
```text
python -m venv .venv
```
Ative o ambiente virtual.

Linux/macOS
```text
source .venv/bin/activate
```
Windows
```
.venv\Scripts\Activate.ps1
```
Após a ativação, o terminal deverá indicar que o ambiente virtual está ativo.

Instalar depedencias:
```text
pip install -r requirements.txt
```

### 4. Configurar variaveis de ambiente

Crie um arquivo [.env] na raiz do projeto

Utilize o arquivo .env.example para popular o arquivo .env

### 5. Executar o backend

Com o ambiente virtual ativado e estando no diretório backend, execute:

uvicorn app.main:app --reload --port 8888

### 6. Executar o frontend

Abra outro terminal e entro do diretório frontend/

abra um servidor http python
```text
python3 -m http.server 6767
```

## A aplicação web está pronta para ser utilizada

### Contexto acadêmico

Este projeto está sendo desenvolvido no contexto de uma atividade acadêmica
proporcionada pela Uninassau Olinda.

O presente repositório já existia anteriormente ao início da atividade e
está sendo utilizado como base para o desenvolvimento da aplicação web
solicitada pela instituição.

Durante o desenvolvimento, o projeto está sendo adaptado e expandido para
atender aos requisitos funcionais e técnicos estabelecidos para a atividade.

## Membros 

```text
| Nome          | Matrícula | Papel         |
|---------------|-----------|---------------|
|Manoel Henrique| 01883036  | Scrum Master  |
| Ana Gabriela  | 01888284  | Documentador  |
| marcos antonio| 01904977  | Documentador  |
| Carlos Eduardo| 01895375  | Documentador  |
| Ricardo Araújo| 01901307  | Desenvolvedor |
| Samuel Lucas  | 01914652  | Desenvolvedor |
|Matheus Martins| 01931050  | Desenvolvedor |
| Clara Beatriz | 01895358  | Desenvolvedor |
| Miguel Marques| 01898398  |   testador    |
| Arthur Felipe | 01886375  |   testador    |
```