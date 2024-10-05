const { test } = require('../fixtures/testfixture');
const { expect } = require('@playwright/test');

import { module1 } from '../test-data/google.json'

/**
 * Bakkappa N
 */
for (const [key, value] of Object.entries(module1)) {

    // Write a test
    test(`Data Driven Testing Test ${value}`, { tag: '@UIDataDrivenTest' }, async ({ page, testData, homePage, resultPage, playlistPage }) => {

        await test.step('Go to URL', async () => {
            await homePage.goto();
        });

        await test.step('Search with keywords', async () => {
            await homePage.searchKeywords(value);
        });

        await test.step('Click on playlist', async () => {
            await resultPage.clickOnPlaylist(value);
            await page.waitForTimeout(4000);
        });

        await test.step('Click on video', async () => {
            await playlistPage.clickOnVideo();
            await page.waitForTimeout(8000);
        });
    })
}

