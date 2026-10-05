const CHAVE_TEMA = "investiMentes_tema";

function aplicarTema(tema) {
  const html = document.documentElement;
  if (tema === "dark") {
    html.setAttribute("data-tema", "escuro");
  } else {
    html.removeAttribute("data-tema");
  }
}

function carregarTema() {
  const temaSalvo = localStorage.getItem(CHAVE_TEMA);
  if (temaSalvo === "dark") {
    aplicarTema("dark");
  } else {
    aplicarTema("light");
  }
}

// Aplicar o quanto antes para evitar FOUC
carregarTema();

window.themeManager = {
  getKey: () => CHAVE_TEMA,
  apply: aplicarTema,
  load: carregarTema,
};