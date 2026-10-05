// Serviços de configurações do usuário (nome e senha)
const Usuario = {
  atualizarNome(usuario) {
    return request("/usuario/me", {
      method: "PATCH",
      body: { usuario },
    });
  },
  alterarSenha(senha_atual, nova_senha) {
    return request("/usuario/me/senha", {
      method: "PATCH",
      body: { senha_atual, nova_senha },
    });
  },
};
