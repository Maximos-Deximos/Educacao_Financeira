-- Seed de desenvolvimento inicial
-- Feitos para facilitar testes e desenvolvimento, devem ser removidos ou substituídos por dados 
-- Reais na aplicação.

INSERT INTO usuarios_questoes (usuario_id, questao_id, resposta_usuario, data_conclusao, acertou) VALUES
    (1, 1, 'resposta_teste1', CURRENT_TIMESTAMP, TRUE),
    (1, 2, 'resposta_teste2', CURRENT_TIMESTAMP, FALSE),
    (2, 3, 'resposta_teste3', CURRENT_TIMESTAMP, TRUE),
    (2, 4, 'resposta_teste4', CURRENT_TIMESTAMP, FALSE);

-- respostas fictícias para teste.