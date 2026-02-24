import { test, expect } from '@playwright/test';

test('tech today page loads', async ({ page }) => {
  await page.goto('/tech/today');
  await expect(page.getByText('Today + Tomorrow')).toBeVisible();
});
