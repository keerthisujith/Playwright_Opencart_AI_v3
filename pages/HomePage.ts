import { Locator, Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly accountMenu: Locator;
  private readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with accessible names verified in the live application
    this.accountMenu = page.getByRole('navigation').first().getByRole('link', { name: /My Account/ });
    this.searchInput = page.getByRole('banner').getByRole('textbox', { name: 'Search' });
  }

  /**
   * Opens the registration page from the My Account menu.
   */
  async openRegister(): Promise<void> {
    await this.accountMenu.click();
    await this.page.getByRole('link', { name: 'Register', exact: true }).click();
  }

  /**
   * Opens the login page from the My Account menu.
   */
  async openLogin(): Promise<void> {
    await this.accountMenu.click();
    await this.page.getByRole('link', { name: 'Login', exact: true }).click();
  }

  /**
   * Searches the catalog for a product.
   * @param productName - Product name to search for
   */
  async searchForProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
  }

  /**
   * Returns the exact search-result link for a product.
   * @param productName - Product name to locate
   */
  searchResult(productName: string): Locator {
    return this.page.locator('#content').getByText(productName, { exact: true });
  }

  /**
   * Opens a product from the search results.
   * @param productName - Product name to open
   */
  async openSearchResult(productName: string): Promise<void> {
    await this.searchResult(productName).click();
  }

  /**
   * Returns the My Account navigation link.
   */
  accountMenuLink(): Locator {
    return this.accountMenu;
  }
}