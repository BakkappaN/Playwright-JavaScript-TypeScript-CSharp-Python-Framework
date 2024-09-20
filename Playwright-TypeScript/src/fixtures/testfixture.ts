import * as debug from 'debug';
import * as fs from 'fs';
import { test as base } from '@playwright/test';
import { writeTestStatusToExcelFile } from '../utils/excelhandler';
import { HomePage } from '../pages/homepage';
import { PlaylistPage } from '../pages/playlistpage';
import { ResultPage } from '../pages/resultpage';
import BaseTest from '../utils/basetest';


export const test = base.extend<{
  saveLogs: void;
  homePage: HomePage;
  playlistPage: PlaylistPage;
  resultPage: ResultPage;
  baseTest: BaseTest;
}>({
  saveLogs: [async ({ }, use, testInfo) => {
    // Collecting logs during the test.
    // const logs: string[] = [];
    // debug.log = (...args: any[]) => logs.push(args.map(String).join(''));
    // debug.enable('myserver');

    await use();

    // After the test we can check whether the test passed or failed.
    if (testInfo.status !== testInfo.expectedStatus) {
      // outputPath() API guarantees a unique file name.
      // const logFile = testInfo.outputPath('logs.txt');
      // await fs.promises.writeFile(logFile, logs.join('\n'), 'utf8');
      // testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
    }
    console.log('Global afterEach is running...');
    await writeTestStatusToExcelFile(testInfo);
  }, { auto: true }],

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  playlistPage: async ({ page }, use) => {
    const playlistPage = new PlaylistPage(page);
    await use(playlistPage);
  },
  resultPage: async ({ page }, use) => {
    const resultPage = new ResultPage(page);
    await use(resultPage);
  },
  baseTest: async ({ page }, use) => {
    const baseTest = new BaseTest(page);
    await use(baseTest);
  }

});

export { expect } from '@playwright/test';