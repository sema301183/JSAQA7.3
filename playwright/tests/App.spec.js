const { test, expect } = require("@playwright/test");
const validData = require('./user');

test("invalid value", async ({ page }) => {

  await page.goto('https://netology.ru/?modal=sign_in', {waitUntil: "commit"});

  await page.click("input[name='email']");
  await page.locator("input[name='email']").fill("userEmail");
  await page.click("input[name='password']");
  await page.locator("input[name='password']").fill("password");
  await page.click("[data-testid='login-submit-btn']");
  await page.isVisible("text=Неверный email");
  //await page.screenshot({ path: './screenshot/invalidValue.png'});
});

test("authorization", async ({ page }) => {

  await page.goto('https://netology.ru/?modal=sign_in', {waitUntil: "commit"});

  await page.click("input[name='email']");
  await page.locator("input[name='email']").fill(validData.userEmail);
  await page.click("input[name='password']");
  await page.locator("input[name='password']").fill(validData.password);
  await page.click("[data-testid='login-submit-btn']");
  await page.isVisible("text=Мои курсы и профессии");
  //await page.screenshot({ path: './screenshot/authorization.png'});
});

test("invalid password", async ({ page }) => {

  await page.goto('https://netology.ru/?modal=sign_in', {waitUntil: "commit"});

  await page.click("input[name='email']");
  await page.locator("input[name='email']").fill(validData.userEmail);
  await page.click("input[name='password']");
  await page.locator("input[name='password']").fill("password");
  await page.click("[data-testid='login-submit-btn']");
  await page.isVisible("[data-testid='login-error-hint']");
});

//проверка входа с паролем зарегестрированным в системе
test("invalid emeil", async ({ page }) => {

  await page.goto('https://netology.ru/?modal=sign_in', {waitUntil: "commit"});

  await page.click("input[name='email']");
  await page.locator("input[name='email']").fill('vasiapupkin@mail.ru');
  await page.click("input[name='password']");
  await page.locator("input[name='password']").fill(validData.password);
  await page.click("[data-testid='login-submit-btn']");
  await page.isVisible("[data-testid='login-error-hint']");
});

//email и пароль не зарегестрированны в системе
test("unregistered user", async ({ page }) => {

  await page.goto('https://netology.ru/?modal=sign_in', {waitUntil: "commit"});

  await page.click("input[name='email']");
  await page.locator("input[name='email']").fill('vasiapupkin@mail.ru');
  await page.click("input[name='password']");
  await page.locator("input[name='password']").fill('qwerty');
  await page.click("[data-testid='login-submit-btn']");
  await page.isVisible("[data-testid='login-error-hint']");
});


test("empty mail input field", async ({ page }) => {

  await page.goto('https://netology.ru/?modal=sign_in', {waitUntil: "commit"});

  await page.click("input[name='password']");
  await page.locator("input[name='password']").fill('qwerty');
  await page.click("[data-testid='login-submit-btn']");
  await page.locator("text=Обязательно поле").isVisible();
});


test("empty password input field", async ({ page }) => {

  await page.goto('https://netology.ru/?modal=sign_in', {waitUntil: "commit"});

  await page.click("input[name='email']");
  await page.locator("input[name='email']").fill('vasiapupkin@mail.ru');
  await page.click("[data-testid='login-submit-btn']");
  await page.locator("text=Обязательно поле").isVisible();
});