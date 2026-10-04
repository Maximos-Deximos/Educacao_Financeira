# Registro de Decisões do Projeto

Este documento registra decisões importantes tomadas durante o desenvolvimento
do projeto, incluindo o contexto, as alternativas consideradas e os motivos
que levaram à decisão final.

## DEC 02/09/2026

### Contexto

Este projeto está sendo desenvolvido no contexto de uma atividade acadêmica
proporcionada pela Uninassau Olinda

A atividade estabelece como requisito o desenvolvimento de uma aplicação web
que atenda a determinados critérios funcionais e técnicos definidos pela
instituição.

O repositório utilizado para o desenvolvimento já existia anteriormente à
atividade acadêmica. Dessa forma, foi decidido utilizar sua estrutura como
base para o desenvolvimento da aplicação solicitada, realizando as
modificações e adições necessárias para atender aos critérios avaliativos
estabelecidos.

### Decisão

O repositório existente será utilizado como base para a implementação da
aplicação web solicitada pela atividade acadêmica.

As funcionalidades, estruturas e componentes adicionados ou modificados
durante o desenvolvimento deverão ser compatíveis com os requisitos da
atividade e, quando aplicável, serão documentados neste repositório.

### Justificativa

A utilização do repositório existente permite aproveitar uma estrutura
previamente estabelecida, mantendo o histórico de desenvolvimento e
possibilitando que as alterações necessárias para a atividade sejam
acompanhadas através do controle de versão.

A adaptação do projeto não significa que todos os componentes existentes
foram originalmente desenvolvidos especificamente para a atividade. As
alterações relacionadas aos requisitos acadêmicos serão identificadas e
documentadas conforme necessário.

### Critérios

- A aplicação web não deve conter dados pessoais como numero de telefone, cpf ou email
- A aplicação web deve utilizar banco de dados
- A aplicação deve seguir a seguinte estrutura no repositório:
```text
├── backend/
├── docs/
│
├── branding/
│
├── mer/
│
├── mockups/
│
├── models/
│
│
└── uml/
│
└── requirements/
├── frontend/
├── .gitignore
├── LICENSE
└── README.md
```
No README.md deverá existir obrigatoriamente uma seção chamada:
```text
## Membros
```
Essa seção deverá apresentar uma lista ou tabela contendo o nome, matrícula e papel de cada participante.
Os papéis disponíveis são:
Scrum Master: deverá existir apenas um por grupo e será responsável pela criação e organização do
repositório e pela coordenação das atividades relacionadas ao projeto.
Página 1 de 10Atividade - Sistema para controle de atendimento.md
Documentador: poderá haver mais de um e será responsável pela produção e organização da
documentação.
Desenvolvedor: poderá haver mais de um e será responsável pela implementação e evolução do
código.
Testador: poderá haver mais de um e será responsável pela verificação do funcionamento, identificação
de problemas e validação das funcionalidades.

Organização dos artefatos:
A pasta docs/ deverá concentrar os artefatos de documentação do projeto.
docs/branding/
Deverá conter os elementos relacionados à identidade visual do sistema, quando produzidos pelo grupo.
docs/mer/
Deverá conter o Modelo Entidade-Relacionamento do sistema e seus respectivos artefatos.
docs/mockups/
Deverá conter os mockups e protótipos das telas do sistema.
docs/models/uml/
Deverá conter os diagramas UML produzidos pelo grupo.
docs/requirements/
Deverá conter os requisitos funcionais, requisitos não funcionais, regras de negócio e demais documentos
relacionados aos requisitos do sistema.
A documentação deverá contemplar, conforme aplicável ao projeto, aspectos de segurança, disponibilidade,
auditoria, desempenho, concorrência, LGPD e acessibilidade.

## DEC 29/09/2026

**Área:** repositório

### Contexto

O projeto precisa de uma maneira coesiva e central para testar a aplicação como um todo, front, back e banco em umá so branch.

É necessário juntar as branches feat/front e feat/back em uma branch de desenvolvimento dev/

### Decisão

Foi decidido criar uma branch chamada 'dev' ela servirá como uma branch centralizada para testar codigo em desenvolvimento antes de pushar para a main.
Desenvolvimento de outras features devem ser feitos em outras branches para manter a coesão e estabilidade de codigo atual.
A branch dev serve como uma maneira de realizar patches e fixes de maneira rapida.

### Justificativa

Atender o critério da atividade e facilitar o desenvolvimento da aplicação web

## DEC 02/10/2026

**Área:** Estrutura/Arquitetura

## Contexto
Está planejado para a aplicação web conter formulários contendo questões abertas, os (formularios atuais são um placeholder) e essa feature está planejada para acontecer, mas, talvez nçao haja tempo suficiente para implementar-la.

### Decisão

Adiar implementação da feature até que esteja finalizado a apresentação do projeto. Placeholder continua somente para fins de apresentação do MVP

## Justificativa

Não sufocar o projeto ou danificar a integridade do projeto com uma feature desenvolvida as preças em pouco tempo.
## DEC 04/10/2026

**AREA:** frontend/repo

### Contexto

O projeto necessita de uma pagina de configurações onde o usuario pode realizar mudanças de nome de conta e mudança de senha, como também a mudanã de tema claro/escuro

O projeto já contem uma branch onde as funcionalidades de front e back(ainda não testado) já foram feitas
Porem, serviõs fundamentais da API, backend foram deletados pelo usuário matheusthediver; commit 8fc8967.
A remoção desses serviõs passou despercebido e foi detectada hoje dia 04/10.

### Decisão

Seria mais facil somente recriar a partir de uma branch estavel as funcionalidades de feat/config (mais facil do que tentar recuperar a branch)

### Justificativa

Facilitar o processo de desenvolvimento

