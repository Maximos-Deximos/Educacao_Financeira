# Registro de Decisões do Projeto

Este documento registra decisões importantes tomadas durante o desenvolvimento
do projeto, incluindo o contexto, as alternativas consideradas e os motivos
que levaram à decisão final.

## DEC 29/09/2026

**Área:** repositório

### Contexto

O projeto precisa de uma maneira coesiva e central para testar a aplicação como um todo, front, back e banco em umá so branch.

É necessário juntar as branches feat/front e feat/back em uma branch de desenvolvimento dev/

### Decisão

Foi decidido criar uma branch chamada 'dev' ela servirá como uma branch centralizada para testar codigo em desenvolvimento antes de pushar para a main.
Desenvolvimento de outras features devem ser feitos em outras branches para manter a coesão e estabilidade de codigo atual.
A branch dev serve como uma maneira de realizar patches e fixes de maneira rapida.

OBS: a criação e utilização da branch dev foi feitas antes da documentação desse arquivo.