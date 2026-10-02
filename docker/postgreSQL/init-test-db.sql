-- Script de inicialização do banco de TESTES (investimentes_test).
--
-- Montado em /docker-entrypoint-initdb.d/ pelo docker-compose.yml. O entrypoint
-- do postgres roda os scripts dessa pasta SOMENTE quando o volume de dados está
-- vazio (primeira subida da máquina), então aqui não é preciso WRAPPER de
-- idempotência. O ON_ERROR_STOP=1 do docker_process_sql garante que qualquer
-- erro derrubamos o container em vez de seguir com o banco pela metade.
--
-- O postgres só cria POSTGRES_DB (investimentes) via env. O banco de testes,
-- usado por tests/conftest.py, precisa ser criado explicitamente.
--
-- Se o banco de testes já existe e precisa ser refeito do zero:
-- `docker compose down -v && docker compose up -d`. O volume postgres_data
-- guarda os dados, então o script não roda em um `up` qualquer.
--
-- O schema e os seeds são reaproveitados de /opt/database (bind mount de
-- ./database) em vez de duplicados aqui, para que o banco de testes e o de
-- desenvolvimento nunca divirjam.

-- 1. Cria o banco de testes.
-- CREATE DATABASE não roda dentro de transação; este arquivo é executado
-- fora de bloco transacional, então é seguro.
CREATE DATABASE investimentes_test;

-- 2. Aplica o mesmo schema do banco de desenvolvimento.
\connect investimentes_test

\i /opt/database/schema.sql

-- 3. Seeds de teste.
--
-- O seed 004 (questões reais) NÃO entra aqui: ele quebra as contagens
-- fixas de tests/test_database.py (4 usuários, 4 questões, 4 respostas) e
-- o próprio arquivo avisa para não ser aplicado em investimentes_test.
\i /opt/database/seeds/001_questoes_teste.sql
\i /opt/database/seeds/002_usuarios_teste.sql
\i /opt/database/seeds/003_usuarios_questoes_teste.sql

\connect postgres