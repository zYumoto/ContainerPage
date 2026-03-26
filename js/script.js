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
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
const heroDots = document.getElementById("heroDots");
let heroIndex = 0;
let heroTimer;

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
      restartHeroTimer();
    });
    heroDots.appendChild(dot);
  });
}

function renderHero() {
  heroSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === heroIndex);
  });
  renderHeroDots();
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
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(nextHero, 6500);
}

if (heroSlides.length > 0) {
  heroPrev?.addEventListener("click", () => {
    prevHero();
    restartHeroTimer();
  });

  heroNext?.addEventListener("click", () => {
    nextHero();
    restartHeroTimer();
  });

  renderHero();
  restartHeroTimer();
}

const units = [
  {
    badge: "Dry",
    name: "Container Dry",
    desc: "Modelo ISO mais usado para armazenamento e transporte de cargas secas, materiais de obra e apoio operacional.",
    img: "img/Dry.png",
    specs: [
      { k: "Tamanhos", v: "20' / 40'" },
      { k: "Aplicação", v: "Cargas secas" },
      { k: "Uso", v: "Obras e indústrias" },
      { k: "Destaque", v: "Versátil e seguro" },
    ],
  },
  {
    badge: "Reefer",
    name: "Container Reefer",
    desc: "Container refrigerado para alimentos, bebidas e cargas sensíveis que exigem controle de temperatura.",
    img: "img/Reefer.png",
    specs: [
      { k: "Tamanhos", v: "20' / 40'" },
      { k: "Diferencial", v: "Refrigeração ativa" },
      { k: "Aplicação", v: "Perecíveis" },
      { k: "Uso", v: "Câmara fria móvel" },
    ],
  },
  {
    badge: "Open Top",
    name: "Container Open Top",
    desc: "Estrutura indicada para cargas altas ou carregamento superior com ponte rolante, guindaste ou içamento técnico.",
    img: "img/OpenTop.png",
    specs: [
      { k: "Tamanhos", v: "20' / 40'" },
      { k: "Acesso", v: "Abertura superior" },
      { k: "Aplicação", v: "Carga excedente" },
      { k: "Uso", v: "Projetos industriais" },
    ],
  },
  {
    badge: "Flat Rack",
    name: "Container Flat Rack",
    desc: "Ideal para máquinas, equipamentos e cargas com grandes dimensões que exigem estrutura aberta e reforçada.",
    img: "img/FlatRack.png",
    specs: [
      { k: "Tamanhos", v: "20' / 40'" },
      { k: "Estrutura", v: "Laterais abertas" },
      { k: "Aplicação", v: "Carga especial" },
      { k: "Uso", v: "Operação pesada" },
    ],
  },
];

let unitIndex = 0;

const unitBadge = document.getElementById("unitBadge");
const unitName = document.getElementById("unitName");
const unitDesc = document.getElementById("unitDesc");
const unitImage = document.getElementById("unitImage");
const unitSpecs = document.getElementById("unitSpecs");
const prevBtn = document.getElementById("unitsPrev");
const nextBtn = document.getElementById("unitsNext");
const dotsEl = document.getElementById("unitsDots");

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
  if (!unitBadge || !unitName || !unitDesc || !unitImage || !unitSpecs) return;

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

const card = document.querySelector(".units-card");
let startX = 0;

if (card) {
  card.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0].clientX;
    },
    { passive: true }
  );

  card.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 45) {
      if (diff < 0) nextUnit();
      else prevUnit();
    }
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
      "Olá! Vim pelo site da Santiago e quero solicitar atendimento.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone || "Não informado"}`,
      `Assunto: ${subject || "Não informado"}`,
      `Mensagem: ${message || "Não informada"}`,
    ].join("\n");

    const waUrl = `https://wa.me/5513991314352?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank", "noopener");

    formMsg.textContent = "Abrindo o WhatsApp com a mensagem preenchida.";
  });
}
