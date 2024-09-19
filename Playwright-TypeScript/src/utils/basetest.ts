// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';
import fs from 'fs';

import path from 'path';

/**
 * Bakkappa N
 */
class BaseTest {
    readonly page: Page;
    public testData: any;

    constructor(page: Page) {
        // Init page object
        this.page = page;

        this.loadTestData();
    }

    private loadTestData() {
        // Get test data
        const environment = process.env.TEST_ENV || 'qa';
        const testDataFile = path.join(__dirname, `../test-data/${environment}/google.json`);
        
        //const testDataFile = `../test-data/${environment}/google.json`;
        this.testData = JSON.parse(fs.readFileSync(testDataFile, 'utf8'));
    }

    async goto() {
        await this.page.setViewportSize({ width: 1366, height: 728 })
        if (process.env.TEST_ENV == 'qa') {
            await this.page.goto('https://www.google.com');
        } else {
            await this.page.goto('https://www.google.com');
        }
    }
}

export default BaseTest;