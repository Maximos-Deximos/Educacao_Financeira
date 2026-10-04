-- Seed com as 32 questões reais dos módulos.
-- Origem: frontend/js/data/questoes.js (gabarito conferido por
-- tests/test_atividades.cjs contra docs/escopo/modulos.md).
-- E'...' para permitir os \n\n dos enunciados com quebras de linha.
-- NÃO aplicar em investimentes_test: quebra as contagens de
-- tests/test_database.py.

INSERT INTO questoes
    (codigo, materia, modulo, enunciado, resposta_correta, valor_esperado)
VALUES
-- ===================== MÓDULO 1 — BÁSICO =====================
('m1-q1', 'Escolhas financeiras, necessidades, desejos e projetos', 1,
 E'Qual situação representa uma necessidade real?', 'B', NULL),
('m1-q2', 'Escolhas financeiras, necessidades, desejos e projetos', 1,
 E'Fulano pretende comprar um notebook de R$ 2.400,00 para estudar. Após analisar seus gastos mensais, percebeu que todo mês sobra R$ 200,00. Qual atitude representa um planejamento financeiro adequado para alcançar o objetivo de comprar esse notebook?', 'C', NULL),
('m1-q3', 'Escolhas financeiras, necessidades, desejos e projetos', 1,
 E'Ao gastar todo o dinheiro reservado para um curso em uma compra por impulso, o estudante:', 'A', NULL),
('m1-q4', 'Escolhas financeiras, necessidades, desejos e projetos', 1,
 E'Qual atitude combina o equilíbrio entre a emoção e a razão em uma escolha financeira?', 'C', NULL),
('m1-q5', 'Orçamento pessoal, receitas e despesas', 1,
 E'Um dia, uma estudante decidiu organizar sua vida financeira. Ela anotou o dinheiro que recebeu, registrou os gastos com a alimentação, transporte, lazer e analisou quanto restou no final do mês. Do que chamamos essa organização?', 'B', NULL),
('m1-q6', 'Orçamento pessoal, receitas e despesas', 1,
 E'Rafael recebeu R$300,00 durante um mês. Após registrar os seus gastos ele identificou que R$120,00 eram gastos com transporte, R$80,00 com alimentação e R$60,00 com lazer. Após pagar todas essas despesas, qual foi o resultado do orçamento final de Rafael?', 'A', 40),
('m1-q7', 'Orçamento pessoal, receitas e despesas', 1,
 E'Ao organizar o seu orçamento mensal, Amanda decidiu separar seus gastos em categorias. Durante a semana ela pagou R$12,00 em uma passagem de ônibus, R$25,00 em um caderno, R$18,00 em um almoço e R$20,00 em um ingresso de cinema. Qual dessas despesas pertence à categoria transporte?', 'A', NULL),
('m1-q8', 'Orçamento pessoal, receitas e despesas', 1,
 E'Mariana recebe uma quantia mensal de seus tios e deseja organizar melhor seus gastos. Nos últimos meses ela percebeu dificuldade de entender onde seu dinheiro estava sendo gasto. Qual atitude ajudaria Mariana a ter maior controle sobre seu orçamento?', 'C', NULL),
('m1-q9', 'Consumo planejado, comparação de preços e desperdício', 1,
 E'Ana recebeu R$80,00 para comprar alguns materiais escolares. Antes de ir à loja, ela fez uma lista do necessário, pesquisou os preços em duas lojas e verificou o quanto conseguiria gastar sem ultrapassar o valor disponível. Qual atitude de Ana representa melhor o consumo planejado?', 'C', NULL),
('m1-q10', 'Consumo planejado, comparação de preços e desperdício', 1,
 E'Uma família percebeu aumento nas despesas mensais. Ao analisar seus hábitos, identificaram alimentos comprados em excesso e descartados após estragarem, luzes acesas em cômodos vazios e multas relacionadas ao atraso de algumas contas. Qual mudança contribuiria melhor para reduzir esses desperdícios?', 'B', NULL),
('m1-q11', 'Consumo planejado, comparação de preços e desperdício', 1,
 E'Em um supermercado, dois pacotes do mesmo produto apresentam as seguintes informações:\n\nPacote A: 500 g por R$8,00\nPacote B: 800 g por R$10,00\n\nUma família consome esse produto com frequência e consegue usar os 800 g antes do vencimento. Considerando preço, quantidade e possibilidade de desperdício, qual escolha apresenta melhor relação entre custo e quantidade?', 'B', NULL),
('m1-q12', 'Consumo planejado, comparação de preços e desperdício', 1,
 E'Pedro viu um tênis anunciado com a mensagem " Últimas unidades, compre somente agora". O produto custava R$180,00, Pedro já possuía um tênis em boas condições e havia separado esse dinheiro para comprar materiais de um curso no mês seguinte. Qual decisão demonstra maior consciência financeira?', 'C', NULL),
('m1-q13', 'Poupança, metas e reserva para imprevistos', 1,
 E'Júlia pretende comprar materiais para um curso no valor de R$360, daqui a seis meses. Após organizar seus gastos, ela percebeu que R$60,00 por mês ficam disponíveis. Qual atitude representa melhor o planejamento dessa meta financeira?', 'A', NULL),
('m1-q14', 'Poupança, metas e reserva para imprevistos', 1,
 E'Pedro mantém R$300,00 guardados para comprar uma bicicleta no fim do ano e outros R$150,00 separados para caso ocorra algo inesperado. Durante o mês seus óculos usados para estudar quebram e precisam de conserto imediato. Qual decisão está mais de acordo com a função da reserva para imprevistos?', 'B', NULL),
('m1-q15', 'Poupança, metas e reserva para imprevistos', 1,
 E'Gabriel deseja participar de uma atividade escolar daqui a oito meses, o custo previsto é de R$480,00 e ele já possui R$80,00 guardados para isso. Mantendo o mesmo valor de poupança mensal durante os próximos oito meses, quanto é que ele precisa separar por mês para alcançar essa meta?', 'B', 50),
('m1-q16', 'Poupança, metas e reserva para imprevistos', 1,
 E'Carlos Roberto organizou seu orçamento e decidiu separar R$40,00 por mês para uma meta definida e manter sua reserva para situações inesperadas. No meio do mês os seus amigos o convidaram para um passeio de R$40,00. Porém, ele já havia usado todo o dinheiro destinado ao seu lazer. Qual a decisão que demonstra maior compromisso com seu planejamento financeiro?', 'C', NULL),

-- ================ MÓDULO 2 — INTERMEDIÁRIO ================
('m2-q1', 'Crédito, juros, cartão de crédito e Custo Efetivo Total', 2,
 E'João precisa comprar um computador para estudar e encontrou duas formas de pagamento para o mesmo produto.\n\nOpção A: 10 parcelas de R$ 190\nOpção B: 8 parcelas de R$ 225\n\nAntes de escolher, João decidiu comparar o valor total das duas opções. Qual é a análise correta?', 'B', NULL),
('m2-q2', 'Crédito, juros, cartão de crédito e Custo Efetivo Total', 2,
 E'Uma família deseja fazer dois empréstimos de R$2.000,00. A instituição A anuncia uma taxa de juros menor, mas cobra tarifas adicionais. A instituição B apresenta juros um pouco maiores, porém possui menos encargos. Qual informação deve receber maior atenção para comparar o custo completo das duas propostas?', 'C', NULL),
('m2-q3', 'Crédito, juros, cartão de crédito e Custo Efetivo Total', 2,
 E'Marina recebeu uma fatura de cartão de crédito de R$600,00. Entretanto ela decidiu pagar somente R$300,00 no vencimento. Considerando o funcionamento do cartão de crédito, o que acontece com o restante da dívida?', 'B', NULL),
('m2-q4', 'Crédito, juros, cartão de crédito e Custo Efetivo Total', 2,
 E'Felipe recebe R$900,00 por mês. Atualmente, R$250,00 já estão atribuídos a outras parcelas. Ele deseja comprar um celular em 10 parcelas de R$120,00. Antes de assumir essa nova dívida, qual análise demonstra maior responsabilidade financeira?', 'C', NULL),
('m2-q5', 'Endividamento, superendividamento e reorganização financeira', 2,
 E'Uma família recebe R$3.000,00 por mês. Deste valor R$1.400,00 são usados em despesas essenciais e R$1.100,00 já estão comprometidos com prestações, cartão de crédito e empréstimos. Mesmo assim a família pretende assumir uma nova compra parcelada de R$400,00 por mês. Qual análise demonstra maior cuidado financeiro?', 'C', NULL),
('m2-q6', 'Endividamento, superendividamento e reorganização financeira', 2,
 E'Carlos percebeu que perdeu o controle das finanças. Ele possui dívida no cartão, empréstimo pessoal e três compras parceladas, mas não sabe exatamente quanto deve, quais são os juros nem quando cada compromisso termina. Qual deve ser uma das primeiras atitudes para iniciar sua reorganização financeira?', 'B', NULL),
('m2-q7', 'Endividamento, superendividamento e reorganização financeira', 2,
 E'Marcelo possui várias dívidas, depois de pagar as suas parcelas mensais sobra tão pouco dinheiro que ele encontra dificuldade para comprar até alimentos e pagar as despesas básicas da casa. Qual situação descreve melhor o problema apresentado?', 'B', NULL),
('m2-q8', 'Endividamento, superendividamento e reorganização financeira', 2,
 E'Depois de listar suas dívidas, uma família encontrou a seguinte situação:\n\nDívida A: Juros elevados no cartão de crédito\nDívida B: Parcelas com juros menores\nAlém disso, a família identificou gastos frequentes com compras não essenciais e desperdício de alimentos.\n\nQual conjunto de atitudes está mais alinhado às orientações de reorganização financeira dos materiais estudados?', 'C', NULL),
('m2-q9', 'Investimentos: liquidez, risco e rentabilidade', 2,
 E'Depois de organizar seu orçamento, Rafael conseguiu guardar R$600,00. Em vez de gastar esse valor ele decidiu reservá-lo para um objetivo futuro. Depois ele aplicou parte desse dinheiro esperando obter algum rendimento. Considerando os conceitos estudados, como as duas etapas são descritas corretamente?', 'B', NULL),
('m2-q10', 'Investimentos: liquidez, risco e rentabilidade', 2,
 E'Beatriz possui uma reserva destinada a despesas inesperadas. Ela está analisando duas aplicações:\n\nAplicação A: Permite retirar o dinheiro rapidamente\nAplicação B: Exige esperar vários meses para ter acesso ao valor sem determinadas limitações\n\nComo Beatriz pretende manter esse dinheiro disponível para situações inesperadas, qual característica deve receber atenção especial?', 'A', NULL),
('m2-q11', 'Investimentos: liquidez, risco e rentabilidade', 2,
 E'Dois investimentos apresentam características diferentes:\n\nInvestimento A: Menor possibilidade de perda e retorno esperado menor\nInvestimento B: Maior possibilidade de perda e retorno esperado maior\n\nQual interpretação está mais de acordo com os conceitos de risco e rentabilidade apresentados no material?', 'C', NULL),
('m2-q12', 'Investimentos: liquidez, risco e rentabilidade', 2,
 E'Lucas recebeu pela internet uma oferta de investimento com a seguinte propaganda:\n\n" Ganhe rendimentos muito acima do mercado e retire seu dinheiro quando quiser e tenha risco praticamente zero! "\n\nAntes de entregar seu dinheiro qual atitude demonstra melhor compreensão dos conceitos estudados?', 'C', NULL),
('m2-q13', 'Riscos financeiros, golpes, seguros e planejamento de futuro', 2,
 E'Durante uma viagem, a família de Ana teve o celular furtado. Além do prejuízo com o aparelho, havia aplicativos bancários instalados nele. Qual atitude representa melhor uma resposta preventiva diante desse tipo de risco', 'B', NULL),
('m2-q14', 'Riscos financeiros, golpes, seguros e planejamento de futuro', 2,
 E'Pedro recebe uma mensagem de um amigo dizendo que perdeu o acesso à própria conta e precisa urgentemente de um Pix de R$300,00 para uma conta em nome de outra pessoa. A mensagem usa a foto e o nome do amigo. Qual atitude é mais segura?', 'C', NULL),
('m2-q15', 'Riscos financeiros, golpes, seguros e planejamento de futuro', 2,
 E'Uma família possui uma reserva de emergência, mas também decidiu contratar um seguro residencial. Depois de alguns meses, ocorreu um dano coberto pelo contrato. Ao consultar a apólice, a família identificou uma franquia de R$500,00. O que essa informação significa?', 'B', NULL),
('m2-q16', 'Riscos financeiros, golpes, seguros e planejamento de futuro', 2,
 E'Uma família deseja se proteger melhor contra imprevistos e também organizar seus objetivos para os próximos anos. Qual conjunto de atitudes demonstra uma estratégia financeira mais equilibrada?', 'B', NULL)

ON CONFLICT (codigo) DO UPDATE SET
    materia         = EXCLUDED.materia,
    modulo          = EXCLUDED.modulo,
    enunciado       = EXCLUDED.enunciado,
    resposta_correta = EXCLUDED.resposta_correta,
    valor_esperado  = EXCLUDED.valor_esperado;