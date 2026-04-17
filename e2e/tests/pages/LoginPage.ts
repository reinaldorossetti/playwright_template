import { Page } from '@playwright/test';
import PageBase from './PageBase.js';

export class LoginPage extends PageBase {
  page: Page;
  readonly emailInput = 'login-email';
  readonly passwordInput = 'login-password';
  readonly submitButton = 'login-submit-btn';
  readonly errorAlert = 'login-error-alert';
  readonly createAccountButton = 'login-create-account-btn';
  readonly baseUrl = 'http://127.0.0.1:5174';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async goToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  getErrorAlertLocator() {
    return this.page.getByTestId(this.errorAlert);
  }

  async doLoggingIn(email: string = "", password: string = "") {
    await this.page.getByTestId(this.emailInput).fill(email);
    await this.page.getByTestId(this.passwordInput).fill(password);
  }

  async submitLogin() {
    await this.page.getByTestId(this.submitButton).click();
  }

  async clickCreateAccount() {
    await this.page.getByTestId(this.createAccountButton).click();
  }
}
