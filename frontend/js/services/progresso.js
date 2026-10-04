// Comunicação com os endpoints de atividade e progresso (RF06/RF08)
const Progresso = {
  registrarResposta(codigo, resposta) {
    return request("/form/respostas", {
      method: "POST",
      body: { codigo: codigo, resposta_usuario: resposta },
    });
  },

  obterProgresso() {
    return request("/form/progresso", { method: "GET" });
  },

  obterModulo(modulo) {
    return request("/form/modulos/" + modulo, { method: "GET" });
  },
};
