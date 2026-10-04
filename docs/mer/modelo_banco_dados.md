## Modelo relacional simplificado

``` text
┌──────────────────┐
│     usuarios     │
├──────────────────┤
│ PK usuario_id    │
│ nome             │
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
└─────────────────────────┘
            ▲
            │ N:1
            │
┌─────────────────────┐
│      QUESTOES       │
├─────────────────────┤
│ PK questao_id       │
│ enunciado           │
│ resposta_correta    │
│ modulo              │
└─────────────────────┘
```