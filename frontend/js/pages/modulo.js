// Progresso do módulo na página de detalhe (RF04/RF05)
async function carregarProgressoModulo() {
  // RF11: bloqueia página interna
  if (!estaAutenticado()) {
    window.location.replace('login.html');
    return;
  }

  const numero = document.body.dataset.modulo;
  const texto = document.getElementById('modulo-progresso-texto');
  const barra = document.getElementById('modulo-progresso-barra');
  const status = document.getElementById('modulo-progresso-status');

  if (!texto || !barra || !status) return;

  try {
    const resultado = await Progresso.obterModulo(numero);

    if (resultado.status === 401) {
      limparToken();
      window.location.replace('login.html');
      return;
    }

    if (!resultado.ok) return;

    const progresso = resultado.dados.progresso;

    barra.max = progresso.total || 1;
    barra.value = progresso.concluidas;
    texto.textContent =
      `${progresso.concluidas} de ${progresso.total} questões concluídas · ${progresso.percentual}%`;

    status.textContent = progresso.concluido
      ? 'Módulo concluído. Revise o material quando quiser.'
      : 'Módulo em andamento. Continue respondendo às atividades.';
  } catch (erro) {
    // API indisponível: mantém o texto padrão sem quebrar a página (RF12)
  }
}

carregarProgressoModulo();
