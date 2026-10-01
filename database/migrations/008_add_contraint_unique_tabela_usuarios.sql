-- Migração 008: adicionar constraint a tabela usuaiors
-- Coluna nome agora tem constraint UNIQUE
-- Constraint adicionado para evitar duplicas no banco de dados

ALTER TABLE usuarios ADD CONSTRAINT nome_unico UNIQUE (nome);
