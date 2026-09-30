/* Cada confirmação substitui a anterior; novas tentativas não somam pontos extras. */
function conferirResposta(questao, entrada) {
  const texto = entrada.trim();

  if (!texto) return null;

  if (/^[a-d]$/i.test(texto)) return texto.toUpperCase() === questao.resposta;

  if (questao.valor === undefined) return null;

  const numero = texto.replace(/^R\$\s*/i, '').replace(/\s*reais$/i, '').trim();

  // Aceita decimais brasileiros e ponto decimal; rejeita texto e valores parciais.

  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(numero)
      && !/^\d+\.\d{1,2}$/.test(numero)) return null;

  const normalizado = numero.includes(',') || /^\d{1,3}(?:\.\d{3})+$/.test(numero)
    ? numero.replace(/\./g, '').replace(',', '.') : numero;

  return Number(normalizado) === questao.valor;
}

function iniciarAtividade() {
  const modulo = MODULOS_ATIVIDADES[document.body.dataset.modulo];

  const container = document.getElementById('questoes');

  const respostas = new Map();

  function atualizarProgresso() {
    const acertos = [...respostas.values()].filter(Boolean).length;
    document.getElementById('progresso').value = respostas.size;
    document.getElementById('progresso-texto').textContent =
      `${respostas.size} de ${modulo.questoes.length} questões confirmadas · ${acertos} acertos`;
    document.getElementById('resultado-final').textContent = respostas.size === modulo.questoes.length
      ? (acertos === modulo.questoes.length
        ? 'Parabéns! Você acertou todas as questões.'
        : `Você acertou ${acertos} de ${modulo.questoes.length} questões. Revise suas respostas e tente novamente!`)
      : '';
  }

  let materiaAtual;

  let secao;

  modulo.questoes.forEach((questao, indice) => {
    if (questao.materia !== materiaAtual) {
      materiaAtual = questao.materia;
      secao = document.createElement('section');
      secao.className = 'atividade-materia';

      const titulo = document.createElement('h2');
      titulo.id = `materia-${indice}`;
      titulo.textContent = materiaAtual;
      secao.setAttribute('aria-labelledby', titulo.id);
      secao.append(titulo);
      container.append(secao);
    }

    const form = document.createElement('form');
    form.className = 'questao-card';
    form.noValidate = true;

    const titulo = document.createElement('h3');
    titulo.id = `${questao.id}-titulo`;
    titulo.textContent = `Questão ${indice + 1}`;
    form.setAttribute('aria-labelledby', titulo.id);

    const enunciado = document.createElement('p');
    enunciado.className = 'questao-enunciado';
    enunciado.textContent = questao.enunciado;

    const lista = document.createElement('ol');
    lista.className = 'questao-alternativas';
    lista.type = 'A';

    questao.alternativas.forEach(texto => {
      const item = document.createElement('li');
      item.textContent = texto;
      lista.append(item);
    });

    const label = document.createElement('label');
    label.htmlFor = questao.id;
    label.textContent = 'Sua resposta';

    const ajuda = document.createElement('p');
    ajuda.className = 'questao-ajuda';
    ajuda.id = `${questao.id}-ajuda`;
    ajuda.textContent = questao.valor === undefined
      ? 'Digite A, B, C ou D.' : 'Digite A, B, C ou D, ou o valor calculado (ex.: 25 ou 25,00).';

    const linha = document.createElement('div');
    linha.className = 'questao-resposta';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = questao.id;
    input.name = questao.id;
    input.maxLength = 40;
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.required = true;
    input.setAttribute('aria-describedby', `${ajuda.id} ${questao.id}-feedback`);

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Confirmar';

    const feedback = document.createElement('p');
    feedback.id = `${questao.id}-feedback`;
    feedback.className = 'questao-feedback';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');

    linha.append(input, button);
    form.append(titulo, enunciado, lista, label, ajuda, linha, feedback);
    secao.append(form);

    input.addEventListener('input', () => {
      respostas.delete(questao.id);
      delete form.dataset.estado;

      input.removeAttribute('aria-invalid');
      feedback.textContent = '';
      button.textContent = 'Confirmar';

      atualizarProgresso();
    });

    form.addEventListener('submit', evento => {
      evento.preventDefault();

      const resultado = conferirResposta(questao, input.value);

      if (resultado === null) {
        feedback.textContent = input.value.trim() ? ajuda.textContent : 'Digite uma resposta antes de confirmar.';
        form.dataset.estado = 'erro';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }

      input.removeAttribute('aria-invalid');
      respostas.set(questao.id, resultado);
      form.dataset.estado = resultado ? 'acerto' : 'erro';
      feedback.textContent = resultado ? 'Você acertou!' : 'Ainda não. Revise a questão e tente novamente.';
      button.textContent = resultado ? 'Confirmado' : 'Tentar novamente';

      atualizarProgresso();
    });
  });
}

iniciarAtividade();
