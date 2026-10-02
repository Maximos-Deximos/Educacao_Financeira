-- Migração 007: chave natural e campos de apoio em questoes
--
-- O formulário (frontend/js/pages/atividades.js) identifica as questões
-- pelo código "m1-q1".."m2-q16", e não pelo questao_id gerado pelo banco.
-- Sem o código, o back não consegue casar a resposta enviada pelo front
-- com a linha de questoes.
--
-- Também entra materia (agrupamento didático, só informativa) e
-- valor_esperado (resposta numérica alternativa das questões de cálculo,
-- usada por form_service.conferir_resposta).
--
-- Execução:  psql -U <usuario> -d <banco> -f 007_add_codigo_materias_questoes.sql

-- 1. Colunas (IF NOT EXISTS para a migração ser reexecutável)
ALTER TABLE questoes
    ADD COLUMN IF NOT EXISTS codigo         VARCHAR(20),
    ADD COLUMN IF NOT EXISTS materia        TEXT,
    ADD COLUMN IF NOT EXISTS valor_esperado NUMERIC(12, 2);

-- 2. Backfill das questões que já existiam.
-- As do seed 001 são fictícias ("questao1".."questao4") e não fazem
-- parte do formulário, então recebem um código descartável em vez de um
-- m1-qN real. O sufixo do id mantém a unicidade e não colide com os
-- códigos que o seed 004_questoes_reais.sql vai inserir.
UPDATE questoes
   SET codigo = 'legacy-q' || questao_id
 WHERE codigo IS NULL;

-- 3. Constraints
-- O código passa a ser obrigatório: é o que o back usa para achar a questão.
-- Sem DEFAULT de propósito — um DEFAULT que inventasse código escondido
-- quebraria a reidratação do formulário em silêncio. O SET NOT NULL
-- abaixo falha alto se sobrar linha sem backfill.
ALTER TABLE questoes
    ALTER COLUMN codigo SET NOT NULL;

-- UNIQUE solto (ADD CONSTRAINT IF NOT EXISTS não existe no PostgreSQL).
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uq_questoes_codigo'
    ) THEN
        ALTER TABLE questoes ADD CONSTRAINT uq_questoes_codigo UNIQUE (codigo);
    END IF;
END $$;

-- 4. Índice de apoio das consultas de progresso por módulo.
CREATE INDEX IF NOT EXISTS idx_questoes_modulo ON questoes (modulo);
