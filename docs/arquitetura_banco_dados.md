# Arquitetura do Banco de Dados

## Visão geral

O banco de dados apresentado é composto por quatro tabelas:

-   `usuarios`
-   `usuarios_questões`
-   `questoes`

A tabela `usuarios_questões` funciona como uma tabela associativa entre
usuários e questões, armazenando também os dados referentes à conclusão
de cada questão.

------------------------------------------------------------------------

## 1. Tabela `usuarios`

Armazena os dados dos usuários.

  Chave   Tipo     Campo
  ------- -------- ------------
  PK      ---      `UniqueID`
  ---     `str`    `nome`
  ---     `text`   `senha_hash`

### Campos

-   **`UniqueID`** --- chave primária do usuário.
-   **`nome`** --- nome do usuário.
-   **`senha_hash`** --- senha do usuário armazenado como hash.

------------------------------------------------------------------------

## 2. Tabela `questoes`

Armazena as questões disponíveis.

  Chave   Tipo    Campo
  ------- ------- -------------
  PK      ---     `UniqueID`
  ---     `str`   `resposta`
  ---     `str`   `enunciado`

### Campos

-   **`UniqueID`** --- chave primária da questão.
-   **`resposta`** --- resposta associada à questão.
-   **`enunciado`** --- texto/enunciado da questão.

------------------------------------------------------------------------

## 3. Tabela `usuarios_questões`

Tabela associativa que relaciona usuários e questões. O diagrama indica
que `usuario_id` e `questao_id` fazem parte da chave primária composta e
também são chaves estrangeiras.

  Chave     Tipo     Campo
  --------- -------- --------------------
  PK, FK1   ---      `usuario_id`
  PK, FK2   ---      `questao_id`
  ---       `date`   `data_conclusão`
  ---       `str`    `resposta_usuario`
  ---       `bool`   `acertou`

### Campos

-   **`usuario_id`** --- identifica o usuário relacionado; chave
    estrangeira para `usuarios`.
-   **`questao_id`** --- identifica a questão relacionada; chave
    estrangeira para `questoes`.
-   **`data_conclusão`** --- data de conclusão da questão pelo usuário.
-   **`resposta_usuario`** --- resposta fornecida pelo usuário.
-   **`acertou`** --- indica se a resposta do usuário estava correta.

### Chave primária

A chave primária é composta por:

``` text
(usuario_id, questao_id)
```

------------------------------------------------------------------------

## Calculo de porcentagem de conclusão será feito pelo back`

------------------------------------------------------------------------

## Relacionamentos

### `usuarios` → `usuarios_questões`

``` text
usuarios.UniqueID
       │
       └──────> usuarios_questões.usuario_id
```

Um usuário pode possuir vários registros em `usuarios_questões`.

### `questoes` → `usuarios_questões`

``` text
questoes.UniqueID
       │
       └──────> usuarios_questões.questao_id
```

Uma questão pode estar associada a vários usuários por meio de
`usuarios_questões`.


------------------------------------------------------------------------

## Modelo relacional simplificado

``` text
┌──────────────────┐
│     usuarios     │
├──────────────────┤
│ PK id            │
│ nome             │
│ email            │
│ senha_hash       │
└────────┬─────────┘
         │
         │ 1:N
         ▼
┌─────────────────────────┐
│    usuarios_questoes    │
├─────────────────────────┤
│ PK/FK usuario_id        │
│ PK/FK questao_id        │
│ resposta_usuario        │
│ data_conclusao          │
│ acertou                 │
└───────────┬─────────────┘
            │
            │ N:1
            ▼
┌──────────────────┐
│     questoes     │
├──────────────────┤
│ PK id            │
│ enunciado        │
│ resposta_correta │
└──────────────────┘
```
