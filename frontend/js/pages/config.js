const nomeUsuario = document.getElementById("nome-usuario");
const nomeSaudacao = document.getElementById("nome-saudacao");
const formNome = document.getElementById("form-nome");
const formSenha = document.getElementById("form-senha");
const nomeFeedback = document.getElementById("nome-feedback");
const senhaFeedback = document.getElementById("senha-feedback");
const temaClaro = document.getElementById("tema-claro");
const temaEscuro = document.getElementById("tema-escuro");
const CHAVE_NOME = "investiMentes_nome";
const CHAVE_TEMA = "investiMentes_tema";
/* 
   FEEDBACK
   */

function mostrarFeedback(elemento, mensagem, tipo) {

    elemento.textContent = mensagem;

    elemento.classList.remove("sucesso", "erro");

    if (tipo) {
        elemento.classList.add(tipo);
    }
}
/* 
   NOME DE USUÁRIO
    */
function carregarNome() {

    const nomeSalvo = localStorage.getItem(CHAVE_NOME);

    if (nomeSalvo) {

        nomeUsuario.value = nomeSalvo;

        nomeSaudacao.textContent = nomeSalvo;
    }
}
formNome.addEventListener("submit", function (event) {

    event.preventDefault();

    const novoNome = nomeUsuario.value.trim();

    if (novoNome.length < 2) {

        mostrarFeedback(
            nomeFeedback,
            "Digite um nome válido.",
            "erro"
        );

        return;
    }

    localStorage.setItem(CHAVE_NOME, novoNome);

    nomeSaudacao.textContent = novoNome;

    mostrarFeedback(
        nomeFeedback,
        "Nome alterado com sucesso!",
        "sucesso"
    );
});
/* 
   TEMA
   */

function aplicarTema(tema) {

    const html = document.documentElement;

    if (tema === "dark") {

        /*
         * O projeto geral utiliza
         * data-tema="escuro" no elemento html.
         */

        html.setAttribute(
            "data-tema",
            "escuro"
        );

        temaEscuro.classList.add("ativo");

        temaClaro.classList.remove("ativo");

    } else {

        html.removeAttribute("data-tema");

        temaClaro.classList.add("ativo");

        temaEscuro.classList.remove("ativo");
    }
}
function carregarTema() {

    const temaSalvo =
        localStorage.getItem(CHAVE_TEMA);

    if (temaSalvo === "dark") {

        aplicarTema("dark");

    } else {

        aplicarTema("light");
    }
}
temaClaro.addEventListener("click", function () {

    localStorage.setItem(
        CHAVE_TEMA,
        "light"
    );

    aplicarTema("light");
});
temaEscuro.addEventListener("click", function () {

    localStorage.setItem(
        CHAVE_TEMA,
        "dark"
    );

    aplicarTema("dark");
});
/* 
   VISUALIZAR SENHA
    */
const botoesVisualizarSenha =
    document.querySelectorAll(
        ".botao-visualizar-senha"
    );
botoesVisualizarSenha.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const idCampo =
            botao.dataset.target;
        const campoSenha =
            document.getElementById(idCampo);
        if (!campoSenha) {
            return;
        }
        if (campoSenha.type === "password") {

            campoSenha.type = "text";

            botao.textContent = "🙈";

            botao.setAttribute(
                "aria-label",
                "Ocultar senha"
            );

            botao.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            campoSenha.type = "password";

            botao.textContent = "👁";

            botao.setAttribute(
                "aria-label",
                "Mostrar senha"
            );

            botao.setAttribute(
                "aria-pressed",
                "false"
            );
        }
    });
});
/* 
   ALTERAR SENHA
    */

formSenha.addEventListener("submit", function (event) {
    event.preventDefault();
    const senhaAtual =
        document.getElementById("senha-atual").value;
    const novaSenha =
        document.getElementById("nova-senha").value;
    const confirmarSenha =
        document.getElementById("confirmar-senha").value;
    if (
        !senhaAtual ||
        !novaSenha ||
        !confirmarSenha
    ) {
        mostrarFeedback(
            senhaFeedback,
            "Preencha todos os campos.",
            "erro"
        );
        return;
    }
    if (senhaAtual.length > 15) {
        mostrarFeedback(
            senhaFeedback,
            "A senha atual deve possuir no máximo 15 caracteres.",
            "erro"
        );
        return;
    }
    if (novaSenha.length > 15) {
        mostrarFeedback(
            senhaFeedback,
            "A nova senha deve possuir no máximo 15 caracteres.",
            "erro"
        );
        return;
    }

    if (confirmarSenha.length > 15) {
        mostrarFeedback(
            senhaFeedback,
            "A confirmação da senha deve possuir no máximo 15 caracteres.",
            "erro"
        );
        return;
    }
    if (novaSenha !== confirmarSenha) {
        mostrarFeedback(
            senhaFeedback,
            "As senhas não coincidem.",
            "erro"
        );
        return;
    }
    /*
     * IMPORTANTE:
     * Aqui deve entrar a comunicação com o back-end.
     *
     * Por enquanto, nenhuma API está sendo chamada.
     * A senha NÃO deve ser salva no localStorage.
     */
    mostrarFeedback(
        senhaFeedback,
        "Senha validada. A alteração deve ser enviada ao servidor.",
        "sucesso"
    );
    formSenha.reset();
    /*
     * Depois de limpar os campos,
     * garantimos que todos voltem a ficar ocultos.
     */
    botoesVisualizarSenha.forEach(function (botao) {
        botao.textContent = "👁";
        botao.setAttribute(
            "aria-label",
            "Mostrar senha"
        );
        botao.setAttribute(
            "aria-pressed",
            "false"
        );
    });
});
/* 
   INICIALIZAÇÃO
    */

carregarNome();

carregarTema();