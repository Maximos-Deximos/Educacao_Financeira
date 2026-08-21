# Arquitetura Geral

## Visão geral

A aplicação será estruturada em três camadas principais:

1. **Front-end**
2. **Back-end**
3. **Banco de dados relacional**

### Fluxo da aplicação

```text
┌─────────────────────────────┐
│          FRONT-END          │
│                             │
│    HTML + CSS + JavaScript  │
└──────────────┬──────────────┘
               │
               │ HTTP/HTTPS
               │ REST / JSON
               ▼
┌─────────────────────────────┐
│          BACK-END           │
│                             │
│       A ser definido        │
│    API / regras aplicação   │
└──────────────┬──────────────┘
               │
               │ SQL
               ▼
┌─────────────────────────────┐
│     BANCO RELACIONAL        │
│                             │
│  PostgreSQL / MySQL etc.    │
└─────────────────────────────┘
```

