-- Seed de desenvolvimento inicial
-- Feitos para facilitar testes e desenvolvimento, devem ser removidos ou substituídos por dados 
-- Reais na aplicação.

-- codigo became NOT NULL na migration 007, então precisa vir no INSERT.
-- Estas são fictícias e não entram no formulário (que usa m1-q1..m2-q16),
-- daí o prefixo "legacy-".
INSERT INTO questoes (codigo, enunciado, resposta_correta, modulo) VALUES
    ('legacy-q1', 'questao1', 'resposta_teste1', 1),
    ('legacy-q2', 'questao2', 'resposta_teste2', 1),
    ('legacy-q3', 'questao3', 'resposta_teste3', 2),
    ('legacy-q4', 'questao4', 'resposta_teste4', 2);

-- questoes fictícias para teste.