## Membros 

```text
| Nome          | Matrícula | Papel         |
|---------------|-----------|---------------|
|Manoel Henrique| 01883036  | Scrum Master  |
| Ana Gabriela  | 01888284  | Documentador  |
| marcos antonio| 01904977  | Documentador  |
| Carlos Eduardo| 01895375  | Documentador  |
| Ricardo Araújo| 01901307  | Desenvolvedor |
| Samuel Lucas  | 01914652  | Desenvolvedor |
|Matheus Martins| 01931050  | Desenvolvedor |
| Clara Beatriz |           | Desenvolvedor |
| Miguel Marques| 01898398  |   testador    |
| Arthur Felipe | 01886375  |   testador    |
```


## Documentação

# Slides:
- possuimos essa categoria por apresentação da atividade
-feito a parte visual por marcos, pesquisas por ana gabriela e carlos

# Frontend:


**Index;**
-feito por Ricardo

_linguagens utilizadas:_
- HTML
- CSS
- JavaScript

_Objetivo da página:_
- Apresentar a premissa do site.
- Encaminhar o usuário para a tela de Login, ou Home caso já esteja cadastrado.

_A página contém:_
- Blocos de texto explicando a premissa do projeto.
- Imagens e ícones ilustrando o site e suas funcionalidades.
- Botões para encaminhar o usuário para a tela de Login, ou a Home.

_Mudanças relevantes:_
- A principio, havia um botão que levaria para uma página de cadastro, na qual não está presente na versão final.
- O footer era desenvolvido diretamente junto à página. Posteriormente, ele foi separado em um componente próprio e passou a ser carregado por meio de JavaScript, facilitando sua reutilização em outras páginas do site.
- centralização dos botões, autentificação do usuario.

*Imagens;*
- feito por ana gabriela

- As imagens do index foram desenhadas, pelo app ibis paint x. demorando-se cerca de 3 a 5 dias para cada arte.
- cada arte tem em conotação chamar a atenção do usuario, pelo estilo, e dar uma ar de responsabilidade e crebilidade ao site, e mostra que ele foi criado por pessoas que visão que a educação dos jovens deve não ser só jogada, mas dando a atenção e cuidado necessarios.

**Tela de Login;**
- feito por Clara

_linguagens utilizadas:_
- html
- css
- java script

_objetivo da pagina:_
- Entrada e cadastro do aluno no site.

_A página contém:_
-onde o aluno vai poder logar e se cadastrar, para poder acessar o site

_Mudanças relevantes:_
- organização dos arquivos, autenticação com tokens, centralização de botões

**Home;**

_linguagens utilizadas:_
- html
- css
- java script
_objetivo da pagina:_
- Resumo do progresso geral e acesso aos módulos.
_A página contém:_
- centraliza onde vai esta os modulos, e o progresso dos alunos
_Mudanças relevantes:_
- centralização dos botões, teste de autentificação, estutura dos arquivos,

**Modulos;**
- feito por Samuel

*Módulo 1, Básico*

-Matérias do módulo-

• Matéria 1 - Escolhas financeiras, necessidades, desejos e projetos • Matéria 2 - Orçamento pessoal, receitas e despesas • Matéria 3 - Consumo planejado, comparação de preços e desperdício • Matéria 4 - Poupança, metas e reserva para imprevistos

*Módulo 2, Intermediário*

Objetivo: Compreender os custos de utilizar crédito, prevenir o endividamento excessivo, conhecer os conceitos iniciais de investimento e reconhecer riscos financeiros. Questões desse módulos serão abertas com uma única alternativa correta. Questões fechadas serão apresentadas como exemplo.

-Matérias do módulo-

• Matéria 1 - Crédito, juros, cartão de crédito e Custo Efetivo Total • Matéria 2 - Endividamento, superendividamento e reorganização financeira • Matéria 3 - Investimentos: liquidez, risco e rentabilidade • Matéria 4 - Riscos financeiros, golpes, seguros e planejamento de futuro

_linguagens utilizadas:_
-HTML
-Css
-javascript
_objetivo da pagina:_
- É a área de ensino do aluno, onde ele irá assistir as vídeo aulas e responder as questões. O objetivo principal é o aprendizado do aluno.

_A página contém:_
-Botão de menu;
-Perfil e área de notificações;
-Vídeo do YouTube;
-Descrição da aula;
-Seção de Leitura Recomendada;
-Link para a leitura recomendada;
-Área de Fazer Atividade;
-Área de Aula Complementar;
-Informações sobre o módulo;
-Menu de navegação inferior;
-Layout adaptado para celulares.

_Mudanças relevantes:_
- restauração da pagina, estrutura da pagina

*Forms;*
- feito por Matheus 

- onde vai fica as questões para o aluno responde. 


*Aulas;*
- "Eu vou levar", Série "Eu e meu dinheiro" --- https://www.youtube.com/watch?v=FdTip4SdWMw
- "O Piano ou a Aninha", Série "Eu e meu dinheiro" --- https://www.youtube.com/watch?v=A7XxxYZjQ4k
- "Filhos da Mama", Série "Eu e meu dinheiro" --- https://www.youtube.com/watch?v=ZZdJwfVaJWU
- "Duas vezes Judite", Série "Eu e meu dinheiro" --- https://www.youtube.com/watch?v=k6O554uP2Kc

*Referencias/pesquisas;*
- Banco do Brasil ( https://www.bcb.gov.br/cidadaniafinanceira )
- Também foram considerados vídeos disponibilizados no YouTube do Canal do Banco Central do Brasil ( https://www.youtube.com/@BancoCentralBR )
- Créditos ao Banco do Brasil pelos materiais disponibilizados para estudo e apoio ao desenvolvimento do projeto, incluindo documentos em PDF, materiais educacionais e vídeos. ( https://www.bcb.gov.br/cidadaniafinanceira/cidadania_biblioteca )

**Configurações;**
- feito por Miguel (em desenvolvimento)

_linguagens utilizadas:_
-HTML
-Css
-Java script
_objetivo da pagina:_
- Configurações simples, como tema do site, mudança do nome de usuário e troca de senha.
_A página contém:_
- Tem uma opção de alterar a senha, nome e de mudar o tema do site
_Mudanças relevantes:_
-O botão de alterar o tema do site iria deixar você escolher as cores porém não foi incluído na versão final

# Backend:
- feito por Manoel

-Utilizarmos docker, para hospedar o banco de dados, utilizamos o DBeaver como SGBD e ambientes python virtual para melhor gerenciamento das diversas dependencias.

**Banco de dados;**

_linguagens utilizadas:_
- PostgreSQL (18)

_objetivo:_
- salva o progreço do aluno, e a conta usada pelo aluno.

_O que contém:_
- senha e nome do aluno, e os conteudos academicos do site do site, e o progresso do aluno

*Modelo relacional simplificado*
```text
┌──────────────────┐
│     usuarios     │
├──────────────────┤
│ PK usuario_id    │
│ nome             │
│ senha_hash       │
└────────┬─────────┘
         │
         │ 1:N
         ▼
┌─────────────────────────┐
│    usuarios_questoes    │
├─────────────────────────┤
│ PK/FK usuario_id        │
│ PK/FK questao_id        │
│ resposta_usuario        │
│ data_conclusao          │
│ acertou                 │
└─────────────────────────┘
            ▲
            │ N:1
            │
┌─────────────────────┐
│      QUESTOES       │
├─────────────────────┤
│ PK questao_id       │
│ enunciado           │
│ resposta_correta    │
│ modulo              │
└─────────────────────┘
```

## Api

_linguagens utilizadas:_
- python (fastAPI)

_objetivo:_
-FastAPI será usado junto com Python para construir a API do projeto. A API funciona como ligação entre o Front End e o banco de dados

_O que contém:_
- Quando o estudante concluir uma atividade, o JavaScript envia essa informação para a API. O Back End recebe a solicitação, verifica os dados, registra a conclusão no PostgreSQL, calcula o novo progresso e envia o resultado para o Front End. FastAPI foi escolhido por possuir estrutura simples, boa integração com Python e geração automática de documentação dos endpoints da API. Isso ajuda o grupo do Front End a entender quais informações precisa enviar e receber.

TODO: justificar texto
**outras dependencias relacionadas:**
```text
|   ferramenta      |    | explicação                                                                          |
|----------------   |----|------------------------------------------------------------------------------------- 
| alembic           |    | Sistema de migração de banco de dados
| annotated-doc     |    | Bliblioteca relacionada a utilização de typing.Annotated
| annotated-types   |    | Fornece tipos/metadados utilizados pelo Pydantic
| anyio             |    | Abstração para programalçao assincrona (dependência de fastAPI)
| bcrypt            |    | Algoritimo de hashing de senhas
| certifi           |    | Fornece certificados CA (Dependência httpx, não utilizado atualmente da aplicação)
| click             |    | Biblioteca para criar interfaces de linha de comando (dependêndia de uvicorn)
| fastapi           |    | Framework da API
| greenlet          |    | dependência do SQLalchmey
| h11               |    | Implementação do protocolo HTTP/1.1 usada pelo ecossistema ASGI.
| httpcore          |    | Camada de baixo nível utilizado pelo httpx
| httptools         |    | Implementação rápida de parsing HTTP
| httpx             |    | Cliente HTTP em python
| idna              |    | Tratamento de namos de domínio internacionalizados
| iniconfig         |    | Ler arquivos ini
| Mako              |    | Motor de templates usado pelo Alembic 
| MarkupSafe        |    | Dependência usada pelo Mako para tratar texto que pode conter marcação HTML/XML
| packaging         |    | Ferramenta para trabalhar com versões e metadados de pacotes Python
| pluggy            |    | Sistema de plugins utilizado pelo pytest
| psycopg           |    | Driver python para postgreSQL
| psycopg-binary    |    | Facilita a instalação do psycopg
| pydantic          |    | Validação e conversão de dados usando modelos Python
| pydantic_core     |    | Parte de baixo nível do Pydantic responsável pela validação e serialização dos dados
| Pygments          |    | Destaca o codigo com cores
| PyJWT             |    | Criação e validação de tokens JWT
| pytest            |    | Frameword de testes python
| python-dotenv     |    | Carrega variaveis de ambientes .env
| PyYAML            |    | Leitura e escrita de arquivos YAML
| SQLAlchemy        |    |Nossa ORM
| starlette         |    |Framework ASGI sobre o qual o FastAPI é construído, middleware
| typing-inspection |    |Auxilia blibliotecas a inspecionar informações
| typing_extensions |    |Disponibilza recursos de tipagem Python
| uvicorn           |    | Servidor ASGI usado para executar a API (investimentes_API)
| uvloop            |    | Usado pelo uvicorn
| watchfiles        |    | Detecta alterações nos arquivos para permitir o reload automático durante desenvolvimento
| websockets        |    | Implementação do protocolo WebSocket para comunicação bidirecional
```