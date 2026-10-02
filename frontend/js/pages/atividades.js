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

/* Aparência da questão conforme o veredito devolvido pelo back-end. */
function aparenciaDaQuestao(acertou) {
  return acertou
    ? { estado: 'acerto', feedback: 'Você acertou!', botao: 'Confirmado' }
    : {
        estado: 'erro',
        feedback: 'Ainda não. Revise a questão e tente novamente.',
        botao: 'Tentar novamente',
      };
}

async function iniciarAtividade() {
  // RF11: as atividades só existem para usuário logado
  if (!estaAutenticado()) {
    logout('login.html');
    return;
  }

  const numeroModulo = document.body.dataset.modulo;
  const modulo = MODULOS_ATIVIDADES[numeroModulo];

  const container = document.getElementById('questoes');

  // codigo -> { form, input, feedback, button }
  const campos = new Map();
  // codigo -> { resposta, acertou }  (o back-end é a fonte da verdade)
  const respostas = new Map();

  function contarConcluidas() {
    return [...respostas.values()].filter(registro => registro.acertou).length;
  }

  function atualizarProgresso() {
    const concluidas = contarConcluidas();
    const total = modulo.questoes.length;

    document.getElementById('progresso').value = concluidas;
    document.getElementById('progresso-texto').textContent =
      `${concluidas} de ${total} questões concluídas`;

    const resultado = document.getElementById('resultado-final');
    if (concluidas === total) {
      resultado.textContent =
        'Parabéns! Você concluiu todas as questões deste módulo.';
    } else {
      resultado.textContent = '';
    }
  }

  function mostrar(campo, acertou) {
    const visual = aparenciaDaQuestao(acertou);
    campo.form.dataset.estado = visual.estado;
    campo.feedback.textContent = visual.feedback;
    campo.button.textContent = visual.botao;
  }

  function expirarSessao(resultado) {
    // RF11: 401 limpa o token e volta para o login
    if (resultado && resultado.status === 401) {
      limparToken();
      window.location.replace('login.html');
      return true;
    }
    return false;
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

    campos.set(questao.id, { form, input, feedback, button });

    input.addEventListener('input', () => {
      respostas.delete(questao.id);
      delete form.dataset.estado;

      input.removeAttribute('aria-invalid');
      feedback.textContent = '';
      button.textContent = 'Confirmar';

      atualizarProgresso();
    });

    form.addEventListener('submit', async evento => {
      evento.preventDefault();

      // Validação de formato igual à de sempre; o back decide o acerto
      if (conferirResposta(questao, input.value) === null) {
        feedback.textContent = input.value.trim() ? ajuda.textContent : 'Digite uma resposta antes de confirmar.';
        form.dataset.estado = 'erro';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }

      const texto = input.value.trim();
      button.disabled = true;
      button.textContent = 'Salvando...';

      let gravado = null;
      try {
        gravado = await Progresso.registrarResposta(questao.id, texto);
      } catch (erro) {
        gravado = null; // API fora do ar
      }

      button.disabled = false;

      if (expirarSessao(gravado)) return;

      // RF12: indisponibilidade da API não pode quebrar a página nem
      // marcar como concluído o que não chegou a ser salvo.
      if (!gravado || !gravado.ok) {
        form.dataset.estado = 'falha';
        feedback.textContent = 'Não foi possível salvar sua resposta agora. Tente de novo em instantes.';
        input.removeAttribute('aria-invalid');
        button.textContent = 'Tentar salvar';
        return;
      }

      input.removeAttribute('aria-invalid');
      respostas.set(questao.id, {
        resposta: gravado.dados.resposta_usuario,
        acertou: gravado.dados.acertou,
      });
      mostrar(campos.get(questao.id), gravado.dados.acertou);
      atualizarProgresso();
    });
  });

  /* Reidrata com o que já está salvo no banco (RF06). */
  async function carregarSalvo() {
    let dados = null;

    try {
      const resultado = await Progresso.obterModulo(numeroModulo);
      if (expirarSessao(resultado)) return;
      if (resultado.ok) dados = resultado.dados;
    } catch (erro) {
      // API fora do ar: segue com o formulário em branco (RF12)
    }

    if (!dados) return;

    dados.respostas.forEach(salva => {
      const campo = campos.get(salva.codigo);
      if (!campo) return;

      campo.input.value = salva.resposta_usuario;
      respostas.set(salva.codigo, {
        resposta: salva.resposta_usuario,
        acertou: salva.acertou,
      });
      mostrar(campo, salva.acertou);
    });

    atualizarProgresso();
  }

  await carregarSalvo();
}

iniciarAtividade();
