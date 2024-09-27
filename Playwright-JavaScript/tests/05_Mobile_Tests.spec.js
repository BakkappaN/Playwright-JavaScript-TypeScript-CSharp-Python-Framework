// Include playwright module
const { test, expect } = require('@playwright/test');

const {_android} = require('playwright');

/**
 * Bakkappa N
 */
test('Mobile Chrome browser Test', { tag: '@MobileTest' }, async ({  }) => {

    // Setup for launching mobile app
    const browserServer = await _android.launchServer({deviceSerialNumber:'emulator-5554'})
    const wsEndPoint = browserServer.wsEndpoint();
    const device = await _android.connect(wsEndPoint);

    let page;

    await test.step(' Print device details - model, serial no.', async () => {
        console.log('Device model : '+device.model());
        console.log('Device serial no. : '+device.serial());
    })
   
    await test.step('Close if already app is opened', async () => {
        await device.shell('am force-stop com.android.chrome');
    })

    await test.step('Open mobile chrome browser and enter URL', async () => {
        const context = await device.launchBrowser();
        page = context.newPage();
        await page.goto('https://wm.youtube.com');
    })
})

