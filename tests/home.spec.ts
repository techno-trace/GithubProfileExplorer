import { test, expect, Page } from '@playwright/test';

test.describe('Home Route Tests', () => {
  const baseUrl = 'http://localhost:5174';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should display correct texts on the home page', async ({ page }) => {
    await expect(page).toHaveTitle(/Github Profile Explorer App/i);
    await expect(page.locator('text=Welcome to Github Profile Explorer App')).toBeVisible();
    await expect(page.locator('text=Search for users by the username')).toBeVisible();
    await expect(page.locator('input[placeholder="Now Type Your Username"]')).toBeVisible();

    const searchInput = page.getByPlaceholder('Now Type Your Username');
    await expect(searchInput).toBeEmpty();
  });

  test('should toggle dark mode', async ({ page }) => {
    const toggleButton = page.locator('.inline-flex.h-8.w-16');
    const mainElement = page.locator('[data-testid="ghapp-main"]');

    // Initially checking if dark mode is active
    let hasDarkClass = await mainElement.evaluate((el) => el.classList.contains('dark'));
    expect(hasDarkClass).toBe(true);

    // Deactivate dark mode
    await toggleButton.click();
    hasDarkClass = await mainElement.evaluate((el) => el.classList.contains('dark'));
    expect(hasDarkClass).toBe(false);

    // Activate dark mode
    await toggleButton.click();
    hasDarkClass = await mainElement.evaluate((el) => el.classList.contains('dark'));
    expect(hasDarkClass).toBe(true);
  });

  test('should focus on search input using Control + K or Command + K shortcut', async ({
    page,
  }) => {
    const isMac = await page.evaluate(() => navigator.platform.toUpperCase().indexOf('MAC') >= 0);

    if (isMac) {
      await page.keyboard.down('Meta');
      await page.waitForTimeout(50); // Adding a short delay
      await page.keyboard.press('KeyK');
      await page.keyboard.up('Meta');
    } else {
      await page.keyboard.down('Control');
      await page.waitForTimeout(50); // Adding a short delay
      await page.keyboard.press('KeyK');
      await page.keyboard.up('Control');
    }

    const isFocused = await page.$eval(
      'input[placeholder="Now Type Your Username"]',
      (input) => input === document.activeElement,
    );
    expect(isFocused).toBe(true);
  });

  test('should redirect to /search/:username when typing and pressing Enter', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Now Type Your Username"]');
    await searchInput.fill('octocat');
    await searchInput.press('Enter');

    await page.waitForURL(`${baseUrl}/search/octocat`);
    expect(page.url()).toBe(`${baseUrl}/search/octocat`);
  });

  test('should increase API requests made and searches made in footer when searching', async ({
    page,
  }) => {
    const initialApiRequestsMade = await page
      .locator('[data-testid="ghapp-apiRequestsMade"]')
      .innerText();
    const initialSearchesMade = await page
      .locator('[data-testid="ghapp-searchesMade"]')
      .innerText();

    const getCounts = (text: string): number => parseInt(text, 10);

    const initialApiCount = getCounts(initialApiRequestsMade);
    const initialSearchCount = getCounts(initialSearchesMade);

    const searchInput = page.locator('input[placeholder="Now Type Your Username"]');
    await searchInput.fill('octocat');
    await searchInput.press('Enter');

    await page.waitForURL(`${baseUrl}/search/octocat`);
    expect(page.url()).toBe(`${baseUrl}/search/octocat`);

    // Waiting for the API requests made count to be updated
    await page.waitForFunction((initialCount) => {
      const element = document.querySelector('[data-testid="ghapp-apiRequestsMade"]');
      return element && parseInt(element.textContent || '0', 10) > initialCount;
    }, initialApiCount);

    // Waiting for the searches made count to be updated
    await page.waitForFunction((initialCount) => {
      const element = document.querySelector('[data-testid="ghapp-searchesMade"]');
      return element && parseInt(element.textContent || '0', 10) > initialCount;
    }, initialSearchCount);

    const updatedApiRequestsMade = await page
      .locator('[data-testid="ghapp-apiRequestsMade"]')
      .innerText();
    const updatedSearchesMade = await page
      .locator('[data-testid="ghapp-searchesMade"]')
      .innerText();

    const updatedApiCount = getCounts(updatedApiRequestsMade);
    const updatedSearchCount = getCounts(updatedSearchesMade);

    expect(updatedApiCount).toBeGreaterThan(initialApiCount);
    expect(updatedSearchCount).toBeGreaterThan(initialSearchCount);
  });
});
