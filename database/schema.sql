-- Transcrição de sqldump auxiliado por I.A

-- InvestiMentes: Educação Financeira
-- Schema do banco de dados (PostgreSQL)
--
-- Este arquivo recria o banco de dados em qualquer máquina.
-- Deve ser executado DENTRO do banco de dados alvo (não cria o
-- banco nem o usuário; o container Docker já faz isso via .env).
--
--   Execução:  psql -U <usuario> -d investimentes -f schema.sql
--
-- Política de recriação:
--   - O banco e o usuário são definidos no .env / docker-compose.
--   - Este schema apenas cria as tabelas, índices, constraints
--     e dados de exemplo (opcionais, ver seção SEED).

-- 1. TABELA usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id BIGINT GENERATED ALWAYS AS IDENTITY,
    nome       VARCHAR(100) NOT NULL,
    senha_hash TEXT         NOT NULL,

    CONSTRAINT pk_usuarios PRIMARY KEY (usuario_id),
    CONSTRAINT nome_unico UNIQUE (nome)
);

-- 2. TABELA questoes
CREATE TABLE IF NOT EXISTS questoes (
    questao_id       BIGINT         GENERATED ALWAYS AS IDENTITY,
    -- chave natural usada pelo formulário do front (m1-q1 ... m2-q16)
    codigo           VARCHAR(20)    NOT NULL,
    enunciado        TEXT           NOT NULL,
    resposta_correta TEXT           NOT NULL,
    -- 1 = módulo básico | 2 = módulo intermediário
    modulo           SMALLINT       NOT NULL,
    materia          TEXT,
    -- resposta numérica alternativa (m1-q6 = 40, m1-q15 = 50)
    valor_esperado   NUMERIC(12, 2),

    CONSTRAINT pk_questoes         PRIMARY KEY (questao_id),
    CONSTRAINT uq_questoes_codigo  UNIQUE (codigo),
    CONSTRAINT chk_questoes_modulo CHECK (modulo IN (1, 2))
);

-- 3. TABELA usuarios_questoes (tabela associativa)
CREATE TABLE IF NOT EXISTS usuarios_questoes (
    usuario_id     BIGINT              NOT NULL,
    questao_id     BIGINT              NOT NULL,
    resposta_usuario TEXT             NOT NULL,
    data_conclusao TIMESTAMPTZ        NULL DEFAULT CURRENT_TIMESTAMP,
    acertou        BOOLEAN             NOT NULL,

    CONSTRAINT pk_usuario_questoes PRIMARY KEY (usuario_id, questao_id),

    CONSTRAINT fk_usuarios_questoes_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios (usuario_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_usuarios_questoes_questoes
        FOREIGN KEY (questao_id)
        REFERENCES questoes (questao_id)
        ON DELETE CASCADE
);

-- 4. ÍNDICES DE APOIO
-- Consultas de progresso por módulo: filtrar questões de um
-- usuário pelo módulo passa por usuarios_questoes -> questoes.
CREATE INDEX IF NOT EXISTS idx_questoes_modulo
    ON questoes (modulo);

CREATE INDEX IF NOT EXISTS idx_usuarios_questoes_questao
    ON usuarios_questoes (questao_id);

-- SEEDS
-- A estrutura fica acima. Os dados de exemplo NÃO ficam aqui: estão em
-- database/migrations/001..008 e database/seeds/001..003, aplicados em ordem.
-- Aplicar 004_questoes_reais.sql para popular as 32 questões dos módulos.