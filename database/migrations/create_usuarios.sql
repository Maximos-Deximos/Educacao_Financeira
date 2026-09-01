CREATE TABLE usuarios (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    nome VARCHAR(100) NOT NULL,
    senha_hash TEXT NOT NULL,

    CONSTRAINT pk_usuarios
        PRIMARY KEY (id)
);