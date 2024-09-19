import { test } from '../src/fixtures/testfixture';
import { expect } from '@playwright/test';

import * as path from 'path';
import xlsx from 'xlsx';
import BaseTest from '../src/utils/basetest';

import { HomePage } from '../src/pages/homepage';
import { ResultPage } from '../src/pages/resultpage';
import { PlaylistPage } from '../src/pages/playlistpage';

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });

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
        await homepage.searchKeywords(String(baseTest.testData.module1.skill1));
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
    const filePath = path.resolve(__dirname, String(process.env.DOWNLOAD_PATH)).toString();
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[process.env.Sheet1 as string];
    const data: Array<Record<string, any>> = xlsx.utils.sheet_to_json(worksheet);

    expect(data.length).toBeGreaterThan(0);

    for (const row of data) {
        for (const key in row) {
            if (row.hasOwnProperty(key)) {
                console.log(`${key} : ` + row[key]);
            }
        }
        console.log("=======");
    }

    // Ensure Skill1 and Skill2 exist in the data
    expect(data[0]).toHaveProperty('Skill1');
    expect(data[0]).toHaveProperty('Skill2');

    expect(data[0].Skill1).toEqual('Playwright');
    expect(data[0].Skill2).toEqual('Cypress');
})
