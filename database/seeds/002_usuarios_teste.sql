-- Seed de desenvolvimento inicial
-- Feitos para facilitar testes e desenvolvimento, devem ser removidos ou substituídos por dados
-- Reais na aplicação.

-- senha_hash é bcrypt ($2b$12$), o mesmo formato de app/services/auth_service.py.
-- Todos os usuários deste seed têm a senha 666666.
--
-- Cada linha tem um salt diferente, como em contas criadas de verdade: o mesmo
-- hash não pode ser copiado entre usuários. Para gerar outro:
--
--   .venv/bin/python -c "import bcrypt; print(bcrypt.hashpw(b'666666', bcrypt.gensalt()).decode())"

INSERT INTO usuarios (nome, senha_hash) VALUES
    ('sergio',        '$2b$12$tUk6A3Yow7XkBaHBKUotfuCHa0GR7Odc3adwWNR9mS8N7ASwo3ZYG'), -- 666666
    ('andromeda',     '$2b$12$6vtJifVkyhW158nwjAu/Pu5XqzxZM2Lom6v/d6qsF1js/gwhHj4kW'),
    ('9999999999',    '$2b$12$epNFOMv.gVNxcQfIQSH0pOhiubVFrJho17Aiciz5L6MiP29arUaG.'),
    ('fhfeuhafudhjahf', '$2b$12$Lf1jxjGynMDYw6ZvdohWy.sjBzA68BbWjFtKtEwKzIY.9p2wd2Hny');

-- Senhas fictícias para teste. Estes hashes são a string "666666":
-- o bcrypt usa salt e é irreversível, então a senha em si não fica guardada aqui.