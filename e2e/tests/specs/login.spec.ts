import { test, expect, LOGIN_VALIDATION } from '../fixtures/login.fixture.js';
import { LoginPage } from '../pages/LoginPage.js';
import { NavComponent } from '../pages/NavComponent.js';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;
  let base: any;

  test.beforeEach(async ({ page, pageBase }) => {
    loginPage = new LoginPage(page);
    base = pageBase;
    await loginPage.goToLogin();
  });

  /**
   * TS01 - Happy path: preenche e-mail e senha válidos e verifica redirecionamento
    *        para área logada e saudação ao usuário na NavBar.
   */
  test('TS01 - Should successfully log in when providing valid credentials', async ({ page, setupLoginSuccessMock, pageBase }) => {
    const navComponent = new NavComponent(page);
    const userData = pageBase.generateUserData();

    await setupLoginSuccessMock(page, userData.email, userData.firstName);
    await loginPage.logging_in_and_confirming(userData.email, userData.password);

    await expect(page).toHaveURL(`${loginPage.baseUrl}/minha-conta`);
    await expect(page.getByTestId('account-layout-wrapper')).toBeVisible({ timeout: base.timeOut });
    await expect(navComponent.getUserGreetingLocator()).toBeVisible({ timeout: base.timeOut });
  });

  /**
   * TS02 - Credenciais inválidas: a API retorna 401 e o alerta de erro deve ser exibido.
   */
  test('TS02 - Should display an error alert when credentials are invalid', async ({ page, setupLoginFailureMock }) => {
    await setupLoginFailureMock(page);

    await loginPage.logging_in_and_confirming(LOGIN_VALIDATION.testData.validEmail, LOGIN_VALIDATION.testData.wrongPassword);

    await expect(loginPage.getErrorAlertLocator()).toBeVisible({ timeout: base.timeOut });
    await expect(loginPage.getErrorAlertLocator()).toContainText(LOGIN_VALIDATION.errorMessages.invalidCredentials);
  });

  /**
   * TS03 - Campos vazios: clicar em Entrar sem preencher nada exibe a mensagem de validação local.
   */
  test('TS03 - Should display a validation message when submitting with empty fields', async () => {
    await loginPage.submit();

    await expect(loginPage.getErrorAlertLocator()).toBeVisible({ timeout: base.timeOut });
    await expect(loginPage.getErrorAlertLocator()).toContainText(LOGIN_VALIDATION.errorMessages.emptyFields);
  });

  /**
   * TS04 - Apenas e-mail preenchido: clicar em Entrar sem senha exibe a mensagem de validação local.
   */
  test('TS04 - Should display a validation message when password is empty', async () => {
    await loginPage.fillEmail(LOGIN_VALIDATION.testData.validEmail);
    await loginPage.submit();

    await expect(loginPage.getErrorAlertLocator()).toBeVisible({ timeout: base.timeOut });
    await expect(loginPage.getErrorAlertLocator()).toContainText(LOGIN_VALIDATION.errorMessages.emptyFields);
  });

  /**
   * TS06 - Validação de limite de caracteres: os campos devem ter um limite de no máximo 30 caracteres.
   * Se preenchidos com 250 caracteres aleatórios e especiais, apenas os primeiros 30 deverão ser contabilizados.
   */
  test('TS06 - Should cap email and password fields to a maximum of 30 characters using special chars payload', async ({ page }) => {
    const longString = 'uX2@#$!*()_+=-{}[]|\\;:?/>.<,~`0987654321qweRTYuioPASdfghjKLzxcvbnMmNnBbVvCcXxZzLk1!@#$%^&*()_+{}:"<>?~sdfRTYU1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjk!@#$%^&*()_+<>?~`-=][\\;\'/.,12348765qwQZ1T!x{A_f]p@L%q*w$v';

    const emailLocator = page.getByTestId(loginPage.emailInput);
    const passwordLocator = page.getByTestId(loginPage.passwordInput);

    await loginPage.fillEmail(longString);
    await loginPage.fillPassword(longString);

    const domEmailValue = await emailLocator.inputValue();
    const domPasswordValue = await passwordLocator.inputValue();

    expect(domEmailValue.length).toBeLessThanOrEqual(30);
    expect(domPasswordValue.length).toBeLessThanOrEqual(30);

    expect(domEmailValue).toBe(longString.substring(0, 30));
    expect(domPasswordValue).toBe(longString.substring(0, 30));
  });
});
