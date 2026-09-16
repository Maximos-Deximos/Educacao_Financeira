// Gestão do token JWT no navegador
const CHAVE_TOKEN = "investimentes_token";

function getToken() {
  return localStorage.getItem(CHAVE_TOKEN);
}

function salvarToken(token) {
  localStorage.setItem(CHAVE_TOKEN, token);
}

function limparToken() {
  localStorage.removeItem(CHAVE_TOKEN);
}

function estaAutenticado() {
  return Boolean(getToken());
}

function logout() {
  limparToken();
  window.location.href = "login.html";
}

// Comunicação com o endpoint de autenticação
const Auth = {
  register(usuario, senha) {
    return request("/auth/register", {
      method: "POST",
      body: { usuario, senha },
    });
  },
  login(usuario, senha) {
    return request("/auth/login", {
      method: "POST",
      body: { usuario, senha },
    });
  },
  getUsuarioAtual() {
    return request("/auth/me", { method: "GET" });
  },
};