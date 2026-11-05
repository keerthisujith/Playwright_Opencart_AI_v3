import { Locator, Page } from '@playwright/test';

export class AccountPage {
  private readonly page: Page;

  // Locators
  private readonly accountHeading: Locator;
  private readonly logoutLink: Locator;
  private readonly logoutConfirmation: Locator;
  private readonly continueLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with accessible names verified in the live application
    this.accountHeading = page.locator('#content').getByRole('heading', { name: 'My Account', exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true });
    this.logoutConfirmation = page.getByRole('heading', { name: 'Account Logout' });
    this.continueLink = page.getByRole('link', { name: 'Continue', exact: true });
  }

  /**
   * Returns the account dashboard heading.
   */
  heading(): Locator {
    return this.accountHeading;
  }

  /**
   * Logs out the current customer.
   */
  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  /**
   * Returns the logout confirmation heading.
   */
  logoutConfirmationHeading(): Locator {
    return this.logoutConfirmation;
  }

  /**
   * Continues from the logout confirmation to the storefront.
   */
  async continueAfterLogout(): Promise<void> {
    await this.continueLink.click();
  }
}