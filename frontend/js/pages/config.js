// Proteção de autenticação
(function () {
  if (typeof estaAutenticado === "function" && !estaAutenticado()) {
    if (typeof limparToken === "function") limparToken();
    window.location.replace("login.html");
    return;
  }
})();

const nomeUsuario = document.getElementById("nome-usuario");
const nomeSaudacao = document.getElementById("nome-saudacao");
const formNome = document.getElementById("form-nome");
const formSenha = document.getElementById("form-senha");
const nomeFeedback = document.getElementById("nome-feedback");
const senhaFeedback = document.getElementById("senha-feedback");
const temaClaro = document.getElementById("tema-claro");
const temaEscuro = document.getElementById("tema-escuro");

function getTemaKey() {
  if (window.themeManager && typeof window.themeManager.getKey === "function") {
    return window.themeManager.getKey();
  }
  if (typeof window.CHAVE_TEMA === "string") {
    return window.CHAVE_TEMA;
  }
  return "investiMentes_tema";
}

function mostrarFeedback(elemento, mensagem, tipo) {
  if (!elemento) return;
  elemento.textContent = mensagem;
  elemento.classList.remove("sucesso", "erro");
  if (tipo) {
    elemento.classList.add(tipo);
  }
}

async function carregarNome() {
  if (typeof Auth === "undefined" || typeof Auth.getUsuarioAtual !== "function") return;
  try {
    const resultado = await Auth.getUsuarioAtual();
    if (resultado.ok && resultado.dados) {
      if (nomeUsuario) nomeUsuario.value = resultado.dados.usuario;
      if (nomeSaudacao) nomeSaudacao.textContent = resultado.dados.usuario;
    } else if (resultado.status === 401) {
      if (typeof limparToken === "function") limparToken();
      window.location.replace("login.html");
    }
  } catch (erro) {}
}

if (formNome) {
  formNome.addEventListener("submit", async function (event) {
    event.preventDefault();
    const novoNome = nomeUsuario && nomeUsuario.value ? nomeUsuario.value.trim() : "";
    if (novoNome.length < 3) {
      mostrarFeedback(nomeFeedback, "Digite um nome válido (mínimo 3 caracteres).", "erro");
      return;
    }
    if (novoNome.length > 20) {
      mostrarFeedback(nomeFeedback, "Nome de usuário deve ter no máximo 20 caracteres.", "erro");
      return;
    }
    if (!/^[a-z0-9]+$/.test(novoNome)) {
      mostrarFeedback(nomeFeedback, "Nome de usuário deve conter apenas letras minúsculas e números.", "erro");
      return;
    }
    if (typeof Usuario === "undefined" || typeof Usuario.atualizarNome !== "function") {
      mostrarFeedback(nomeFeedback, "Serviço indisponível.", "erro");
      return;
    }
    const res = await Usuario.atualizarNome(novoNome);
    if (res.ok && res.dados) {
      if (nomeSaudacao) nomeSaudacao.textContent = res.dados.usuario ?? novoNome;
      mostrarFeedback(nomeFeedback, "Nome alterado com sucesso!", "sucesso");
    } else if (res.status === 409) {
      mostrarFeedback(nomeFeedback, "Nome de usuário já está em uso.", "erro");
    } else if (res.status === 401) {
      if (typeof limparToken === "function") limparToken();
      window.location.replace("login.html");
    } else if (res.status === 422) {
      mostrarFeedback(nomeFeedback, "Nome inválido. Use apenas letras minúsculas e números (3–20 caracteres).", "erro");
    } else {
      mostrarFeedback(nomeFeedback, "Não foi possível alterar o nome.", "erro");
    }
  });
}

function aplicarTema(tema) {
  if (window.themeManager && window.themeManager.apply) {
    window.themeManager.apply(tema);
  } else {
    const html = document.documentElement;
    if (tema === "dark") {
      html.setAttribute("data-tema", "escuro");
    } else {
      html.removeAttribute("data-tema");
    }
  }
  if (tema === "dark") {
    if (temaEscuro) temaEscuro.classList.add("ativo");
    if (temaClaro) temaClaro.classList.remove("ativo");
  } else {
    if (temaClaro) temaClaro.classList.add("ativo");
    if (temaEscuro) temaEscuro.classList.remove("ativo");
  }
}

function carregarTema() {
  const temaSalvo = localStorage.getItem(getTemaKey());
  if (temaSalvo === "dark") {
    aplicarTema("dark");
  } else {
    aplicarTema("light");
  }
}

if (temaClaro) {
  temaClaro.addEventListener("click", function () {
    localStorage.setItem(getTemaKey(), "light");
    aplicarTema("light");
  });
}
if (temaEscuro) {
  temaEscuro.addEventListener("click", function () {
    localStorage.setItem(getTemaKey(), "dark");
    aplicarTema("dark");
  });
}

const botoesVisualizarSenha = document.querySelectorAll(".botao-visualizar-senha");
botoesVisualizarSenha.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const idCampo = botao.dataset.target;
    const campoSenha = document.getElementById(idCampo);
    if (!campoSenha) return;
    if (campoSenha.type === "password") {
      campoSenha.type = "text";
      botao.textContent = "🙈";
      botao.setAttribute("aria-label", "Ocultar senha");
      botao.setAttribute("aria-pressed", "true");
    } else {
      campoSenha.type = "password";
      botao.textContent = "👁";
      botao.setAttribute("aria-label", "Mostrar senha");
      botao.setAttribute("aria-pressed", "false");
    }
  });
});

if (formSenha) {
  formSenha.addEventListener("submit", async function (event) {
    event.preventDefault();
    const senhaAtualEl = document.getElementById("senha-atual");
    const novaSenhaEl = document.getElementById("nova-senha");
    const confirmarEl = document.getElementById("confirmar-senha");
    const senhaAtual = senhaAtualEl ? senhaAtualEl.value : "";
    const novaSenha = novaSenhaEl ? novaSenhaEl.value : "";
    const confirmarSenha = confirmarEl ? confirmarEl.value : "";
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      mostrarFeedback(senhaFeedback, "Preencha todos os campos.", "erro");
      return;
    }
    if (senhaAtual.length < 6 || senhaAtual.length > 128) {
      mostrarFeedback(senhaFeedback, "Senha atual deve ter entre 6 e 128 caracteres.", "erro");
      return;
    }
    if (novaSenha.length < 6 || novaSenha.length > 128) {
      mostrarFeedback(senhaFeedback, "Nova senha deve ter entre 6 e 128 caracteres.", "erro");
      return;
    }
    if (confirmarSenha.length < 6 || confirmarSenha.length > 128) {
      mostrarFeedback(senhaFeedback, "Confirmação da senha deve ter entre 6 e 128 caracteres.", "erro");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      mostrarFeedback(senhaFeedback, "As senhas não coincidem.", "erro");
      return;
    }
    if (typeof Usuario === "undefined" || typeof Usuario.alterarSenha !== "function") {
      mostrarFeedback(senhaFeedback, "Serviço indisponível.", "erro");
      return;
    }
    const res = await Usuario.alterarSenha(senhaAtual, novaSenha);
    if (res.ok) {
      mostrarFeedback(senhaFeedback, "Senha alterada com sucesso!", "sucesso");
      formSenha.reset();
      botoesVisualizarSenha.forEach(function (botao) {
        botao.textContent = "👁";
        botao.setAttribute("aria-label", "Mostrar senha");
        botao.setAttribute("aria-pressed", "false");
      });
      if (senhaAtualEl) senhaAtualEl.type = "password";
      if (novaSenhaEl) novaSenhaEl.type = "password";
      if (confirmarEl) confirmarEl.type = "password";
    } else if (res.status === 401) {
      const detail = res.dados && res.dados.detail ? res.dados.detail : "";
      if (detail === "Senha atual incorreta.") {
        mostrarFeedback(senhaFeedback, "Senha atual incorreta.", "erro");
      } else {
        if (typeof limparToken === "function") limparToken();
        window.location.replace("login.html");
      }
    } else if (res.status === 422) {
      mostrarFeedback(senhaFeedback, "Dados inválidos. Verifique as regras de senha (mínimo 6 caracteres).", "erro");
    } else {
      mostrarFeedback(senhaFeedback, "Não foi possível alterar a senha.", "erro");
    }
  });
}

carregarNome();
if (window.themeManager && window.themeManager.load) {
  const temaSalvo = localStorage.getItem(getTemaKey());
  if (temaSalvo === "dark") {
    if (temaEscuro) temaEscuro.classList.add("ativo");
    if (temaClaro) temaClaro.classList.remove("ativo");
  } else {
    if (temaClaro) temaClaro.classList.add("ativo");
    if (temaEscuro) temaEscuro.classList.remove("ativo");
  }
} else {
  carregarTema();
}
