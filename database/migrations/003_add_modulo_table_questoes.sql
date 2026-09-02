-- Migração: 003 add_modulo_table_questoes.sql
-- Descrição: Adiciona a coluna "modulo"  

-- 1. Adiciona a coluna "modulo"
ALTER TABLE questoes
ADD COLUMN modulo SMALLINT;

-- 2. Define módulo das questoẽs existente
-- definidas como 1(básico)
UPDATE questoes
SET modulo = 1;

-- 3. Impede que novas alterção a coluna "modulo" seja nula
ALTER TABLE questoes
ALTER COLUMN modulo SET NOT NULL;

-- 4. Permite somento modulos 1 e 2 (básico e avançado)
ALTER TABLE questoes
ADD CONSTRAINT chk_modulo CHECK (modulo IN (1, 2));