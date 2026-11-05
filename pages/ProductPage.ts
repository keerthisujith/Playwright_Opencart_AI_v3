import { Locator, Page } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;

  // Locators
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with accessible names verified in the live application
    this.quantityInput = page.getByRole('textbox', { name: 'Qty' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  /**
   * Returns the product heading.
   * @param productName - Expected product name
   */
  heading(productName: string): Locator {
    return this.page.getByRole('heading', { name: productName, exact: true });
  }

  /**
   * Returns the product price heading.
   * @param price - Expected product price
   */
  price(price: string): Locator {
    return this.page.getByRole('heading', { name: price, exact: true });
  }

  /**
   * Adds the selected quantity of the product to the cart.
   * @param quantity - Quantity to add
   */
  async addToCart(quantity: string): Promise<void> {
    await this.quantityInput.fill(quantity);
    await this.addToCartButton.click();
  }

  /**
   * Returns the add-to-cart success message.
   */
  addedToCartMessage(): Locator {
    return this.page.getByText('Success: You have added');
  }

  /**
   * Opens the cart from the success notification.
   */
  async openCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'shopping cart', exact: true }).click();
  }
}