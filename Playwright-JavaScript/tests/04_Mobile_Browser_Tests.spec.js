// Include playwright module
const { test, expect } = require('@playwright/test');
const { _android } = require('playwright');

/**
 * Bakkappa N
 */
test('Mobile Chrome browser Test', { tag: '@MobileTest' }, async ({ }) => {

    // Setup for launching mobile app
    const browserServer = await _android.launchServer({ deviceSerialNumber: 'emulator-5554' })
    const wsEndPoint = browserServer.wsEndpoint();
    const device = await _android.connect(wsEndPoint);

    let page;

    await test.step(' Print device details - model, serial no.', async () => {
        console.log('Device model : ' + device.model());
        console.log('Device serial no. : ' + device.serial());
    })

    await test.step('Close if already app is opened', async () => {
        await device.shell('am force-stop com.android.chrome');
    })

    const context = await device.launchBrowser();
    page = await context.newPage();

    await test.step('Open mobile chrome browser and enter URL', async () => {
        await page.goto('https://m.youtube.com/');
        await page.screenshot({ path: './mobile_app_test.png' });
    })

    await test.step('Search with keywords', async () => {
        await page.click("(//*[@aria-label='Search YouTube'])[2]");
        await page.fill("[name='search_query']",'playwright by testers talk');
        await page.press("[name='search_query']",'Enter');
        await page.waitForTimeout(3000);
    })

    await test.step('Validate Playwright by Testers Talk link', async () => {
        await expect(page.getByRole('link', { name: 'Playwright by Testers Talk☑️' })).toBeVisible();
        await page.screenshot({ path: './mobile_app_test_results.png' });
        await context.close();
        await page.close();
    });
})

