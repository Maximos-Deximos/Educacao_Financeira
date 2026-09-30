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

function decodificarToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch (erro) {
    return null;
  }
}

function estaAutenticado() {
  const dados = decodificarToken();
  if (!dados || !dados.exp) return false;
  return dados.exp * 1000 > Date.now();
}

function logout(destino = 'login.html') {
  limparToken();
  window.location.href = destino;
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