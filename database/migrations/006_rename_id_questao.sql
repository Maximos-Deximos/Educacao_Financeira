-- Migração 006: Renomear coluna id para questao_id na tabela questoes
-- Descrição: Esta migração renomeia a coluna id para questao_id na tabela
-- questoes garantindo consistência com outras tabelas e melhor clareza 
-- no esquema do banco de dados.

ALTER TABLE questoes RENAME COLUMN id TO questao_id;