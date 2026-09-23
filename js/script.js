/*
  script.js
  Compartilhado por todas as páginas. Duas funcionalidades:

  1. Botão "voltar ao topo" — aparece depois que a pessoa rola um pouco
     a página e leva de volta pro início ao clicar.

  2. Animações de entrada ao rolar — os elementos que já tinham uma
     animação de "entrada" (fade/slide) só acontecem quando entram na
     tela, em vez de todos de uma vez no carregamento da página. Assim
     o efeito é visto mesmo em conteúdo que está mais abaixo na página.

  Se o navegador não suportar IntersectionObserver, ou a pessoa tiver
  pedido "reduzir animações" no sistema, os elementos aparecem direto,
  sem esperar.
*/

(function () {
  "use strict";

  /* ---------- 1. Botão voltar ao topo ---------- */

  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const toggleVisibility = () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* ---------- 2. Revelar animações de entrada ao rolar ---------- */

  function initScrollReveal() {
    // Seletores dos elementos que já usam animação de entrada
    // (entrada / entradaCard) no CSS de alguma das páginas.
    // Banners (.banner, .banner img, .banner h1) ficam de fora de
    // propósito: eles devem animar assim que a página carrega, não
    // ao rolar, já que aparecem na primeira tela.
    const selectors = [
      ".overview",
      ".linha-amarela",
      ".card",
      ".gen",
      ".grid-deuses",
      ".urano",
      ".texto",
      ".texto-amarelo",
      ".card-mitology-base",
      ".card--religion-practice",
      ".card--connection",
      ".card--comparison",
      ".timeline-container",
      ".section-title",
      ".cards",
    ].join(", ");

    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealNow = () => {
      elements.forEach((el) => {
        el.style.animationPlayState = "running";
      });
    };

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      revealNow();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBackToTop();
    initScrollReveal();
  });
})();
/* Mantém a navbar disponível durante a rolagem. */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (!header) return;
  const toggleStickyHeader = () => {
    header.classList.toggle("rolando", window.scrollY > 50);
  };
  window.addEventListener("scroll", toggleStickyHeader, { passive: true });
  toggleStickyHeader();
});
