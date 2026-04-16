# 🎭 Manual Interativo de Playwright (Do Zero ao Essencial)

> Um guia **didático, prático e direto ao ponto** para você dominar os comandos básicos do Playwright começando pela instalação.

---

## 😎 O que você vai aprender

Neste manual você vai:

- Instalar o Playwright corretamente
- Criar o primeiro projeto de testes
- Rodar testes de várias formas
- Depurar cenários com interface e trace
- Gerar relatórios
- Usar utilitários úteis do CLI

---

## 📚 Guias Complementares

Aprimore seus conhecimentos técnicos com nossos guias focados em qualidade e lógica:

- [✨ Clean Code em JavaScript](./clean-code-javascript.md): Boas práticas para escrever código profissional e legível.

---

## 🧰 Pré-requisitos

Antes de começar, confirme:

- [ ] Node.js instalado (recomendado: versão LTS)
- [ ] npm disponível no terminal
- [ ] VS Code (opcional, mas super recomendado)

### 🔎 Verificação rápida

```bash
node -v
npm -v
```

Se ambos responderem com versão, tudo certo ✅

> 💡 Dica para Windows: se o PowerShell bloquear `npm`, use `npm.cmd`.

---

## 🚀 Instalação do Playwright

Você tem **2 caminhos**:

### 1) 🟢 Instalação guiada (recomendada para começar)

```bash
npm init playwright@latest
```

Esse comando cria tudo para você, incluindo:

- estrutura inicial de testes
- arquivo de configuração
- exemplos prontos
- opção de instalar navegadores

Durante o assistente, normalmente ele pergunta:

- linguagem (JS/TS)
- pasta de testes
- GitHub Actions (CI)
- instalação de navegadores

---

### 2) 🧩 Instalação manual (quando você quer controle total)

```bash
npm init -y
npm i -D @playwright/test
npx playwright install
```

Em Linux/CI, pode ser útil instalar dependências de sistema:

```bash
npx playwright install-deps
```

---

## 🧪 Comandos básicos do Playwright (os mais usados no dia a dia)

> Aqui está seu “arsenal base”. Se você dominar esta seção, já tem 80% da rotina de automação.

### ▶️ Execução de testes

```bash
npx playwright test
```

Roda todos os testes.

```bash
npx playwright test tests/login.spec.ts
```

Roda apenas um arquivo.

```bash
npx playwright test -g "deve fazer login"
```

Roda apenas testes com nome que combine com o texto (`grep`).

```bash
npx playwright test --project=chromium
```

Roda em um projeto/browser específico definido no config.

```bash
npx playwright test --headed
```

Roda com navegador visível (modo “com tela”).

```bash
npx playwright test --workers=1
```

Roda em série (ótimo para debug e estabilidade em ambiente limitado).

```bash
npx playwright test --retries=2
```

Reexecuta testes falhos até 2 vezes.

---

### 🐞 Depuração e investigação

```bash
npx playwright test --debug
```

Abre modo de depuração interativo.

```bash
npx playwright test --ui
```

Abre o UI Mode com execução visual dos testes.

```bash
npx playwright test --trace on
```

Gera trace para análise detalhada das execuções.

```bash
npx playwright show-trace trace.zip
```

Abre um trace salvo.

---

### 📊 Relatórios

```bash
npx playwright test --reporter=html
```

Gera relatório HTML.

```bash
npx playwright show-report
```

Abre o último relatório HTML gerado.

```bash
npx playwright merge-reports --reporter html ./blob-report
```

Mescla relatórios blob (útil em execução paralela/CI distribuído).

### 🌐 Relatório da Esteira (CI)

Você pode acessar o último relatório gerado pela esteira (CI) através do link:
👉 [Playwright Report - GitHub Pages](https://reinaldorossetti.github.io/playwright_template/)

---

### 🛠️ Utilitários CLI úteis

```bash
npx playwright codegen https://example.com
```

Abre gravador de ações e ajuda a gerar código inicial de teste.

```bash
npx playwright open https://example.com
```

Abre a URL com Playwright (uso rápido para inspeção).

```bash
npx playwright screenshot https://example.com pagina.png
```

Tira screenshot de uma página.

```bash
npx playwright pdf https://example.com pagina.pdf
```

Gera PDF da página (Chromium).

```bash
npx playwright install
```

Instala navegadores do Playwright.

```bash
npx playwright install chromium firefox webkit
```

Instala navegadores específicos.

```bash
npx playwright uninstall
```

Remove navegadores instalados pelo Playwright.

```bash
npx playwright test --update-snapshots
```

Atualiza snapshots (visual/snapshot testing).

---

## 🧭 Mini fluxo interativo (mão na massa)

### Missão 1 — Setup inicial 🚀

- [ ] Rodar `npm init playwright@latest`
- [ ] Confirmar criação dos arquivos de teste
- [ ] Executar `npx playwright test`

✅ Resultado esperado: primeiros testes executando com sucesso.

### Missão 2 — Rodar um teste específico 🎯

- [ ] Escolher um `.spec`
- [ ] Rodar `npx playwright test caminho/do/arquivo.spec.ts`
- [ ] Rodar com `--headed`

✅ Resultado esperado: ver execução isolada e navegador abrindo.

### Missão 3 — Depuração real 🐛

- [ ] Rodar `npx playwright test --debug`
- [ ] Rodar `npx playwright test --trace on`
- [ ] Abrir trace com `npx playwright show-trace trace.zip`

✅ Resultado esperado: entender passo a passo de um teste falhando.

### Missão 4 — Relatório de execução 📈

- [ ] Rodar `npx playwright test --reporter=html`
- [ ] Abrir com `npx playwright show-report`

✅ Resultado esperado: relatório visual para análise de falhas e tempo.

---

## 📦 Sugestão de scripts no `package.json`

Para facilitar o dia a dia:

```json
{
	"scripts": {
		"test:e2e": "playwright test",
		"test:e2e:ui": "playwright test --ui",
		"test:e2e:debug": "playwright test --debug",
		"test:e2e:headed": "playwright test --headed",
		"test:e2e:report": "playwright show-report"
	}
}
```

Assim você roda com:

```bash
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:debug
```

---

## ⚠️ Erros comuns e como resolver

### ❌ “playwright não encontrado”

- Confirme instalação: `npm i -D @playwright/test`
- Execute via `npx playwright ...`

### ❌ Navegador ausente

- Rode: `npx playwright install`

### ❌ Instabilidade em paralelo

- Rode em série para investigar: `npx playwright test --workers=1`

### ❌ Falha de permissão no Windows com npm

- Tente usar `npm.cmd` no lugar de `npm`

---

## 🏁 Checklist final de domínio básico

- [ ] Sei instalar Playwright do zero
- [ ] Sei rodar todos os testes
- [ ] Sei rodar teste específico
- [ ] Sei usar `--headed`, `--ui` e `--debug`
- [ ] Sei gerar e abrir relatório HTML
- [ ] Sei gerar e abrir trace

Se marcou tudo, parabéns: você já está no modo **Playwright operacional** 🎉

---

## 💬 Próximo nível (quando quiser evoluir)

Se quiser, no próximo passo eu posso te adicionar também:

- Page Object Model (POM)
- Fixtures personalizadas
- Dados dinâmicos para testes
- Estratégias anti-flaky
- Pipeline CI/CD com Playwright

Quando você disser **“avança para o próximo nível”**, eu monto o módulo 2 completo 😄
