const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("navMenu");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const header = document.querySelector(".header");
    const headerOffset = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset - 8;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });

    if (nav?.classList.contains("open")) {
      nav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const hero = document.querySelector(".hero");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
const heroDots = document.getElementById("heroDots");
const heroImageDelay = 15000;
let heroIndex = 0;
let heroTimer;
let heroTouchStartX = 0;
let heroTouchStartY = 0;

function renderHeroDots() {
  if (!heroDots) return;

  heroDots.innerHTML = "";
  heroSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `dot${index === heroIndex ? " active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para o slide ${index + 1}`);
    dot.addEventListener("click", () => {
      heroIndex = index;
      renderHero();
    });
    heroDots.appendChild(dot);
  });
}

function renderHero() {
  heroSlides.forEach((slide, index) => {
    const isActive = index === heroIndex;
    const video = slide.querySelector("video");

    slide.classList.toggle("is-active", isActive);

    if (!video) return;

    video.onended = null;

    if (isActive) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      return;
    }

    video.pause();
    video.currentTime = 0;
  });

  renderHeroDots();
  restartHeroTimer();
}

function nextHero() {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  renderHero();
}

function prevHero() {
  heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
  renderHero();
}

function restartHeroTimer() {
  window.clearTimeout(heroTimer);

  const activeSlide = heroSlides[heroIndex];
  if (!activeSlide) return;

  const activeVideo = activeSlide.querySelector("video");
  if (activeVideo) {
    activeVideo.onended = () => {
      nextHero();
    };
    return;
  }

  heroTimer = window.setTimeout(nextHero, heroImageDelay);
}

if (heroSlides.length > 0) {
  heroPrev?.addEventListener("click", prevHero);
  heroNext?.addEventListener("click", nextHero);

  hero?.addEventListener(
    "touchstart",
    (event) => {
      heroTouchStartX = event.touches[0].clientX;
      heroTouchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  hero?.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const diffX = endX - heroTouchStartX;
    const diffY = endY - heroTouchStartY;

    if (Math.abs(diffX) < 45 || Math.abs(diffX) <= Math.abs(diffY)) return;

    if (diffX < 0) nextHero();
    else prevHero();
  });

  renderHero();
}

const allUnits = [
  {
    badge: "Apoio operacional",
    name: "Container Escrit\u00f3rio",
    desc: "Espa\u00e7o administrativo tempor\u00e1rio para obras, portarias e frentes operacionais.",
    img: "img/Escritorio.png",
    specs: [
      { k: "Tamanhos", v: "20' / Modular" },
      { k: "Estrutura", v: "Adaptado" },
      { k: "Aplica\u00e7\u00e3o", v: "Administra\u00e7\u00e3o" },
      { k: "Uso", v: "Obras e apoio" },
    ],
  },
  {
    badge: "Apoio operacional",
    name: "Container Vesti\u00e1rio",
    desc: "Estrutura funcional para troca de uniforme e organiza\u00e7\u00e3o da equipe no canteiro.",
    img: "img/Vestiario.png",
    specs: [
      { k: "Tamanhos", v: "20' / Modular" },
      { k: "Estrutura", v: "Adaptado" },
      { k: "Aplica\u00e7\u00e3o", v: "Equipe operacional" },
      { k: "Uso", v: "Apoio em obra" },
    ],
  },
  {
    badge: "Apoio operacional",
    name: "Container Sanit\u00e1rio",
    desc: "Solu\u00e7\u00e3o pr\u00e1tica para banheiros em obras, eventos e opera\u00e7\u00f5es remotas.",
    specs: [
      { k: "Tamanhos", v: "20' / Modular" },
      { k: "Estrutura", v: "Hidrossanit\u00e1rio" },
      { k: "Aplica\u00e7\u00e3o", v: "Obras e eventos" },
      { k: "Uso", v: "Banheiro modular" },
    ],
  },
  {
    badge: "Apoio operacional",
    name: "Container Refeit\u00f3rio",
    desc: "Ambiente preparado para refei\u00e7\u00f5es com conforto e apoio di\u00e1rio \u00e0 equipe.",
    specs: [
      { k: "Tamanhos", v: "20' / Modular" },
      { k: "Estrutura", v: "Adaptado" },
      { k: "Aplica\u00e7\u00e3o", v: "Viv\u00eancia" },
      { k: "Uso", v: "Refei\u00e7\u00f5es" },
    ],
  },
  {
    badge: "Apoio operacional",
    name: "Container Almoxarifado",
    desc: "Armazenamento seguro para ferramentas, EPIs e materiais de uso frequente.",
    specs: [
      { k: "Tamanhos", v: "20' / 40'" },
      { k: "Estrutura", v: "Fechado" },
      { k: "Aplica\u00e7\u00e3o", v: "Materiais e EPIs" },
      { k: "Uso", v: "Estoque seguro" },
    ],
  },
  {
    badge: "Projeto especial",
    name: "Container Modular / Projeto Especial",
    desc: "Configura\u00e7\u00f5es sob medida para layouts personalizados e opera\u00e7\u00f5es espec\u00edficas.",
    img: "img/Projeto especial.png",
    specs: [
      { k: "Tamanhos", v: "Sob medida" },
      { k: "Estrutura", v: "Personalizada" },
      { k: "Aplica\u00e7\u00e3o", v: "Projetos especiais" },
      { k: "Uso", v: "Opera\u00e7\u00e3o dedicada" },
    ],
  },
  {
    badge: "Mar\u00edtimo",
    name: "Container Dry 20'",
    desc: "Modelo compacto e vers\u00e1til para armazenamento e transporte de cargas secas.",
    img: "img/Dry.png",
    specs: [
      { k: "Tamanhos", v: "20'" },
      { k: "Estrutura", v: "Fechado" },
      { k: "Aplica\u00e7\u00e3o", v: "Carga seca" },
      { k: "Uso", v: "Armazenagem" },
    ],
  },
  {
    badge: "Mar\u00edtimo",
    name: "Container Dry 40'",
    desc: "Maior capacidade interna para estoque, apoio log\u00edstico e opera\u00e7\u00f5es industriais.",
    img: "img/Dry.png",
    specs: [
      { k: "Tamanhos", v: "40'" },
      { k: "Estrutura", v: "Fechado" },
      { k: "Aplica\u00e7\u00e3o", v: "Carga seca" },
      { k: "Uso", v: "Maior capacidade" },
    ],
  },
  {
    badge: "Mar\u00edtimo",
    name: "Container High Cube 40'",
    desc: "Vers\u00e3o com p\u00e9-direito ampliado para cargas volumosas e adapta\u00e7\u00f5es especiais.",
    img: "img/Dry.png",
    specs: [
      { k: "Tamanhos", v: "40' HC" },
      { k: "Estrutura", v: "Maior altura" },
      { k: "Aplica\u00e7\u00e3o", v: "Carga volumosa" },
      { k: "Uso", v: "Estoque e adapta\u00e7\u00e3o" },
    ],
  },
  {
    badge: "Refrigerado",
    name: "Container Reefer",
    desc: "Container refrigerado para produtos que exigem controle de temperatura.",
    img: "img/Reefer.png",
    specs: [
      { k: "Tamanhos", v: "20' / 40'" },
      { k: "Estrutura", v: "Refrigera\u00e7\u00e3o ativa" },
      { k: "Aplica\u00e7\u00e3o", v: "Perec\u00edveis" },
      { k: "Uso", v: "C\u00e2mara fria" },
    ],
  },
  {
    badge: "Carga especial",
    name: "Container Open Top",
    desc: "Indicado para cargas altas ou i\u00e7amento superior com mais flexibilidade operacional.",
    img: "img/OpenTop.png",
    specs: [
      { k: "Tamanhos", v: "20' / 40'" },
      { k: "Estrutura", v: "Abertura superior" },
      { k: "Aplica\u00e7\u00e3o", v: "Carga excedente" },
      { k: "Uso", v: "I\u00e7amento t\u00e9cnico" },
    ],
  },
  {
    badge: "Carga especial",
    name: "Container Flat Rack",
    desc: "Estrutura aberta e refor\u00e7ada para m\u00e1quinas, equipamentos e cargas de grande porte.",
    img: "img/FlatRack.png",
    specs: [
      { k: "Tamanhos", v: "20' / 40'" },
      { k: "Estrutura", v: "Laterais abertas" },
      { k: "Aplica\u00e7\u00e3o", v: "Carga especial" },
      { k: "Uso", v: "Opera\u00e7\u00e3o pesada" },
    ],
  },
];

const units = allUnits.filter((unit) => Boolean(unit.img));

let unitIndex = 0;

const unitBadge = document.getElementById("unitBadge");
const unitName = document.getElementById("unitName");
const unitDesc = document.getElementById("unitDesc");
const unitImage = document.getElementById("unitImage");
const unitSpecs = document.getElementById("unitSpecs");
const unitAvailability = document.getElementById("unitAvailability");
const unitQuote = document.getElementById("unitQuote");
const prevBtn = document.getElementById("unitsPrev");
const nextBtn = document.getElementById("unitsNext");
const dotsEl = document.getElementById("unitsDots");
const unitsCard = document.querySelector(".units-card");

function createQuoteUrl(unitName) {
  const message = `Ol\u00e1, gostaria de solicitar uma cota\u00e7\u00e3o para ${unitName}.`;
  return `https://wa.me/5513996741950?text=${encodeURIComponent(message)}`;
}

function createAvailabilityUrl(unitName) {
  const message = `Ol\u00e1, quero verificar a disponibilidade do ${unitName}.`;
  return `https://wa.me/5513996741950?text=${encodeURIComponent(message)}`;
}

function renderUnitDots() {
  if (!dotsEl) return;

  dotsEl.innerHTML = "";
  units.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `dot${index === unitIndex ? " active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para o container ${index + 1}`);
    dot.addEventListener("click", () => {
      unitIndex = index;
      renderUnit();
    });
    dotsEl.appendChild(dot);
  });
}

function renderUnit() {
  const unit = units[unitIndex];
  if (!unit || !unitBadge || !unitName || !unitDesc || !unitImage || !unitSpecs) return;

  unitBadge.textContent = unit.badge;
  unitName.textContent = unit.name;
  unitDesc.textContent = unit.desc;
  unitImage.src = unit.img;
  unitImage.alt = unit.name;
  unitSpecs.innerHTML = unit.specs
    .map(
      (spec) => `
        <div class="spec">
          <strong>${spec.k}</strong>
          <span>${spec.v}</span>
        </div>
      `
    )
    .join("");

  if (unitAvailability) {
    unitAvailability.href = createAvailabilityUrl(unit.name);
  }

  if (unitQuote) {
    unitQuote.href = createQuoteUrl(unit.name);
  }

  renderUnitDots();
}

function nextUnit() {
  unitIndex = (unitIndex + 1) % units.length;
  renderUnit();
}

function prevUnit() {
  unitIndex = (unitIndex - 1 + units.length) % units.length;
  renderUnit();
}

prevBtn?.addEventListener("click", prevUnit);
nextBtn?.addEventListener("click", nextUnit);

let unitTouchStartX = 0;

if (unitsCard) {
  unitsCard.addEventListener(
    "touchstart",
    (event) => {
      unitTouchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  unitsCard.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const diffX = endX - unitTouchStartX;

    if (Math.abs(diffX) < 45) return;

    if (diffX < 0) nextUnit();
    else prevUnit();
  });
}

renderUnit();

const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

if (contactForm && formMsg) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.elements.namedItem("name")?.value.trim() || "";
    const email = contactForm.elements.namedItem("email")?.value.trim() || "";
    const phone = contactForm.elements.namedItem("phone")?.value.trim() || "";
    const subject = contactForm.elements.namedItem("subject")?.value.trim() || "";
    const message = contactForm.elements.namedItem("message")?.value.trim() || "";

    const waMessage = [
      "Ol\u00e1! Vim pelo site da Santiago e quero solicitar atendimento.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone || "N\u00e3o informado"}`,
      `Assunto: ${subject || "N\u00e3o informado"}`,
      `Mensagem: ${message || "N\u00e3o informada"}`,
    ].join("\n");

    const waUrl = `https://wa.me/5513996741950?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank", "noopener");

    formMsg.textContent = "Abrindo o WhatsApp com a mensagem preenchida.";
  });
}
