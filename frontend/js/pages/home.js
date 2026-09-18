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

document.getElementById('botao-sair').addEventListener('click', function (evento) {
  evento.preventDefault();
  logout('../index.html');
});