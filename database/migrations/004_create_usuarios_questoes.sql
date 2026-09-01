-- Migração: 004_create_usuarios_questoes.sql
-- Descrição: Cria a tabela "usuarios_questoes" para armazenar as respostas
-- dos usuários para cada questão.

create table usuarios_questoes (
	usuario_id bigint not null,
	questao_id bigint not null,
	resposta_usuario text not null,
	data_conclusao TIMESTAMPTZ,
	acertou bool not null,
	
	constraint pk_usuario_questoes
    	primary key (usuario_id, questao_id),

	constraint fk_usuarios_questoes_usuarios
    	foreign key (usuario_id)
    	references usuarios(id),

	constraint fk_usuarios_questoes_questoes
        foreign key (questao_id)
        references questoes(id)

);

-- "usuario_id bigint not null"; Define a coluna "usuario_id" como do tipo "bigint"
-- e não permite valores nulos. 
-- Esta coluna armazena o identificador do usuário que respondeu à questão.

-- "questao_id bigint not null"; Define a coluna "questao_id" como do tipo "bigint" 
-- e não permite valores nulos. Esta coluna armazena o identificador 
-- da questão que foi respondida.

-- "resposta_usuario text not null"; Define a coluna "resposta_usuario" como do tipo "text" 
-- e não permite valores nulos. Esta coluna armazena a resposta fornecida 
-- pelo usuário para a questão.

-- "data_conclusao TIMESTAMPTZ"; Define a coluna "data_conclusao" como do tipo "TIMESTAMPTZ" 
-- (timestamp with timezone) e permite valores nulos. 
-- Esta coluna armazena a data e hora em que o usuário concluiu a questão.

-- "acertou bool not null"; Define a coluna "acertou" como do tipo "bool" e não permite valores 
-- nulos. Esta coluna indica se o usuário acertou ou não a questão.

-- constraint pk_usuario_questoes primary key (usuario_id, questao_id);
-- Define a chave primária composta pelas colunas "usuario_id" e "questao_id
-- garantindo que cada combinação de usuário e questão seja única na tabela.

-- constraint fk_usuarios_questoes_usuarios foreign key (usuario_id) references usuarios(id);
-- Define a chave estrangeira "fk_usuarios_questoes_usuarios" que referencia a
-- coluna "id" da tabela "usuarios", garantindo a integridade referencial
-- entre as tabelas "usuarios_questoes" e "usuarios".

-- constraint fk_usuarios_questoes_questoes foreign key (questao_id) references questoes(id);
-- Define a chave estrangeira "fk_usuarios_questoes_questoes" que referencia a
-- coluna "id" da tabela "questoes", garantindo a integridade referencial
-- entre as tabelas "usuarios_questoes" e "questoes".