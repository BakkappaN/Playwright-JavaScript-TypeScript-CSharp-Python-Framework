const { test} = require('../fixtures/testfixture');
const { expect } = require('@playwright/test');

import path from "node:path";
const xlsx = require('xlsx');
import BaseTest from '../utils/basetest';

const { HomePage } = require('../pages/homepage');
const { ResultPage } = require('../pages/resultpage');
const { PlaylistPage } = require('../pages/playlistpage');

/**
 * Bakkappa N
 */
test('[2] UI automation test using playwright', { tag: '@UITest' }, async ({ page }) => {

    const baseTest = new BaseTest(page);
    const homepage = new HomePage(page);
    const resultpage = new ResultPage(page);
    const playlistpage = new PlaylistPage(page);

    await test.step('Go to URL', async () => {
        await baseTest.goto();
    });

    await test.step('Search with keywords', async () => {
        await homepage.searchKeywords(baseTest.testData.module1.skill1);
    });

    await test.step('Click on playlist', async () => {
        await resultpage.clickOnPlaylist();
        await page.waitForTimeout(4000);
    });

    await test.step('Click on video', async () => {
        await playlistpage.clickOnVideo();
        await page.waitForTimeout(8000);
    });
})

/**
 * Bakkappa N
 */
test('[9, 12, 14] Verify excel data using playwright', { tag: '@ValidateExcel' }, async ({ page }) => {
    const filePath = path.join(__dirname, process.env.DOWNLOAD_PATH);
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[process.env.Sheet1];
    const data = xlsx.utils.sheet_to_json(worksheet);

    expect(data.length).toBeGreaterThan(0);
    for (const row of data) {
        for (const key in row) {
            console.log(`${key} : ` + row[key]);
        }
        console.log("=======")
    }
    expect(data[0].Skill1).toEqual('Playwright');
    expect(data[0].Skill2).toEqual('Cypress');
})