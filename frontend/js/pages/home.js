async function carregarSaudacao() {
  const titulo = document.getElementById('home-title');

  if (!estaAutenticado()) {
    window.location.replace('login.html');
    return;
  }

  try {
    const resultado = await Auth.getUsuarioAtual();

    if (resultado.ok) {
      titulo.textContent = 'Bem vindo ' + resultado.dados.usuario;
    } else if (resultado.status === 401) {
      limparToken();
      window.location.replace('login.html');
    }
  } catch (erro) {
    // servidor fora do ar — mantém o título padrão
  }
}

carregarSaudacao();

/* Resumo do progresso do usuário (RF03/RF08) */
async function carregarProgresso() {
  const geral = document.getElementById('home-progresso-geral');
  const lista = document.getElementById('home-progresso-modulos');
  const barra = document.getElementById('home-progresso-barra');

  if (!geral || !lista || !barra) return;

  let resultado = null;

  try {
    resultado = await Progresso.obterProgresso();
  } catch (erro) {
    // servidor fora do ar — mantém o texto padrão (RF12)
    return;
  }

  if (resultado.status === 401) {
    limparToken();
    window.location.replace('login.html');
    return;
  }

  if (!resultado.ok) return;

  const resumo = resultado.dados.geral;

  barra.max = resumo.total || 1;
  barra.value = resumo.concluidas;
  geral.textContent =
    `${resumo.concluidas} de ${resumo.total} questões concluídas · ${resumo.percentual}%`;

  lista.textContent = '';

  resultado.dados.modulos.forEach(function (modulo) {
    const item = document.createElement('li');
    item.className = 'home-progresso-item';

    const nome = document.createElement('strong');
    nome.textContent = `Módulo ${modulo.modulo} · ${modulo.nome}`;

    const detalhe = document.createElement('span');
    detalhe.textContent = `${modulo.concluidas}/${modulo.total} · ${modulo.percentual}%`
      + (modulo.concluido ? ' · concluído' : ' · em andamento');

    item.append(nome, detalhe);
    lista.append(item);
  });
}

carregarProgresso();

document.getElementById('botao-sair').addEventListener('click', function (evento) {
  evento.preventDefault();
  logout('../index.html');
});