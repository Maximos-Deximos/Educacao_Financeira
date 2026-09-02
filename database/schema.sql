CREATE TABLE usuarios (
    id BIGINT GENERATED ALWAYS AS IDENTITY,

    nome VARCHAR(100) NOT NULL,

    senha_hash TEXT NOT NULL,

    CONSTRAINT pk_usuarios
        PRIMARY KEY (id)
);


CREATE TABLE questoes (
    id BIGINT GENERATED ALWAYS AS IDENTITY,

    enunciado TEXT NOT NULL,

    resposta_correta TEXT NOT NULL,

    modulo SMALLINT NOT NULL,

    CONSTRAINT pk_questoes
        PRIMARY KEY (id),

    CONSTRAINT chk_questoes_modulo
        CHECK (modulo IN (1, 2))
);


CREATE TABLE usuarios_questoes (
    usuario_id BIGINT NOT NULL,

    questao_id BIGINT NOT NULL,

    resposta_usuario TEXT NOT NULL,

    data_conclusao TIMESTAMPTZ,

    acertou BOOLEAN NOT NULL,

    CONSTRAINT pk_usuario_questoes
        PRIMARY KEY (usuario_id, questao_id),

    CONSTRAINT fk_usuarios_questoes_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_usuarios_questoes_questoes
        FOREIGN KEY (questao_id)
        REFERENCES questoes(id)
);


CREATE INDEX idx_usuarios_questoes_questao_id
    ON usuarios_questoes(questao_id);