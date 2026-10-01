const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'frontend/js/data/questoes.js'), 'utf8') +
  '\nglobalThis.modulos = MODULOS_ATIVIDADES;', context);
const script = fs.readFileSync(path.join(root, 'frontend/js/pages/atividades.js'), 'utf8');
vm.runInContext(script.replace(/iniciarAtividade\(\);\s*$/, ''), context);
const conferir = context.conferirResposta;

test('as 32 questões e gabaritos dos formulários correspondem ao documento, sem provas', () => {
  const documento = fs.readFileSync(path.join(root, 'docs/escopo/modulos.md'), 'utf8');
  const partes = documento.split('## 4. Módulo 2, Intermediário');
  const gabaritosRevisados = ['BCACBAACCBBCABBC', 'BCBCCBBCBACCBCBB'];
  const limpar = texto => texto.replace(/\*/g, '').replace(/\s+/g, ' ').trim();

  partes.forEach((parte, indice) => {
    const atividades = parte.split(/(?:3\.5 |## )Prova do Módulo/)[0];
    const materias = atividades.split(/^#{1,2} Matéria \d+ - /m).slice(1);
    const questoes = materias.flatMap(materia =>
      materia.split('### Questões')[1].split(/^\d+\. /m).slice(1));
    const formulario = context.modulos[String(indice + 1)].questoes;

    assert.equal(questoes.length, 16);

    questoes.forEach((texto, numero) => {
      const cabecalho = texto.match(/^\*\*Resposta: ([A-D])\*\*\s*/);
      assert.ok(cabecalho);
      const blocos = texto.slice(cabecalho[0].length).trim().split(/\s+([A-D])\)\s*/);
      const questao = formulario[numero];
      const correta = gabaritosRevisados[indice][numero];

      assert.equal(cabecalho[1], correta, questao.id);
      assert.equal(questao.resposta, correta, questao.id);
      assert.equal(limpar(blocos[0]), limpar(questao.enunciado), questao.id);
      assert.equal(blocos.length, 9, questao.id);

      for (let alternativa = 0; alternativa < 4; alternativa++) {
        const letra = 'ABCD'[alternativa];
        const original = blocos[alternativa * 2 + 2];
        assert.equal(limpar(original), limpar(questao.alternativas[alternativa]), questao.id);
        if (original.includes('*')) assert.equal(letra, correta, questao.id);
        assert.equal(conferir(questao, letra), letra === correta, questao.id);
        assert.equal(conferir(questao, ` ${letra.toLowerCase()} `), letra === correta, questao.id);
      }
    });
  });
});

test('valores aceitos nos formulários correspondem aos cálculos dos enunciados', () => {
  assert.equal(context.modulos['1'].questoes[5].valor, 300 - 120 - 80 - 60);
  assert.equal(context.modulos['1'].questoes[14].valor, (480 - 80) / 8);
});

test('cada módulo contém 16 questões das quatro matérias, com alternativas completas', () => {
  const ids = new Set();
  for (const modulo of Object.values(context.modulos)) {
    assert.equal(modulo.questoes.length, 16);
    assert.equal(new Set(modulo.questoes.map(q => q.materia)).size, 4);
    for (const q of modulo.questoes) {
      assert.equal(q.alternativas.length, 4);
      assert.ok(q.alternativas.every(a => a.length > 0 && !a.includes('*')));
      assert.match(q.resposta, /^[A-D]$/);
      assert.ok(!ids.has(q.id));
      ids.add(q.id);
    }
  }
});

test('aceita letras minúsculas e espaços, e distingue erros de entradas inválidas', () => {
  const q = context.modulos['1'].questoes[0];
  assert.equal(conferir(q, ' b '), true);
  assert.equal(conferir(q, 'A'), false);
  for (const entrada of ['', '   ', 'E', 'AB', '25', '<script>']) {
    assert.equal(conferir(q, entrada), null);
  }
});

test('cálculos aceitam letra, inteiro, decimal e moeda, sem aceitar números parciais', () => {
  const q = context.modulos['1'].questoes[14];
  for (const entrada of ['B', '50', '50,00', '50.00', 'R$ 50,00', '50 reais']) {
    assert.equal(conferir(q, entrada), true, entrada);
  }
  for (const entrada of ['40', '50,01', '5.000', '5.000,00']) {
    assert.equal(conferir(q, entrada), false, entrada);
  }
  for (const entrada of ['50abc', '5e1', '50,0,0', '', 'R$']) {
    assert.equal(conferir(q, entrada), null, entrada);
  }
  assert.equal(conferir(context.modulos['1'].questoes[5], '40'), true);
});

test('gabarito da compra por impulso reconhece as consequências', () => {
  const q = context.modulos['1'].questoes[2];
  assert.equal(conferir(q, 'A'), true);
  assert.equal(conferir(q, 'B'), false);
});

test('páginas dos módulos apontam para suas próprias atividades e recursos existem', () => {
  for (const numero of [1, 2]) {
    const modulo = fs.readFileSync(path.join(root, `frontend/pages/modulo${numero}.html`), 'utf8');
    assert.ok(modulo.includes(`href="atividade-modulo${numero}.html"`));
    const pagina = path.join(root, `frontend/pages/atividade-modulo${numero}.html`);
    const html = fs.readFileSync(pagina, 'utf8');
    assert.ok(html.includes(`data-modulo="${numero}"`));
    for (const [, link] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      assert.ok(fs.existsSync(path.resolve(path.dirname(pagina), link)), link);
    }
  }
});

test('atividades carregam a camada de serviços, na ordem de dependência', () => {
  for (const numero of [1, 2]) {
    const pagina = path.join(root, `frontend/pages/atividade-modulo${numero}.html`);
    const html = fs.readFileSync(pagina, 'utf8');

    for (const src of [
      'js/config/config.js',
      'js/services/api.js',
      'js/services/auth.js',
      'js/services/progresso.js',
      'js/pages/atividades.js',
    ]) {
      assert.ok(html.includes(src), `atividade-modulo${numero}.html não carrega ${src}`);
    }

    // Os serviços são globais sem módulos: activities.js roda por último.
    const posicao = src => html.indexOf(`src="../${src}"`);
    assert.ok(posicao('js/services/progresso.js') < posicao('js/pages/atividades.js'),
      `progresso.js precisa vir antes de atividades.js no módulo ${numero}`);

    // Nada de statement de topo: o vm do teste não define fetch/localStorage.
    assert.ok(!/^iniciarAtividade\(\);/m.test(fs.readFileSync(
      path.join(root, 'frontend/js/pages/atividades.js'), 'utf8').replace(/iniciarAtividade\(\);\s*$/, '')),
      'atividades.js não pode executar nada fora de função');
  }
});

test('páginas de módulo definem data-modulo e exibem o progresso', () => {
  for (const numero of [1, 2]) {
    const pagina = path.join(root, `frontend/pages/modulo${numero}.html`);
    const html = fs.readFileSync(pagina, 'utf8');

    assert.ok(html.includes(`data-modulo="${numero}"`),
      `modulo${numero}.html precisa de data-modulo="${numero}"`);
    for (const src of [
      'js/config/config.js',
      'js/services/api.js',
      'js/services/auth.js',
      'js/services/progresso.js',
      'js/pages/modulo.js',
    ]) {
      assert.ok(html.includes(src), `modulo${numero}.html não carrega ${src}`);
    }
    for (const id of ['modulo-progresso-texto', 'modulo-progresso-barra', 'modulo-progresso-status']) {
      assert.ok(html.includes(`id="${id}"`), `modulo${numero}.html sem #${id}`);
    }
    // Só caminhos relativos: a página embute um iframe do YouTube.
    for (const [, link] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      if (/^[a-z]+:|^\/\//.test(link)) continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(pagina), link)), link);
    }
  }
});

test('home mostra o resumo do progresso e carrega o serviço', () => {
  const pagina = path.join(root, 'frontend/pages/home.html');
  const html = fs.readFileSync(pagina, 'utf8');

  for (const src of ['js/services/progresso.js', 'js/pages/home.js']) {
    assert.ok(html.includes(src), `home.html não carrega ${src}`);
  }
  for (const id of ['home-progresso-geral', 'home-progresso-barra', 'home-progresso-modulos']) {
    assert.ok(html.includes(`id="${id}"`), `home.html sem #${id}`);
  }
  assert.ok(!html.includes('ainda não está disponível'),
    'home.html ainda diz que o progresso não está disponível');
  for (const [, link] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    assert.ok(fs.existsSync(path.resolve(path.dirname(pagina), link)), link);
  }
});
