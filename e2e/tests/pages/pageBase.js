import fs from 'fs/promises';
import path from 'path';
import { faker } from '@faker-js/faker';

export default class PageBase {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.timeOut = 30000;
    this.adminUser = {
      email: process.env.USER_ADMIN_EMAIL,
      password: process.env.USER_ADMIN_PASSWORD,
    };
    this.normalUser = {
      email: process.env.USER_NORMAL_EMAIL,
      password: process.env.USER_NORMAL_PASSWORD,
    };
  }

  /**
  * Gera dados de usuário fake para testes de login.
  * @returns {{ email: string, password: string, firstName: string }}
  */
  generateUserData() {
    const firstName = faker.person.firstName();
    return {
      email: faker.internet.email({ firstName }),
      password: faker.internet.password({ length: 10, memorable: true }),
      firstName,
    };
  }

  /**
   * Gera um timestamp baseado na data atual formatado.
   * Substitui caracteres especiais (: e .) por hifens para garantir compatibilidade.
   * @returns {string} Timestamp formatado (ex: 2023-10-27T10-30-00-000Z).
   */
  static getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Captura uma screenshot da página atual com um nome de arquivo datado.
   * Cria o diretório de destino caso ele não exista.
   *
   * @param {string} [prefix='afterEach-screenshot'] - Prefixo customizado para o nome do arquivo.
   * @param {string} [folder='imgs'] - Nome da pasta onde a imagem será salva.
   * @param {boolean} [fullPage=true] - Se deve capturar a página inteira ou apenas o viewport.
   * @returns {Promise<string>} Caminho absoluto do arquivo de imagem gerado.
   */
  async takeTimestampScreenshot(
    prefix = 'afterEach-screenshot',
    folder = 'imgs',
    fullPage = true,
  ) {
    const outputDir = path.resolve(process.cwd(), folder);
    const filePath = path.join(outputDir, `${prefix}-${PageBase.getTimestamp()}.png`);

    await fs.mkdir(outputDir, { recursive: true });
    await this.page.screenshot({
      path: filePath,
      fullPage,
    });

    return filePath;
  }

  /**
   * Clica elaborado para resolver problemas scroll e espera.
   * @param {string} locator
   */
  async click(locator) {
    await this.page.locator(locator).first().waitFor({ state: 'visible', timeout: this.timeOut });
    const selector = this.page.locator(locator).first();
    await selector.scrollIntoViewIfNeeded();
    await selector.focus();
    await selector.click();
  }
}
