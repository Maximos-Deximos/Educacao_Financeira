// script.js - InvestiMentes
// login e cadastro integrados à API (FastAPI + JWT)

// usuario só pode ter letras minusculas (a-z) e numeros (1-9 / 0-9), sem simbolos
const REGEX_USUARIO = /^[a-z0-9]+$/;

const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

const inputLoginUsuario = document.getElementById('login-usuario');
const inputLoginSenha = document.getElementById('login-senha');

const inputCadUsuario = document.getElementById('cad-usuario');
const inputCadSenha = document.getElementById('cad-senha');
const inputCadSenhaConfirma = document.getElementById('cad-senha-confirma');

const mensagemLogin = document.getElementById('mensagem-login');
const mensagemCadastro = document.getElementById('mensagem-cadastro');

const botaoCadastro = document.getElementById('botao-cadastro');
const botaoLogin = document.getElementById('botao-login');

const fundoModal = document.getElementById('fundo-modal');
const abrirCadastroBtn = document.getElementById('abrir-cadastro');
const fecharModalBtn = document.getElementById('fechar-modal');

const botaoOlhoLogin = document.getElementById('botao-olho-login');

// ---------- funcoes auxiliares ----------

function limparUsuario(valor) {
  // tira espaços e deixa em minusculo, e ja remove qualquer caractere
  // fora de a-z e 0-9 antes de validar
  return valor.trim().toLowerCase();
}

function mostrarErro(idSpan, texto) {
  const span = document.getElementById(idSpan);
  if (span) span.textContent = texto;
}

function limparErros(form) {
  form.querySelectorAll('.erro').forEach(function (span) {
    span.textContent = '';
  });
  form.querySelectorAll('input').forEach(function (input) {
    input.classList.remove('invalido');
  });
}

function marcarInvalido(input) {
  input.classList.add('invalido');
}

function validarUsuario(usuario) {
  if (usuario.length === 0) return 'Digite um usuário.';
  if (usuario.length < 3) return 'Use pelo menos 3 caracteres.';
  if (!REGEX_USUARIO.test(usuario)) {
    return 'Só letras (a-z) e números, sem espaços ou símbolos.';
  }
  return null;
}

// ---------- mostrar/esconder senha ----------

botaoOlhoLogin.addEventListener('click', function () {
  const escondida = inputLoginSenha.type === 'password';
  inputLoginSenha.type = escondida ? 'text' : 'password';
});

// ---------- abrir/fechar modal de cadastro ----------

function abrirModal() {
  fundoModal.classList.add('aberto');
  limparErros(formCadastro);
  mensagemCadastro.textContent = '';
  mensagemCadastro.className = 'mensagem-status';
  formCadastro.reset();
  inputCadUsuario.focus();
}

function fecharModal() {
  fundoModal.classList.remove('aberto');
}

abrirCadastroBtn.addEventListener('click', abrirModal);
fecharModalBtn.addEventListener('click', fecharModal);

fundoModal.addEventListener('click', function (evento) {
  if (evento.target === fundoModal) fecharModal();
});

document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape' && fundoModal.classList.contains('aberto')) {
    fecharModal();
  }
});

// filtra em tempo real o que o usuario digita nos campos de usuario,
// já bloqueando simbolo/espaço na hora de digitar
function filtrarDigitacao(input) {
  input.addEventListener('input', function () {
    input.value = input.value.toLowerCase().replace(/[^a-z0-9]/g, '');
  });
}

filtrarDigitacao(inputLoginUsuario);
filtrarDigitacao(inputCadUsuario);

// ---------- cadastro ----------

formCadastro.addEventListener('submit', async function (evento) {
  evento.preventDefault();
  limparErros(formCadastro);

  const usuario = limparUsuario(inputCadUsuario.value);
  const senha = inputCadSenha.value;
  const senhaConfirma = inputCadSenhaConfirma.value;

  let temErro = false;

  const erroUsuario = validarUsuario(usuario);
  if (erroUsuario) {
    mostrarErro('erro-cad-usuario', erroUsuario);
    marcarInvalido(inputCadUsuario);
    temErro = true;
  }

  if (senha.length < 6) {
    mostrarErro('erro-cad-senha', 'A senha precisa ter 6 ou mais caracteres.');
    marcarInvalido(inputCadSenha);
    temErro = true;
  }

  if (senhaConfirma !== senha) {
    mostrarErro('erro-cad-senha-confirma', 'As senhas não são iguais.');
    marcarInvalido(inputCadSenhaConfirma);
    temErro = true;
  }

  if (temErro) return;

  botaoCadastro.disabled = true;
  mensagemCadastro.textContent = '';
  mensagemCadastro.className = 'mensagem-status';

  let resultado;
  try {
    resultado = await Auth.register(usuario, senha);
  } catch (erro) {
    botaoCadastro.disabled = false;
    mensagemCadastro.textContent = 'Não foi possível conectar ao servidor.';
    mensagemCadastro.className = 'mensagem-status falha';
    return;
  }

  botaoCadastro.disabled = false;

  if (resultado.ok) {
    mensagemCadastro.textContent = 'Conta criada! Você já pode entrar.';
    mensagemCadastro.className = 'mensagem-status sucesso';

    setTimeout(function () {
      fecharModal();
      inputLoginUsuario.value = usuario;
      inputLoginSenha.focus();
    }, 1100);
    return;
  }

  if (resultado.status === 409) {
    mostrarErro('erro-cad-usuario', 'Esse usuário já existe.');
    marcarInvalido(inputCadUsuario);
    return;
  }

  if (resultado.status === 422) {
    mensagemCadastro.textContent = 'Dados inválidos. Use usuário de 3 a 20 caracteres (a-z, 0-9) e senha com 6 ou mais.';
    mensagemCadastro.className = 'mensagem-status falha';
    return;
  }

  mensagemCadastro.textContent = 'Não foi possível criar a conta. Tente novamente.';
  mensagemCadastro.className = 'mensagem-status falha';
});

// ---------- login ----------

formLogin.addEventListener('submit', async function (evento) {
  evento.preventDefault();
  limparErros(formLogin);
  mensagemLogin.textContent = '';
  mensagemLogin.className = 'mensagem-status';

  const usuario = limparUsuario(inputLoginUsuario.value);
  const senha = inputLoginSenha.value;

  let temErro = false;

  const erroUsuario = validarUsuario(usuario);
  if (erroUsuario) {
    mostrarErro('erro-login-usuario', erroUsuario);
    marcarInvalido(inputLoginUsuario);
    temErro = true;
  }

  if (senha.length === 0) {
    mostrarErro('erro-login-senha', 'Digite sua senha.');
    marcarInvalido(inputLoginSenha);
    temErro = true;
  }

  if (temErro) return;

  botaoLogin.disabled = true;
  mensagemLogin.textContent = '';
  mensagemLogin.className = 'mensagem-status';

  let resultado;
  try {
    resultado = await Auth.login(usuario, senha);
  } catch (erro) {
    botaoLogin.disabled = false;
    mensagemLogin.textContent = 'Não foi possível conectar ao servidor.';
    mensagemLogin.className = 'mensagem-status falha';
    return;
  }

  botaoLogin.disabled = false;

  if (resultado.ok) {
    salvarToken(resultado.dados.access_token);
    mensagemLogin.textContent = 'Login feito com sucesso! Redirecionando...';
    mensagemLogin.className = 'mensagem-status sucesso';

    setTimeout(function () {
      window.location.href = 'home.html';
    }, 1000);
    return;
  }

  if (resultado.status === 401) {
    mensagemLogin.textContent = 'Usuário ou senha incorretos.';
    mensagemLogin.className = 'mensagem-status falha';
    marcarInvalido(inputLoginUsuario);
    marcarInvalido(inputLoginSenha);
    return;
  }

  if (resultado.status === 422) {
    mensagemLogin.textContent = 'Dados inválidos. Verifique usuário e senha.';
    mensagemLogin.className = 'mensagem-status falha';
    return;
  }

  mensagemLogin.textContent = 'Não foi possível entrar. Tente novamente.';
  mensagemLogin.className = 'mensagem-status falha';
});