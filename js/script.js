// Menu mobile
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");
if (navToggle) {
  navToggle.addEventListener("click", () => nav.classList.toggle("open"));
}

// Unidades (carrossel)
const units = [
  {
    badge: "DRY",
    name: "Container Dry",
    desc: "Modelo padrão ISO mais utilizado. Ideal para cargas secas, armazenamento e operações gerais.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    specs: [
      { k: "Tamanhos", v: "20’ / 40’" },
      { k: "Aplicação", v: "Cargas secas" },
      { k: "Estrutura", v: "Aço corten" },
      { k: "Uso", v: "Armazenagem / Logística" },
    ]
  },
  {
    badge: "REEFER",
    name: "Container Reefer",
    desc: "Container refrigerado com controle de temperatura para cargas sensíveis e perecíveis.",
    img: "https://images.unsplash.com/photo-1592833159155-7b6f71b4e2d2?q=80&w=1200&auto=format&fit=crop",
    specs: [
      { k: "Tamanhos", v: "20’ / 40’" },
      { k: "Temperatura", v: "Controlada" },
      { k: "Aplicação", v: "Perecíveis" },
      { k: "Uso", v: "Câmara fria móvel" },
    ]
  },
  {
    badge: "OPEN TOP",
    name: "Container Open Top",
    desc: "Para cargas com altura excedente e carregamento vertical (topo). Cobertura removível.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop",
    specs: [
      { k: "Tamanhos", v: "20’ / 40’" },
      { k: "Carga", v: "Altura excedente" },
      { k: "Acesso", v: "Superior" },
      { k: "Uso", v: "Indústria pesada" },
    ]
  },
  {
    badge: "HIGH CUBE",
    name: "Container High Cube",
    desc: "Versão com maior altura, oferecendo mais volume interno para cargas e armazenagem ampliada.",
    img: "https://images.unsplash.com/photo-1617957743094-8e53c1c8e62d?q=80&w=1200&auto=format&fit=crop",
    specs: [
      { k: "Altura", v: "Maior volume" },
      { k: "Tamanhos", v: "40’" },
      { k: "Aplicação", v: "Alta cubagem" },
      { k: "Uso", v: "Armazenagem ampliada" },
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
    d.addEventListener("click", () => {
      idx = i;
      renderUnit();
    });
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

renderUnit();

// Form fake submit
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formMsg.textContent = "Solicitação enviada! Em breve um especialista entrará em contato.";
    contactForm.reset();
  });
}
