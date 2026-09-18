import os

from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.usuarios import Usuario

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
ALGORITHM = "HS256"
ACESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def criar_token_acesso(usuario_id: int) -> str:
    expiracao = datetime.now(timezone.utc) + timedelta(
        minutes=ACESS_TOKEN_EXPIRE_MINUTES
    )
    payload = {"sub": str(usuario_id), "exp": expiracao}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_usuario_atual(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db),
) -> Usuario:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        usuario_id = int(payload["sub"])
    except(jwt.InvalidTokenError, KeyError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )

    usuario = db.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(status_code=401, detail="Usuario não existe.")
    return usuario

# Tokens não será salvo no banco (token stateless)
# No db é guardade somente o sub (id)
