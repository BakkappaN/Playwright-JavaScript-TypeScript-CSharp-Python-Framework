const { test: base, expect } = require('@playwright/test');

import { writeTestStatusToExcelFile } from '../utils/excelhandler';

const { HomePage } = require('../pages/homepage');
const { ResultPage } = require('../pages/resultpage');
const { PlaylistPage } = require('../pages/playlistpage');

import { loadTestData } from '../utils/jsonhandler';

import Logger from "../utils/logger";

// Extend the base test to include a custom fixture
const test = base.extend({
  testData: async ({ }, use) => {
    const data = await loadTestData();
    await use(data);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  resultPage: async ({ page, testData }, use) => {
    const resultPage = new ResultPage(page, testData);
    await use(resultPage);
  },
  playlistPage: async ({ page }, use) => {
    const playlistPage = new PlaylistPage(page);
    await use(playlistPage);
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
