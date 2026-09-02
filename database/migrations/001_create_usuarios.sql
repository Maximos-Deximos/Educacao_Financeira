-- Migração: 001_create_usuarios.sql
-- Descrição: Cria a tabela "usuarios"

CREATE TABLE usuarios (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    nome VARCHAR(100) NOT NULL,
    senha_hash TEXT NOT NULL,

    CONSTRAINT pk_usuarios
        PRIMARY KEY (id)
);

-- "id: BIGINT GENERATED ALWAYS AS IDENTITY"; Popula automaticamente o campo "id"
-- com um valor único e crescente para cada novo usuário inserido na tabela.
-- Isso garante que cada usuário tenha um identificador exclusivo.

-- "nome VARCHAR(100) NOT NULL";
-- Define a coluna "nome" como do tipo "VARCHAR(100)" e não permite valores nulos.

-- "senha_hash TEXT NOT NULL";
-- Define a coluna "senha_hash" como do tipo "TEXT" e não permite valores nulos.

-- CONSTRAINT pk_usuarios
--        PRIMARY KEY (id);
-- Relaciona a tabela "usuarios" com a chave primária "id"
-- garantindo que cada usuário tenha um identificador único e não nulo.