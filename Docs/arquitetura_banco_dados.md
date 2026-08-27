# Arquitetura do Banco de Dados

> Transcrição do diagrama ER apresentado na imagem
> `estrutura-banco_dados.jpeg`.

## Visão geral

O banco de dados apresentado é composto por quatro tabelas:

-   `usuarios`
-   `questoes`
-   `usuarios_questões`
-   `porcentagem_alunos`

A tabela `usuarios_questões` funciona como uma tabela associativa entre
usuários e questões, armazenando também os dados referentes à conclusão
e ao resultado de cada questão.

------------------------------------------------------------------------

## 1. Tabela `usuarios`

Armazena os dados dos usuários.

  Chave   Tipo     Campo
  ------- -------- ------------
  PK      ---      `UniqueID`
  ---     `str`    `nome`
  ---     `text`   `senha`

### Campos

-   **`UniqueID`** --- chave primária do usuário.
-   **`nome`** --- nome do usuário.
-   **`senha`** --- senha do usuário.

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

## 4. Tabela `porcentagem_alunos`

Armazena percentuais de progresso e acerto dos alunos.

  Chave   Tipo    Campo
  ------- ------- -------------------------
  PK      ---     `UniqueID`
  FK      ---     `aluno_id`
  ---     `int`   `porcentagem_conclusao`
  ---     `int`   `porcentagem_acerto`

### Campos

-   **`UniqueID`** --- chave primária do registro.
-   **`aluno_id`** --- identifica o aluno relacionado; no diagrama está
    marcado como chave estrangeira.
-   **`porcentagem_conclusao`** --- percentual de questões concluídas.
-   **`porcentagem_acerto`** --- percentual de questões respondidas
    corretamente.

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

### `usuarios` → `porcentagem_alunos`

``` text
usuarios.UniqueID
       │
       └──────> porcentagem_alunos.aluno_id
```

O diagrama indica `aluno_id` como chave estrangeira relacionada à tabela
`usuarios`.

------------------------------------------------------------------------

## Modelo relacional simplificado

``` text
┌─────────────────────┐
│       usuarios      │
├─────────────────────┤
│ PK UniqueID         │
│    nome             │
│    senha            │
└─────────┬───────────┘
          │
          │ usuario_id
                 ▼
┌─────────────────────────────┐
│      usuarios_questões      │
├─────────────────────────────┤
│ PK, FK1 usuario_id          │
│ PK, FK2 questao_id          │
│     data_conclusão          │
│     resposta_usuario        │
│     acertou                 │
└──────────────┬──────────────┘
               │ questao_id
                          ▼
┌─────────────────────┐
│       questoes      │
├─────────────────────┤
│ PK UniqueID         │
│    resposta         │
│    enunciado        │
└─────────────────────┘


┌─────────────────────────────┐
│     porcentagem_alunos      │
├─────────────────────────────┤
│ PK UniqueID                 │
│ FK aluno_id                 │
│    porcentagem_conclusao    │
│    porcentagem_acerto       │
└─────────────────────────────┘
                     ▲
            │ aluno_id
            │
       usuarios
```

## Observações

-   Os nomes e tipos de campos foram transcritos conforme aparecem no
    diagrama.
-   O diagrama usa `UniqueID` como chave primária em `usuarios`,
    `questoes` e `porcentagem_alunos`.
-   `usuarios_questões` possui uma chave primária composta por
    `usuario_id` e `questao_id`.
-   `usuarios_questões` representa a associação entre usuários e
    questões e registra o resultado da interação do usuário com cada
    questão.
-   A relação de `porcentagem_alunos.aluno_id` com `usuarios.UniqueID` é
    indicada visualmente no diagrama; a cardinalidade exata não está
    explicitada.
-   O diagrama apresenta `questoes` no plural e `usuarios_questões` com
    acentuação no nome da tabela. Esses nomes foram preservados na
    transcrição.
