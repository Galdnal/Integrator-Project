(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    const toggle = () => btn.classList.toggle("visible", window.scrollY > 420);
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  function initScrollReveal() {
    const elements = document.querySelectorAll([
      ".overview", ".linha-amarela", ".card", ".gen", ".grid-deuses", ".urano",
      ".texto", ".texto-amarelo", ".card-mitology-base", ".card--religion-practice",
      ".card--connection", ".card--comparison", ".timeline-container", ".section-title",
      ".cards", ".civilizacao", ".intro-bloco", ".secao-titulo", ".grid-religioes",
      ".bloco-curiosidades", ".map-panel", ".map-info", ".era-card"
    ].join(", "));

    if (!elements.length) return;

    const reveal = el => el.style.animationPlayState = "running";

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    elements.forEach(el => observer.observe(el));
  }

  function initHeader() {
    const header = document.querySelector("header");
    const nav = header?.querySelector("nav");
    const list = header?.querySelector("ul");
    if (!header || !nav || !list) return;

    let toggle = nav.querySelector(".menu-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.className = "menu-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", "site-navigation");
      toggle.setAttribute("aria-label", "Abrir menu");
      toggle.innerHTML = "☰";
      nav.prepend(toggle);
    }
    list.id = "site-navigation";

    const closeMenu = () => {
      list.classList.remove("aberto");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      toggle.innerHTML = "☰";
    };

    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("aberto");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      toggle.innerHTML = open ? "×" : "☰";
    });

    list.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

    const onScroll = () => header.classList.toggle("rolando", window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initRegionHighlight() {
    const key = new URLSearchParams(window.location.search).get("local");
    if (!key) return;

    const targets = document.querySelectorAll("[data-region]");
    const target = [...targets].find(el => el.dataset.region === key);
    if (!target) return;

    target.classList.add("region-highlight");
    target.setAttribute("tabindex", "-1");

    window.setTimeout(() => target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center"
    }), 180);

    window.setTimeout(() => target.classList.remove("region-highlight"), 4200);
  }

  function initMap() {
    const map = document.querySelector("[data-world-map]");
    if (!map) return;

    const buttons = map.querySelectorAll("[data-map-link]");
    const panel = document.querySelector("[data-map-panel]");
    const title = panel?.querySelector("[data-map-title]");
    const description = panel?.querySelector("[data-map-description]");
    const symbol = panel?.querySelector("[data-map-symbol]");

    const select = button => {
      buttons.forEach(item => item.classList.remove("selecionado"));
      button.classList.add("selecionado");
      if (title) title.textContent = button.dataset.title || "";
      if (description) description.textContent = button.dataset.description || "";
      if (symbol) symbol.textContent = button.dataset.symbol || "✦";
    };

    buttons.forEach(button => {
      button.addEventListener("mouseenter", () => select(button));
      button.addEventListener("focus", () => select(button));
      button.addEventListener("click", () => {
        select(button);
        window.setTimeout(() => { window.location.href = button.dataset.href; }, 90);
      });
    });

    if (buttons[0]) select(buttons[0]);
  }

  function initTimeline() {
    const timeline = document.querySelector("[data-timeline]");
    if (!timeline) return;

    const buttons = timeline.querySelectorAll("[data-era]");
    const cards = timeline.querySelectorAll(".era-card");
    const filter = era => {
      buttons.forEach(button => button.classList.toggle("ativo", button.dataset.era === era));
      cards.forEach(card => {
        const match = era === "todos" || card.dataset.era === era;
        card.hidden = !match;
      });
    };

    buttons.forEach(button => button.addEventListener("click", () => filter(button.dataset.era)));
    filter("todos");
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBackToTop();
    initScrollReveal();
    initHeader();
    initRegionHighlight();
    initMap();
    initTimeline();
  });
})();