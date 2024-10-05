import { test } from '../src/fixtures/testfixture';
import { expect } from '@playwright/test';
import { module1 } from '../src/test-data/google.json';

/**
 * Bakkappa N
 */
for (const [key, value] of Object.entries(module1)) {
    // Write a test
    test(`Data Driven Testing Test ${value}`, { tag: ['@APITest'] }, async ({ page, homePage, resultPage, playlistPage }) => {
        await test.step('Go to URL', async () => {
            await homePage.goto();
        });

        await test.step('Search with keywords', async () => {
            await homePage.searchKeywords(value);
        });

        await test.step('Click on playlist', async () => {
            await resultPage.clickOnPlaylistLink(value);
            await page.waitForTimeout(4000); // Consider replacing this with a more robust wait
        });

        await test.step('Click on video', async () => {
            await playlistPage.clickOnVideo();
            await page.waitForTimeout(8000); // Consider replacing this with a more robust wait
        });
    });
}
