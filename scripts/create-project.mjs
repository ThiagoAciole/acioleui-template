#!/usr/bin/env node

import { execSync } from "child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs";
import { basename, dirname, join, resolve } from "path";
import { createInterface } from "readline";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = resolve(__dirname, "..");

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const GREEN = "\x1b[32m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";

function log(msg) {
  console.log(msg);
}
function success(msg) {
  log(`${GREEN}✔${RESET} ${msg}`);
}
function warn(msg) {
  log(`${YELLOW}⚠${RESET} ${msg}`);
}
function error(msg) {
  log(`${RED}✖${RESET} ${msg}`);
}
function step(msg) {
  log(`\n${BOLD}${msg}${RESET}`);
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toTitleCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );
}

function toPascalCase(str) {
  return toTitleCase(str).replace(/\s+/g, "");
}

function isValidName(name) {
  return name === "." || /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(name);
}

const IGNORE = [
  "node_modules",
  ".git",
  "dist",
  "dist-ssr",
  ".turbo",
  "scripts",
  "package-lock.json",
  ".gemini",
];

function copyTemplate(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src);
  for (const entry of entries) {
    if (IGNORE.includes(entry) || entry === basename(dest)) continue;
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    cpSync(srcPath, destPath, {
      recursive: true,
      filter: (source) => {
        const rel = source
          .replace(src, "")
          .replace(/\\/g, "/")
          .replace(/^\//, "");
        return !IGNORE.some(
          (ignored) => rel === ignored || rel.startsWith(ignored + "/")
        );
      },
    });
  }
}

function replaceInFile(filePath, replacements) {
  if (!existsSync(filePath)) return;
  let content = readFileSync(filePath, "utf-8");
  for (const [from, to] of replacements) {
    content = content.replaceAll(from, to);
  }
  writeFileSync(filePath, content, "utf-8");
}

function prompt(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  log(`\n${BOLD}${CYAN}╔══════════════════════════════════════╗${RESET}`);
  log(`${BOLD}${CYAN}║      AcioleUI React Project Creator     ║${RESET}`);
  log(`${BOLD}${CYAN}╚══════════════════════════════════════╝${RESET}\n`);

  const cliArgs = process.argv.slice(2).filter((arg) => arg !== "--");
  const cliProjectName = cliArgs.find((arg) => !arg.startsWith("-"));
  const shouldInstallFromCli = cliArgs.includes("--install");
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  // 1. Pergunta o nome do projeto
  let projectName = "";
  if (cliProjectName) {
    projectName = cliProjectName === "." ? "." : toKebabCase(cliProjectName);
  }

  while (!projectName) {
    const raw = await prompt(rl, `${BOLD}Nome do projeto:${RESET} `);
    const trimmed = raw.trim();
    const name = trimmed === "." ? "." : toKebabCase(trimmed);

    if (!name) {
      error("Nome não pode ser vazio.");
      continue;
    }
    if (!isValidName(name)) {
      error(
        `Nome inválido: "${name}". Use apenas letras minúsculas, números e hífens.`
      );
      continue;
    }
    projectName = name;
  }

  // 2. Pergunta se quer instalar as dependências
  const installAnswer = shouldInstallFromCli
    ? "s"
    : await prompt(
        rl,
        `${BOLD}Instalar dependências com npm install? ${DIM}(s/N)${RESET} `
      );
  const shouldInstall = installAnswer.trim().toLowerCase() === "s";

  rl.close();

  const isCurrentDir = projectName === ".";
  const destDir = isCurrentDir
    ? process.cwd()
    : resolve(process.cwd(), projectName);
  const folderName = isCurrentDir
    ? toKebabCase(basename(process.cwd()))
    : projectName;
  const titleName = toTitleCase(folderName);

  if (existsSync(destDir)) {
    if (!isCurrentDir) {
      error(`O diretório já existe: ${destDir}`);
      process.exit(1);
    }
    const existingFiles = readdirSync(destDir).filter(
      (file) => !file.startsWith(".") && file !== "node_modules"
    );
    if (existingFiles.length > 0) {
      error("O diretório atual não está vazio.");
      process.exit(1);
    }
  }

  log("");

  // Copy template
  step("Copiando template...");
  try {
    copyTemplate(TEMPLATE_DIR, destDir);
    success("Arquivos copiados.");
  } catch (err) {
    error(`Falha ao copiar: ${err.message}`);
    process.exit(1);
  }

  // Handle .gitignore from _gitignore
  const templateGitignore = join(destDir, "_gitignore");
  const targetGitignore = join(destDir, ".gitignore");
  if (existsSync(templateGitignore)) {
    if (!existsSync(targetGitignore)) {
      cpSync(templateGitignore, targetGitignore);
    }
    rmSync(templateGitignore, { force: true });
  }

  // Update package.json
  step("Configurando package.json...");
  const pkgPath = join(destDir, "package.json");
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    pkg.name = folderName;
    pkg.version = "0.1.0";
    pkg.description = `${titleName} - Aplicação criada com AcioleUI`;
    delete pkg.bin;
    delete pkg.files;
    delete pkg.repository;
    if (pkg.scripts) {
      delete pkg.scripts.create;
    }
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
    success("package.json atualizado.");
  }

  // Update index.html
  step("Personalizando index.html...");
  replaceInFile(join(destDir, "index.html"), [
    ["<title>Template Web</title>", `<title>${titleName}</title>`],
    ["Template Web", titleName],
  ]);
  success("index.html atualizado.");

  // Update src/pages/Home/index.tsx
  step("Personalizando páginas...");
  replaceInFile(join(destDir, "src", "pages", "Home", "index.tsx"), [
    ['title="Template"', `title="${titleName}"`],
    [
      'description="Template pronto para uso com o design system acioleui."',
      `description="${titleName} pronto para uso com o design system acioleui."`,
    ],
  ]);
  success("Home page atualizada.");

  // Update src/components/Sidebar/index.tsx
  step("Personalizando componentes de navegação...");
  replaceInFile(join(destDir, "src", "components", "Sidebar", "index.tsx"), [
    [">Template<", `>${titleName}<`],
    ["\n          Template\n", `\n          ${titleName}\n`],
    ["Template", titleName],
  ]);
  success("Sidebar atualizada.");

  // Update AGENTS.md
  if (existsSync(join(TEMPLATE_DIR, "AGENTS.md"))) {
    cpSync(join(TEMPLATE_DIR, "AGENTS.md"), join(destDir, "AGENTS.md"));
    replaceInFile(join(destDir, "AGENTS.md"), [
      ["# Projeto criado com AcioleUI", `# ${titleName} (AcioleUI)`],
    ]);
  }

  // Remove .git and package-lock.json from copied project
  step("Limpando arquivos do template...");
  const gitDir = join(destDir, ".git");
  if (existsSync(gitDir) && !isCurrentDir) {
    rmSync(gitDir, { recursive: true, force: true });
  }
  const lockFile = join(destDir, "package-lock.json");
  if (existsSync(lockFile)) {
    rmSync(lockFile, { force: true });
  }
  success("Arquivos do template removidos.");

  // Generate simple README
  step("Gerando README.md...");
  const readme = `# ${titleName}

Projeto React criado com AcioleUI.

## Tecnologias

- React 19
- TypeScript
- Vite
- AcioleUI Components
- React Router

## Scripts

\`\`\`bash
npm start            # inicia o servidor de desenvolvimento
npm run build        # build de produção
npm run preview      # preview do build
npm run lint         # verifica o código com ESLint
npm run lint:fix     # corrige automaticamente problemas com ESLint
npm run format       # formata o código com Prettier
npm run format:check # verifica a formatação
\`\`\`
`;
  writeFileSync(join(destDir, "README.md"), readme, "utf-8");
  success("README.md gerado.");

  // Install dependencies (opcional)
  if (shouldInstall) {
    step("Instalando dependências...");
    try {
      execSync("npm install", { cwd: destDir, stdio: "inherit" });
      success("Dependências instaladas.");
    } catch {
      warn("npm install falhou. Execute manualmente no diretório do projeto.");
    }
  }

  // Done
  log(`\n${GREEN}${BOLD}╔══════════════════════════════════════╗${RESET}`);
  log(`${GREEN}${BOLD}║   ✔  Projeto criado com sucesso!     ║${RESET}`);
  log(`${GREEN}${BOLD}╚══════════════════════════════════════╝${RESET}\n`);

  if (!isCurrentDir) {
    log(`  ${DIM}Acesse o diretório do projeto:${RESET}`);
    log(`    ${CYAN}${BOLD}cd ${projectName}${RESET}\n`);
  }

  if (!shouldInstall) {
    log(`  ${DIM}Instale as dependências:${RESET}`);
    log(`    ${CYAN}${BOLD}npm install${RESET}\n`);
  }

  log(`  ${DIM}Inicie o servidor de desenvolvimento:${RESET}`);
  log(`    ${CYAN}${BOLD}npm start${RESET}\n`);
}

main().catch((err) => {
  error(err.message);
  process.exit(1);
});
