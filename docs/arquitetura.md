# Arquitetura Geral

## Visão geral

A aplicação será estruturada em três camadas principais:

1. **Front-end**
2. **Back-end**
3. **Banco de dados relacional**

### Fluxo da aplicação

```text
┌─────────────────────────┐
│       Front End         │
│ HTML + CSS + JS         │
└────────────┬────────────┘
             │ HTTP/JSON
             ▼
┌─────────────────────────┐
│       FastAPI           │
│         Python          │
└────────────┬────────────┘
             │ SQLAlchemy
             ▼
┌─────────────────────────┐
│      PostgreSQL         │
│        Docker           │
└─────────────────────────┘
```

