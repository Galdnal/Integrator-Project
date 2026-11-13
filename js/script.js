var botaoTopo = document.getElementById("back-to-top");

if (botaoTopo) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      botaoTopo.classList.add("visible");
    } else {
      botaoTopo.classList.remove("visible");
    }
  });

  botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

var nav = document.querySelector("header nav");
var lista = document.querySelector("header nav ul");

if (nav && lista) {
  var botaoMenu = document.createElement("button");
  botaoMenu.className = "menu-toggle";
  botaoMenu.textContent = "☰";
  botaoMenu.setAttribute("aria-label", "Abrir menu");
  nav.prepend(botaoMenu);

  botaoMenu.addEventListener("click", function () {
    lista.classList.toggle("aberto");
  });
}

var pins = document.querySelectorAll("[data-map-link]");
var titulo = document.querySelector("[data-map-title]");
var descricao = document.querySelector("[data-map-description]");
var simbolo = document.querySelector("[data-map-symbol]");
var botaoExplorar = document.querySelector(".map-cta");

function selecionar(pin) {
  titulo.textContent = pin.dataset.title;
  descricao.textContent = pin.dataset.description;
  simbolo.textContent = pin.dataset.symbol;
  botaoExplorar.href = pin.dataset.href;
}

if (titulo && pins.length > 0) {
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener("mouseenter", function () {
      selecionar(this);
    });
    pins[i].addEventListener("click", function (evento) {
      evento.preventDefault();
      selecionar(this);
    });
  }
  selecionar(pins[0]);
}

var botoesEra = document.querySelectorAll(".era-controls > button");
var cardsEra = document.querySelectorAll(".era-card");

for (var j = 0; j < botoesEra.length; j++) {
  botoesEra[j].addEventListener("click", function () {
    var era = this.dataset.era;

    for (var k = 0; k < botoesEra.length; k++) {
      botoesEra[k].classList.remove("ativo");
    }
    this.classList.add("ativo");

    for (var m = 0; m < cardsEra.length; m++) {
      cardsEra[m].hidden = era !== "todos" && cardsEra[m].dataset.era !== era;
    }
  });
}
