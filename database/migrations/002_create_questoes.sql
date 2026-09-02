-- Migração: 002_create_questoes.sql
-- Descrição: Cria a tabela "questoes"

create table questoes(
	id BIGINT GENERATED ALWAYS AS identity,
	enunciado text NOT NULL,
	resposta_correta text not null, 
	CONSTRAINT pk_questoes
        PRIMARY KEY (id)
);

-- "id: BIGINT GENERATED ALWAYS AS identity"; Popula automaticamente o campo "id"
-- com um valor único e crescente para cada nova questão inserida na tabela.
-- Isso garante que cada questão tenha um identificador exclusivo.

-- "enunciado text NOT NULL";
--  Define a coluna "enunciado" como do tipo "text" e não permite valores nulos.

-- "resposta_correta text not null";
-- Define a coluna "resposta_correta" como do tipo "text" e não permite valores nulos.

-- CONSTRAINT pk_questoes
--        PRIMARY KEY (id);
-- Relaciona a tabela "questoes" com a chave primária "id"
-- garantindo que cada questão tenha um identificador único e não nulo.