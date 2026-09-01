create table questoes(
	id BIGINT GENERATED ALWAYS AS identity,
	enunciado text NOT NULL,
	resposta_correta text not null,
	CONSTRAINT pk_questoes
        PRIMARY KEY (id)
)