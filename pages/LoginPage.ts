import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with accessible names verified in the live application
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  }

  /**
   * Returns the returning-customer section heading.
   */
  heading(): Locator {
    return this.page.getByRole('heading', { name: 'Returning Customer' });
  }

  /**
   * Submits valid customer credentials.
   * @param email - Registered customer email
   * @param password - Registered customer password
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}