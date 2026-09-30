#  Requisitos do Projeto


##  Requisitos Funcionais

| ID | Requisito |
|:---|:----------|
| **RF01** | **Autenticação:** cadastro (usuário `3–20` chars `[a-z0-9]`, senha `6–128`), login, sessão via token JWT, consulta do usuário autenticado, logout. |
| **RF02** | **Portal inicial:** apresentar a premissa do projeto e redirecionar para login ou Home conforme o estado de autenticação. |
| **RF03** | **Home:** saudação ao aluno autenticado, resumo do progresso geral, acesso aos módulos e botão de logout. |
| **RF04** | **Módulos:** listar os 2 módulos (Básico/Intermediário) com status de conclusão. |
| **RF05** | **Detalhe do módulo:** conteúdo escrito, videoaula, leituras recomendadas, lista de atividades e progresso do módulo. |
| **RF06** | **Atividades:** exibir e enviar respostas dos exercícios. |
| **RF07** | **Avaliação:** 4 questões por módulo, liberada ao concluir o módulo, sem atribuir nota. |
| **RF08** | **Progresso:** registrar conclusão, calcular percentual por módulo e percentual geral (cálculo no back-end). |
| **RF09** | **Configurações:** alterar nome de usuário e trocar senha (tema não incluído). |
| **RF10** | **Materiais complementares:** download dos PDFs por módulo e download geral, além dos links das videoaulas. |
| **RF11** | **Controle de acesso:** bloquear páginas internas e limpar token em resposta `401`. |
| **RF12** | **Feedback:** exibir mensagens de sucesso/erro e tratar indisponibilidade da API sem quebrar a página. |

---

##  Requisitos Não Funcionais

| ID | Requisito |
|:---|:----------|
| **RNF01** | Senhas com hash **bcrypt**; token **JWT HS256** stateless (30 dias) com `SECRET_KEY` via env; `senha_hash` nunca retornado na API; CORS configurado. |
| **RNF02** | Sem dados pessoais além de nome de usuário e senha; sem notas, apenas percentual de conclusão. |
| **RNF03** | Segredos fora do versionamento (`.env` no `.gitignore`, `.env.example` como modelo). |
| **RNF04** | Separação de responsabilidades: rotas / serviços / schemas / models no back; CSS em camadas e JS modularizado no front. |
| **RNF05** | Interface simples, responsiva (mobile) e componentes reutilizáveis (header/footer carregados via JS). |
| **RNF06** | Testabilidade automatizada: `pytest` + `httpx` cobrindo autenticação e banco (`tests/test_api_auth.py`, `tests/test_database.py`). |
| **RNF07** | Portabilidade: ambiente reprodutível via Docker Compose + venv + `.env`. |
| **RNF08** | Documentação técnica obrigatória e atualizada em `docs/` para todos os squads. |
| **RNF09** | Acessibilidade, desempenho, disponibilidade, concorrência e LGPD — responsabilidade do squad Q/A, ainda sem métricas definidas. |

---

