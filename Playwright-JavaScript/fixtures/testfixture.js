const debug = require('debug');
const fs = require('fs');
const { test: base, expect } = require('@playwright/test');

import { writeTestStatusToExcelFile } from '../utils/excelhandler';

const { RegistrationPage } = require('../pages/registrationpage');
const { LoginPage } = require('../pages/loginpage');
const { ParaBankHomePage } = require('../pages/parabankhomepage');
const { OpenNewAccountPage } = require('../pages/opennewaccountpage');

// Extend the base test to include a custom fixture
const test = base.extend({

  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  paraBankHomePage: async ({ page }, use) => {
    const paraBankHomePage = new ParaBankHomePage(page);
    await use(paraBankHomePage);
  },
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);
    await use(openNewAccountPage);
  },
  // Optionally, expose the raw page instance
  pageInstance: async ({ page }, use) => {
    await use(page);
  },
  saveLogs: [async ({ }, use, testInfo) => {
    // Collecting logs during the test
    // const logs = [];
    // debug.log = (...args) => logs.push(args.map(String).join(''));
    // debug.enable('myserver');
    await use();

    // After the test, check whether the test passed or failed
    // if (testInfo.status !== testInfo.expectedStatus) {
    //   // `outputPath()` API guarantees a unique file name
    //   const logFile = testInfo.outputPath('logs.txt');
    //   await fs.promises.writeFile(logFile, logs.join('\n'), 'utf8');
    //   testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
    // }
    console.log('Global aftereach is running...')
    await writeTestStatusToExcelFile(testInfo);
  }, { auto: true }],
});

module.exports = { test, expect };
