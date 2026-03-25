// Menu mobile
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("navMenu");
if (navToggle) {
  navToggle.addEventListener("click", () => nav.classList.toggle("open"));
}

// Scroll suave para links internos, com compensação do header sticky.
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const header = document.querySelector(".header");
    const headerOffset = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset - 12;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });

    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
  });
});

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

// Formulario envia os dados preenchidos para o WhatsApp
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.elements.namedItem("name")?.value.trim() || "";
    const email = contactForm.elements.namedItem("email")?.value.trim() || "";
    const phone = contactForm.elements.namedItem("phone")?.value.trim() || "";
    const subject = contactForm.elements.namedItem("subject")?.value.trim() || "";
    const message = contactForm.elements.namedItem("message")?.value.trim() || "";

    const waMessage = [
      "Ola! Vim pelo site da Santiago e quero solicitar um atendimento.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone || "Nao informado"}`,
      `Assunto: ${subject || "Nao informado"}`,
      `Mensagem: ${message || "Nao informada"}`
    ].join("\n");

    const waUrl = `https://wa.me/5513991314352?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank", "noopener");

    formMsg.textContent = "Abrindo o WhatsApp com os dados preenchidos.";
  });
}
