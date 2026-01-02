// Menu mobile
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("navMenu");
if (navToggle) {
  navToggle.addEventListener("click", () => nav.classList.toggle("open"));
}

// Carrossel de tipos de containers (Santiago)
const units = [
  {
    badge: "DRY",
    name: "Container Dry",
    desc: "Modelo padrão ISO mais utilizado. Ideal para armazenamento e transporte de cargas secas, equipamentos e materiais em geral.",
    img: "img/Dry.png",
    specs: [
      { k: "Tamanhos", v: "20’ / 40’" },
      { k: "Aplicação", v: "Cargas secas" },
      { k: "Uso", v: "Obras e indústrias" },
      { k: "Benefício", v: "Versátil e seguro" },
    ]
  },
  {
    badge: "REEFER",
    name: "Container Reefer",
    desc: "Container refrigerado com controle de temperatura, indicado para alimentos, bebidas e cargas sensíveis.",
    img: "img/Reefer.png",
    specs: [
      { k: "Tamanhos", v: "20’ / 40’" },
      { k: "Diferencial", v: "Refrigeração ativa" },
      { k: "Aplicação", v: "Perecíveis" },
      { k: "Uso", v: "Câmara fria móvel" },
    ]
  },
  {
    badge: "OPEN TOP",
    name: "Container Open Top",
    desc: "Indicado para cargas com altura excedente ou carregamento superior por guindaste.",
    img: "img/OpenTop.png",   // <-- SEM ESPAÇO
    specs: [
      { k: "Tamanhos", v: "20’ / 40’" },
      { k: "Acesso", v: "Carregamento superior" },
      { k: "Aplicação", v: "Cargas altas" },
      { k: "Uso", v: "Indústria pesada" },
    ]
  },
  {
    badge: "FLAT RACK",
    name: "Container Flat Rack",
    desc: "Para cargas de grandes dimensões, máquinas e equipamentos especiais.",
    img: "img/FlatRack.png",
    specs: [
      { k: "Tamanhos", v: "20’ / 40’" },
      { k: "Estrutura", v: "Laterais abertas" },
      { k: "Aplicação", v: "Carga oversized" },
      { k: "Uso", v: "Projetos especiais" },
    ]
  }
];


let idx = 0;

const unitBadge = document.getElementById("unitBadge");
const unitName = document.getElementById("unitName");
const unitDesc = document.getElementById("unitDesc");
const unitImage = document.getElementById("unitImage");
const unitSpecs = document.getElementById("unitSpecs");

const prevBtn = document.getElementById("unitsPrev");
const nextBtn = document.getElementById("unitsNext");
const dotsEl = document.getElementById("unitsDots");

function renderDots() {
  dotsEl.innerHTML = "";
  units.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (i === idx ? " active" : "");
    d.setAttribute("aria-label", `Ir para ${i + 1}`);
    d.addEventListener("click", () => { idx = i; renderUnit(); });
    dotsEl.appendChild(d);
  });
}

function renderUnit() {
  const u = units[idx];
  unitBadge.textContent = u.badge;
  unitName.textContent = u.name;
  unitDesc.textContent = u.desc;
  unitImage.src = u.img;

  unitSpecs.innerHTML = u.specs.map(s => `
    <div class="spec">
      <strong>${s.k}</strong>
      <span>${s.v}</span>
    </div>
  `).join("");

  renderDots();
}

function nextUnit() {
  idx = (idx + 1) % units.length;
  renderUnit();
}
function prevUnit() {
  idx = (idx - 1 + units.length) % units.length;
  renderUnit();
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", prevUnit);
  nextBtn.addEventListener("click", nextUnit);
}

// Swipe no mobile
let startX = 0;
const card = document.querySelector(".units-card");
if (card) {
  card.addEventListener("touchstart", (e) => startX = e.touches[0].clientX, { passive: true });
  card.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 45) diff < 0 ? nextUnit() : prevUnit();
  });
}

renderUnit();

// Form fake submit
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formMsg.textContent = "Solicitação enviada! Em breve a equipe da Santiago entrará em contato.";
    contactForm.reset();
  });
}
