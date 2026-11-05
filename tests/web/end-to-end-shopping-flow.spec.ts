import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-End Shopping Flow @master @regression @web @end-to-end', async ({
  page,
  homePage,
  registerPage,
  loginPage,
  accountPage,
  productPage,
  cartPage,
}) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  const customer = {
    firstName: RandomDataUtil.getFirstName(),
    lastName: RandomDataUtil.getLastName(),
    email: `${Date.now()}.${RandomDataUtil.getEmail()}`,
    telephone: RandomDataUtil.getPhoneNumber(),
    password: RandomDataUtil.getPassword(14),
  };
  const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

  await test.step('1) Open the storefront and register a new customer', async () => {
    await expect(homePage.accountMenuLink()).toBeVisible();
    await homePage.openRegister();
    await expect(registerPage.heading()).toBeVisible();
    await registerPage.register(customer);
    await expect(registerPage.registrationConfirmation()).toBeVisible();
  });

  await test.step('2) Log out of the newly created account', async () => {
    await registerPage.continueToAccount();
    await expect(accountPage.heading()).toBeVisible();
    await accountPage.logout();
    await expect(accountPage.logoutConfirmationHeading()).toBeVisible();
    await accountPage.continueAfterLogout();
    await expect(homePage.accountMenuLink()).toBeVisible();
  });

  await test.step('3) Log in with the new customer credentials', async () => {
    await homePage.openLogin();
    await expect(loginPage.heading()).toBeVisible();
    await loginPage.login(customer.email, customer.password);
    await expect(accountPage.heading()).toBeVisible();
  });

  await test.step('4) Search for the known product and open its details', async () => {
    await homePage.searchForProduct(productName);
    await expect(homePage.searchResult(productName)).toBeVisible();
    await homePage.openSearchResult(productName);
    await expect(productPage.heading(productName)).toBeVisible();
    await expect(productPage.price(totalPrice)).toBeVisible();
  });

  await test.step('5) Add the product to the cart and verify cart details', async () => {
    await productPage.addToCart(productQuantity);
    await expect(productPage.addedToCartMessage()).toBeVisible();
    await productPage.openCart();

    await expect(cartPage.productRow(productName)).toBeVisible();
    await expect(cartPage.productQuantity(productName)).toHaveValue(productQuantity);
    await expect(cartPage.productUnitPrice(productName)).toHaveText(totalPrice);
    await expect(cartPage.cartTotal()).toHaveText(totalPrice);
  });

  await test.step('6) Confirm the journey completed without browser errors', async () => {
    expect(pageErrors).toEqual([]);
  });
});