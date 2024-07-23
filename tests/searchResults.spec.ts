import { test, expect } from '@playwright/test';

test.describe('Search Results Route Tests', () => {
  const baseUrl = 'http://localhost:5174';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/search/octocat`);
  });

  test('should show loader while fetching search results', async ({ page }) => {
    await expect(page.locator('[data-testid="ghapp-loader"]')).toBeVisible();
  });

  test('should display search results once loaded', async ({ page }) => {
    await page.waitForSelector('[data-testid="ghapp-users"]');
    await expect(page.locator('[data-testid="ghapp-users"]')).toBeVisible();
    await expect(page.locator('[data-testid="ghapp-user-card"]')).toHaveCount(12);
  });

  test('should display correct search results count', async ({ page }) => {
    await page.waitForSelector('[data-testid="ghapp-search-results-count"]');
    const resultsText = await page
      .locator('[data-testid="ghapp-search-results-count"]')
      .innerText();
    expect(resultsText).toContain("You've found");
  });

  test('should navigate between pages using pagination controls', async ({ page }) => {
    await page.waitForSelector('[data-testid="ghapp-pagination"]');

    const nextButton = page.locator('[data-testid="ghapp-pagination-next"]');
    await nextButton.click();

    await page.waitForURL(`${baseUrl}/search/octocat?page=2`);
    expect(page.url()).toBe(`${baseUrl}/search/octocat?page=2`);

    const prevButton = page.locator('[data-testid="ghapp-pagination-prev"]');
    await prevButton.click();

    await page.waitForURL(`${baseUrl}/search/octocat?page=1`);
    expect(page.url()).toBe(`${baseUrl}/search/octocat?page=1`);
  });

  test('should display breadcrumbs with correct navigation links', async ({ page }) => {
    await page.waitForSelector('[data-testid="ghapp-breadcrumbs"]');

    const breadcrumbs = page.locator('[data-testid="ghapp-breadcrumbs"]');
    await expect(breadcrumbs).toBeVisible();

    const breadcrumbLinks = breadcrumbs.locator('a');
    await expect(breadcrumbLinks).toHaveCount(3);
    await expect(breadcrumbLinks.nth(0)).toHaveAttribute('href', '/');
    await expect(breadcrumbLinks.nth(1)).toHaveAttribute('href', '/search/octocat');
    await expect(breadcrumbLinks.nth(2)).toHaveAttribute('href', '/search/octocat');
  });

  test('should navigate to profile details on clicking a user card', async ({ page }) => {
    await page.waitForSelector('[data-testid="ghapp-user-card-profile-link-img"]');
    const userCard = page.locator('[data-testid="ghapp-user-card-profile-link-img"]').first();

    await userCard.click();

    await page.waitForURL(`${baseUrl}/profiles/octocat`);
    expect(page.url()).toBe(`${baseUrl}/profiles/octocat`);
  });
});
