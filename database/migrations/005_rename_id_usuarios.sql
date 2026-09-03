-- Migração 005: Renomear coluna id para usuario_id na tabela usuarios
-- Descrição: Esta migração renomeia a coluna id para usuario_id na tabela usuarios
-- garantindo consistência com outras tabelas e melhor clareza no esquema do banco de dados.

ALTER TABLE usuarios RENAME COLUMN id TO usuario_id;