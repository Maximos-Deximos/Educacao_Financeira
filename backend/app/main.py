from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

import app.models.usuarios
import app.models.questoes
import app.models.usuarios_questoes
# Routers serão implementados conforme forem adicionados

# Criar tabelas que ainda não existem (preservando dados)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="InvestiMentes_API",
    description="Backend do projeto",
    version="0.1.0", # ultra beta
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[*], # aceita qualquer origem, ajustar depois
    allow_credentials=True,
    allow_methods=[*],
    allow_headers=[*],
)

# todo
# Inclui os routers quando existirem
# app.include_router(auth.router, prefix="/auth", tags=["auth"])
# app.include_router(user.router, prefix="/users", tags=["users"])
# app.include_router(form.router, prefix="/form", tags=["form"])

@app.get("/health", tags=["health"])
def health_check():
    """Endpoint simples para validar que a API está no ar."""
    return {"status": "ok"}


@app.get("/")
def root():
    return {"message": "InvestiMentes API", "docs": "/docs"}