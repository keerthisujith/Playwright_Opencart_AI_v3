import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  private readonly page: Page;

  // Locators
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly telephoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly passwordConfirmInput: Locator;
  private readonly privacyPolicyCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with accessible names verified in the live application
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('E-Mail');
    this.telephoneInput = page.getByPlaceholder('Telephone');
    this.passwordInput = page.getByPlaceholder('Password', { exact: true });
    this.passwordConfirmInput = page.getByPlaceholder('Password Confirm');
    this.privacyPolicyCheckbox = page.getByRole('checkbox');
  }

  /**
   * Returns the registration page heading.
   */
  heading(): Locator {
    return this.page.getByRole('heading', { name: 'Register Account' });
  }

  /**
   * Fills and submits the customer registration form.
   * @param customer - Customer details for registration
   */
  async register(customer: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
  }): Promise<void> {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.emailInput.fill(customer.email);
    await this.telephoneInput.fill(customer.telephone);
    await this.passwordInput.fill(customer.password);
    await this.passwordConfirmInput.fill(customer.password);
    await this.privacyPolicyCheckbox.check();
    await this.page.getByRole('button', { name: 'Continue', exact: true }).click();
  }

  /**
   * Returns the account-created confirmation heading.
   */
  registrationConfirmation(): Locator {
    return this.page.getByRole('heading', { name: 'Your Account Has Been Created!' });
  }

  /**
   * Continues from the registration confirmation to the account dashboard.
   */
  async continueToAccount(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue', exact: true }).click();
  }
}