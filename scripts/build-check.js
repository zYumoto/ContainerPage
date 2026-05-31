const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "public");

const requiredFiles = [
  "index.html",
  "css/style.css",
  "js/script.js",
  "img/logo-white.png",
  "img/logo-black.png",
];

for (const relativePath of requiredFiles) {
  const fullPath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Arquivo obrigatorio ausente: ${relativePath}`);
  }
}

const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const css = fs.readFileSync(path.join(projectRoot, "css/style.css"), "utf8");
const script = fs.readFileSync(path.join(projectRoot, "js/script.js"), "utf8");

const htmlChecks = [
  "Administrativo@santiago.log.br",
  "www.santiagolocacao.com.br",
  'id="unitName"',
  'id="unitsDots"',
];

const cssChecks = [
  ".units-card",
  ".units-body",
  ".brand-logo",
];

const scriptChecks = [
  "Container Escrit",
  "Container High Cube 40'",
  "createQuoteUrl",
  "renderUnitDots",
];

for (const token of htmlChecks) {
  if (!html.includes(token)) {
    throw new Error(`Trecho esperado nao encontrado no HTML: ${token}`);
  }
}

for (const token of cssChecks) {
  if (!css.includes(token)) {
    throw new Error(`Trecho esperado nao encontrado no CSS: ${token}`);
  }
}

for (const token of scriptChecks) {
  if (!script.includes(token)) {
    throw new Error(`Trecho esperado nao encontrado no JS: ${token}`);
  }
}

new Function(script);

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

function copyToOutput(relativePath) {
  const sourcePath = path.join(projectRoot, relativePath);
  const destinationPath = path.join(outputDir, relativePath);
  const stats = fs.statSync(sourcePath);

  if (stats.isDirectory()) {
    fs.mkdirSync(destinationPath, { recursive: true });

    for (const entry of fs.readdirSync(sourcePath)) {
      copyToOutput(path.join(relativePath, entry));
    }
    return;
  }

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

copyToOutput("index.html");
copyToOutput("css");
copyToOutput("js");
copyToOutput("img");

console.log("Build check concluido com sucesso.");
console.log(`Output gerado em: ${outputDir}`);
