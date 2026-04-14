import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Gera um timestamp baseado na data atual formatado para uso em nomes de arquivos.
 * Substitui caracteres especiais (: e .) por hifens para garantir compatibilidade.
 * @returns {string} Timestamp formatado (ex: 2023-10-27T10-30-00-000Z).
 */
export function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Captura uma screenshot da página atual com um nome de arquivo datado.
 * Cria o diretório de destino caso ele não exista.
 *
 * @param {import('@playwright/test').Page} page - Instância da página do Playwright.
 * @param {string} [prefix='afterEach-screenshot'] - Prefixo customizado para o nome do arquivo.
 * @param {string} [folder='imgs'] - Nome da pasta onde a imagem será salva.
 * @param {boolean} [fullPage=true] - Se deve capturar a página inteira ou apenas o viewport.
 * @returns {Promise<string>} Caminho absoluto do arquivo de imagem gerado.
 */
export async function takeTimestampScreenshot(
  page,
  prefix = 'afterEach-screenshot',
  folder = 'imgs',
  fullPage = true,
) {
  const outputDir = path.resolve(process.cwd(), folder);
  const filePath = path.join(outputDir, `${prefix}-${getTimestamp()}.png`);

  await fs.mkdir(outputDir, { recursive: true });
  await page.screenshot({
    path: filePath,
    fullPage,
  });

  return filePath;
}
