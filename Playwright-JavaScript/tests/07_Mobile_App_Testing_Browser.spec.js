import { expect } from '@playwright/test';
import { fixtures as test } from '../fixtures/mobiletestfixture';

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.MOBILE_APP_URL.toString());
})

test('Validate testers talk playlist link', { tag: '@MobileTest' }, async ({ mobileAppPage, page }) => {

    await test.step('Search with keywords', async () => {
        await page.screenshot({ path: './mobile_app_test_homepage.png' });
        await mobileAppPage.searchWithKeywords('playwright by testers talk')
    })

    await test.step('Validate Playwright by Testers Talk link', async () => {
        await mobileAppPage.validateTestersTalkLink();
        await page.screenshot({ path: './mobile_app_test_resultspage.png' });
    });
})