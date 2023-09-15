const { chromium } = require("playwright");
const validData = require('./user');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in", {waitUntil: "commit"});
  await page.click("input[name='email']");
  await page.locator("input[name='email']").fill(validData.userEmail);
  await page.click("input[name='password']");
  await page.locator("input[name='password']").fill(validData.password);
  await page.click("[data-testid='login-submit-btn']");
  //await expect(page.locator("input[name='email']+span")).toHaveText(/Неверный email/);
  await page.pause();

  //assertion
  await browser.close();
})();no