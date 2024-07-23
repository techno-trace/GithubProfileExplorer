import { test, expect } from '@playwright/test';

test.describe('Profile Page Tests', () => {
  const baseUrl = 'http://localhost:5174';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/profiles/technosophos`);
  });

  test('should display user details correctly', async ({ page }) => {
    await page.waitForSelector('[data-testid="ghapp-profile-avatar"]');
    await expect(page.locator('[data-testid="ghapp-profile-avatar"]')).toBeVisible();
    await expect(page.locator('[data-testid="ghapp-profile-name"]')).toHaveText(/technosophos/i);
    await expect(page.locator('[data-testid="ghapp-profile-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="ghapp-profile-blog"]')).toBeVisible();
    await expect(page.locator('[data-testid="ghapp-profile-bio"]')).toBeVisible();
  });

  test('should switch between tabs correctly', async ({ page }) => {
    const tabRepositories = page.locator('[data-testid="ghapp-tab-repositories"]');
    const tabFollowers = page.locator('[data-testid="ghapp-tab-followers"]');
    const tabOrganizations = page.locator('[data-testid="ghapp-tab-organizations"]');

    await expect(tabRepositories).toBeVisible();
    await expect(tabFollowers).toBeVisible();
    await expect(tabOrganizations).toBeVisible();

    await tabFollowers.click();
    await expect(page.locator('[data-testid="ghapp-panel-followers"]')).toBeVisible();

    await tabOrganizations.click();
    await expect(page.locator('[data-testid="ghapp-panel-organizations"]')).toBeVisible();

    await tabRepositories.click();
    await expect(page.locator('[data-testid="ghapp-panel-repositories"]')).toBeVisible();
  });

  test('should display repositories correctly', async ({ page }) => {
    await page.click('[data-testId="ghapp-tab-repositories"]');
    await page.waitForSelector('[data-testId="ghapp-repo-card"]');
    const repoCardsCount = await page.locator('[data-testId="ghapp-repo-card"]').count();
    expect(repoCardsCount).toBeGreaterThan(0);
  });

  test('should display followers correctly', async ({ page }) => {
    await page.click('[data-testId="ghapp-tab-followers"]');
    await page.waitForSelector('[data-testId="ghapp-follower-card"]');
    const followerCardsCount = await page.locator('[data-testId="ghapp-follower-card"]').count();
    expect(followerCardsCount).toBeGreaterThan(0);
  });

  test('should display organizations correctly', async ({ page }) => {
    await page.click('[data-testId="ghapp-tab-organizations"]');
    await page.waitForSelector('[data-testId="ghapp-org-card"]');
    const orgCardsCount = await page.locator('[data-testId="ghapp-org-card"]').count();
    expect(orgCardsCount).toBeGreaterThan(0);
  });
});
