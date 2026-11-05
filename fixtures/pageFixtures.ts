import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { AccountPage } from '../pages/AccountPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { RegisterPage } from '../pages/RegisterPage';

dotenv.config();

type PageFixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  accountPage: AccountPage;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const appUrl = process.env.WEB_APP_URL;
    if (!appUrl) {
      throw new Error('WEB_APP_URL must be configured.');
    }

    await page.goto(appUrl);
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

test.afterEach(async ({ page, context }) => {
  if (!page.isClosed()) {
    await page.close();
  }
  await context.close();
});

export { expect };