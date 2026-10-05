(function () {
  const CHAVE_TEMA = window.themeManager?.getKey() ?? "investiMentes_tema";

  function resolverBotoes() {
    return {
      light: (document.querySelector && document.querySelector('[data-tema-toggle="light"]')) || (document.getElementById && document.getElementById("tema-claro")),
      dark: (document.querySelector && document.querySelector('[data-tema-toggle="dark"]')) || (document.getElementById && document.getElementById("tema-escuro")),
      alternar: (document.querySelector && document.querySelector("[data-tema-alternar]")),
    };
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

    const { light, dark, alternar } = resolverBotoes();

    if (light && dark) {
      if (tema === "dark") {
        dark.classList.add("ativo");
        light.classList.remove("ativo");
      } else {
        light.classList.add("ativo");
        dark.classList.remove("ativo");
      }
    }

    if (alternar) {
      const escuroAtivo = tema === "dark";
      alternar.classList.toggle("ativo", escuroAtivo);
      alternar.setAttribute("aria-pressed", escuroAtivo ? "true" : "false");
      const rotulo = escuroAtivo ? "Tema escuro ativo. Alternar para tema claro" : "Tema claro ativo. Alternar para tema escuro";
      alternar.setAttribute("aria-label", rotulo);
      alternar.setAttribute("title", rotulo);
      alternar.textContent = escuroAtivo ? "Escuro" : "Claro";
    }
  }

  function alternarTema() {
    const atual = document.documentElement.getAttribute("data-tema");
    const proximo = atual === "escuro" ? "light" : "dark";
    localStorage.setItem(CHAVE_TEMA, proximo);
    aplicarTema(proximo);
  }

  function init() {
    const { light, dark, alternar } = resolverBotoes();

    if (light) {
      light.addEventListener("click", function () {
        localStorage.setItem(CHAVE_TEMA, "light");
        aplicarTema("light");
      });
    }
    if (dark) {
      dark.addEventListener("click", function () {
        localStorage.setItem(CHAVE_TEMA, "dark");
        aplicarTema("dark");
      });
    }
    if (alternar) {
      alternar.addEventListener("click", alternarTema);
    }

    const temaSalvo = localStorage.getItem(CHAVE_TEMA);
    aplicarTema(temaSalvo === "dark" ? "dark" : "light");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();