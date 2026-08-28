# ESCOPO GERAL DO PROJETO DE EDUCAÇÃO FINANCEIRA

## 1. Projeto de Educação Financeira

O projeto consiste no desenvolvimento de um site simples em formato MVP, Produto Mínimo Viável, voltado a estudantes menores de idade da rede pública. O site apresentará conteúdos introdutórios de educação financeira, exercícios e o avanço do estudante por meio de percentuais de conclusão.
O objetivo principal é ensinar educação financeira para que o estudante aprenda conceitos, consulte exemplos, assista a videoaulas e realize exercícios relacionados aos conteúdos.
Os conteúdos serão divididos em 2 módulos, um Básico e outro Intermediário. Cada módulo terá 4 matérias. Cada matéria terá 4 exercícios, totalizando 32 exercícios. Ao final de cada módulo, uma avaliação com 4 questões será liberada. Com as duas avaliações, o site terá 40 questões ao total.

### 1.1 Objetivo geral

Desenvolver uma aplicação web simples para ensinar conceitos de educação financeira a estudantes da rede pública, com conteúdos organizados em 2 módulos, materiais complementares, exercícios e acompanhamento de progresso.

### 1.2 Princípios do MVP

• Conteúdo introdutório de educação financeira
• Dois módulos, com conteúdo e atividades próprias
• Percentual de conclusão por módulo e percentual geral
• Vídeos do YouTube como material complementar
• Banco de dados relacional
• Sem coleta de dados pessoais
• Sem notas para os alunos, somente percentual de conclusão

## 2. Estrutura dos Módulos, Atividades, Avaliações e Progresso
A plataforma terá dois módulos. Cada módulo possuirá um conjunto de conteúdos e atividades para cada matéria.

### 2.1 Organização das atividades

• 2 módulos de ensino, com 8 matérias ao total, 4 matérias em cada módulo
• 20 exercícios ao total, 10 em cada módulo e 4 em cada matéria
• 2 avaliações, uma para cada módulo finalizado, com 4 questões em cada avaliação
• Cada questão da avaliação será referente a uma matéria específica do módulo

### 2.3 Avaliações

Ao terminar cada módulo, uma avaliação referente ao conteúdo daquele módulo será liberada. Cada avaliação terá 4 questões, uma para cada matéria estudada no módulo. As avaliações não atribuem nota ao aluno e entram no percentual de conclusão do site.

### 2.4 Mapa da Aprendizagem

• 1. O estudante entra na plataforma depois de se cadastrar
• 2. Escolhe um dos módulos disponíveis
• 3. Escolhe a matéria a ser estudada, liberando os materiais de estudo e exercícios
• 4. Acessa vídeos recomendados quando desejar
• 5. Realiza as atividades do módulo
• 6. O sistema registra a conclusão das atividades
• 7. O percentual do módulo é atualizado
• 8. O percentual geral é recalculado

Referir a modulos.md para exemplos de questões/modulos a serem adicionados

## 5. Vídeo Aulas Complementares
As videoaulas serão usadas como materiais complementares aos conteúdos de educação financeira apresentados na plataforma. O objetivo é reforçar os assuntos trabalhados nos módulos por meio de situações práticas e narrativas relacionadas ao uso do dinheiro, planejamento financeiro, consumo, economia familiar e investimentos.
Os vídeos selecionados pertencem à série "Eu e meu dinheiro" e serão associados aos conteúdos correspondentes dentro dos módulos. Eles servirão como apoio aos textos, exemplos e exercícios apresentados no site.

Referir a video_aulas.md para exemplos de video aulas a serem utilizadas

### 5.1 Forma de utilização das videoaulas na plataforma
As videoaulas funcionarão como apoio aos conteúdos escritos e não substituirão as matérias presentes nos módulos.
Dentro da plataforma, os vídeos serão vinculados aos assuntos correspondentes. O estudante estudará o conteúdo escrito, consultará exemplos, terá acesso ao vídeo relacionado ao tema e realizará os exercícios previstos.
A utilização dos vídeos busca apresentar os conceitos financeiros por meio de situações práticas, facilitando a relação entre o conteúdo estudado e decisões financeiras presentes no cotidiano.
Os créditos dos vídeos e da série "Eu e meu dinheiro" serão apresentados junto aos respectivos links e às referências utilizadas no projeto.

## 6. Estrutura da aplicação e interface

O site será organizado em páginas voltadas ao cadastro, acompanhamento do progresso, módulos, atividades, configurações e informações do projeto. Todas as páginas devem receber o Header e o Footer do projeto.

```text
┌─────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────┐
│     pagina                  │     função                                                                             │
├─────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────┤
│ Login e cadastro            │ Entrada e cadastro do aluno no site.                                                   │
│ Portal Inicial              │ Pagina incial introdutorio da aplicação                                                │
│ Home                        │ Resumo do progresso geral e acesso aos módulos.                                        │
│ Módulos                     │ Lista dos dois módulos e status de conclusão.                                          │
│ Detalhe do módulo           │ Conteúdos, vídeos, atividades e progresso do módulo.                                   │
│ Atividade                   │ Exibição e envio dos exercícios.                                                       │
│ Configurações e privacidade │ Configurações simples, como tema do site, mudança do nome de usuário e troca de senha. │
│ Sobre o projeto (footer)    │ Objetivo educacional, fontes e orientações de uso. Item opcional.                      │
└─────────────────────────────┘────────────────────────────────────────────────────────────────────────────────────────┘
```
## 6.1 Componentes principais

• Header e Footer
• Cards de módulos
• Barra de progresso, com referência ao uso de gráfico de pizza
• Lista de conteúdos para download, download gerais de todos os materiais disponíveis e link do download dos materiais específicos de cada conteúdo dentro de seus módulos
• Lista e Link de vídeos
• Lista de atividades
• Botão de Logout

### 7. Banco de dados, linguagens e arquitetura

## 7.1 Banco de dados

O projeto usará banco de dados relacional. Esse modelo organiza as informações em tabelas ligadas por relacionamentos. A estrutura combina com o site, pois existem informações diretamente ligadas, como estudantes, módulos, conteúdos, exercícios, avaliações e progresso.
O sistema gerenciador de banco de dados definido para o projeto é PostgreSQL.

## 7.2 Front End

O Front End será desenvolvido com: 
HTML5 
CSS3 
JavaScript

TODO: add informações basicas sobre cada linguagem de programação. Entendam que estamos lidando com devs que talvez nunca tenham programaram antes.

### HTML

HTML será responsável pela estrutura das páginas e pelos elementos do site.

• Títulos.
• Textos.
• Botões.
• Campos de login.
• Cards dos módulos.
• Listas de conteúdos.
• Exercícios.
• Cabeçalho.
• Rodapé.

### CSS

CSS será responsável pela aparência do site e pelo controle visual dos elementos.

• Cores.
• Fontes.
• Espaçamentos.
• Tamanho dos elementos.
• Botões.
• Barras de progresso.
• Cards.
• Organização das páginas.
• Responsividade para diferentes tamanhos de tela.

### JavaScript

JavaScript será responsável pelas partes interativas do Front End.

• Carregar informações recebidas do Back End.
• Exibir conteúdos.
• Atualizar barras de progresso.
• Exibir mensagens de sucesso ou erro.
• Navegar entre atividades.
• Enviar respostas dos exercícios.
• Atualizar informações sem recarregar toda a página quando necessário.

## 7.3 Back End

O Back End será desenvolvido em Python com o framework FastAPI. Python foi escolhido por possuir sintaxe acessível para estudantes iniciantes, ampla documentação e integração com bancos de dados, APIs, autenticação, testes e bibliotecas usadas em aplicações web.

## Responsabilidades do Back End

• Cadastro e login.
• Comunicação com o banco de dados.
• Registro das atividades concluídas.
• Registro das avaliações.
• Cálculo do progresso dos módulos.
• Cálculo do progresso geral.
• Controle das regras do sistema.
• Validação das informações recebidas.
• Segurança das contas.

### FastAPI

FastAPI será usado junto com Python para construir a API do projeto. A API funciona como ligação entre o Front End e o banco de dados. Quando o estudante concluir uma atividade, o JavaScript envia essa informação para a API. O Back End recebe a solicitação, verifica os dados, registra a conclusão no PostgreSQL, calcula o novo progresso e envia o resultado para o Front End.
FastAPI foi escolhido por possuir estrutura simples, boa integração com Python e geração automática de documentação dos endpoints da API. Isso ajuda o grupo do Front End a entender quais informações precisa enviar e receber.

### 7.4 Comunicação entre Front End e Back End

A comunicação ocorrerá por uma API REST usando JSON.

Exemplo 1

• Front End solicita: GET /modulos
• Back End responde com os módulos disponíveis.

Exemplo 2

• Front End envia: POST /atividades/15/concluir
• Back End registra a conclusão da atividade número 15 e recalcula o progresso.

## Separação de responsabilidades

• Front End cuida daquilo visto e usado pelo estudante.
• Back End cuida das regras, dados e funcionamento interno.
• Banco de Dados guarda as informações de forma estruturada.

### 7.5 Motivos das escolhas

A arquitetura foi escolhida pensando no nível da equipe e no tamanho do MVP. HTML, CSS e JavaScript oferecem uma base para o desenvolvimento web. Python apresenta sintaxe acessível para estudantes iniciantes. FastAPI simplifica a construção da API. O conjunto permite desenvolver o fluxo completo do site sem introduzir ferramentas avançadas sem necessidade.

### 7.6 Arquitetura final

```text
Navegador do usuario
↓
HTML + CSS + JavaScript
↓
API REST
↓
Python + FastAPI
↓
SQLAlchemy
↓
PostgreSQL
```

## 8. Organização dos squads e documentação

A equipe foi dividida em quatro squads. O Escopo define o produto e suas regras. O Front End define a interface e a navegação. O Back End cuida do funcionamento interno. Q/A com Deployment verifica qualidade, segurança e entrega do projeto.

```text
┌─────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────┐
│      Squad                  │     Responsabilidade principal                                                           │
├──────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────┬
│ Esciopo          │ Esqueleto do projeto, definição de linguagens, conteúdo de educação financeira e regras do produto. │
│ Front End        │ Interface, navegação, acessibilidade, responsividade e integração visual com a API.                 │
│ Back End         │ API, autenticação, banco relacional, regras de progresso, persistência e segurança.                 │ 
│ Q/A + Deployment │ Testes, segurança, qualidade, CI, preparação da entrega e execução do MVP.                          │
└──────────────────┘─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

TODO: fix: alguns artefatos em arquivos tipo (```text```)
