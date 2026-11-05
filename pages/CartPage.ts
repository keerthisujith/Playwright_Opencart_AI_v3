import { Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Returns the cart row for a product.
   * @param productName - Product name to locate
   */
  productRow(productName: string): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('link', { name: productName, exact: true }),
    });
  }

  /**
   * Returns the quantity input in a product's cart row.
   * @param productName - Product name to locate
   */
  productQuantity(productName: string): Locator {
    return this.productRow(productName).getByRole('textbox');
  }

  /**
   * Returns the unit-price cell in a product's cart row.
   * @param productName - Product name to locate
   */
  productUnitPrice(productName: string): Locator {
    return this.productRow(productName).getByRole('cell').nth(4);
  }

  /**
   * Returns the final cart total cell.
   */
  cartTotal(): Locator {
    return this.page.getByRole('row').filter({ hasText: 'Total:' }).getByRole('cell').last();
  }
}