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
    id         BIGINT GENERATED ALWAYS AS IDENTITY,
    nome       VARCHAR(100) NOT NULL,
    senha_hash TEXT         NOT NULL,

    CONSTRAINT pk_usuarios PRIMARY KEY (id)
);

-- 2. TABELA questoes
CREATE TABLE IF NOT EXISTS questoes (
    id               BIGINT  GENERATED ALWAYS AS IDENTITY,
    enunciado        TEXT    NOT NULL,
    resposta_correta TEXT    NOT NULL,
    -- 1 = módulo básico | 2 = módulo intermediário
    modulo           SMALLINT NOT NULL,

    CONSTRAINT pk_questoes      PRIMARY KEY (id),
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
        REFERENCES usuarios (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_usuarios_questoes_questoes
        FOREIGN KEY (questao_id)
        REFERENCES questoes (id)
        ON DELETE CASCADE
);

-- 4. ÍNDICES DE APOIO
-- Consultas de progresso por módulo: filtrar questões de um
-- usuário pelo módulo passa por usuarios_questoes -> questoes.
CREATE INDEX IF NOT EXISTS idx_questoes_modulo
    ON questoes (modulo);

CREATE INDEX IF NOT EXISTS idx_usuarios_questoes_questao
    ON usuarios_questoes (questao_id);

-- SEED (dados de exemplo - OPCIONAL)
--
-- Para popular apenas a estrutura, remova as linhas abaixo ou
-- execute apenas a parte 1-4. Os dados abaixo são apenas para
-- desenvolvimento inicial e serão substituídos pelas questões
-- reais definidas em docs/modulos.md.
-- A seed usa ON CONFLICT DO NOTHING para que o schema possa ser
-- reexecutado sem erro (idempotente).
INSERT INTO questoes (enunciado, resposta_correta, modulo) VALUES
    ('Pergunta_teste1', 'resposta_teste1', 1),
    ('Pergunta_teste2', 'resposta_teste2', 1),
    ('Pergunta_teste3', 'resposta_teste3', 2),
    ('Pergunta_teste4', 'resposta_teste4', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO usuarios (nome, senha_hash)
SELECT 'Estudante Exemplo', 'hash_de_teste';
