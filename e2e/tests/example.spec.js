// @ts-check
import { test, expect } from './fixtures/index';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test('has title', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.afterEach(async ({ pageBase }, testInfo) => {
  const safeTitle = testInfo.title.replace(/\W+/g, '-').toLowerCase();
  await pageBase.takeTimestampScreenshot(`afterEach-${safeTitle}`);
});
