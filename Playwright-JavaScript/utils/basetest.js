// Inlcude playwright module
const { test, expect } = require('@playwright/test');
const fs = require('fs');

const path = require('path');

// import { qaTestData } from "../test-data/qa/google.json";
// import { stageTestData } from "../test-data/stage/google.json";

/**
 * Bakkappa N
 */
class BaseTest {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        // Init page object
        this.page = page;

        // Get test data
        const environment = process.env.TEST_ENV || 'qa';
        const testDataFile = path.join(__dirname, `../test-data/${environment}/google.json`);
        //const testDataFile = `../test-data/${environment}/google.json`;
        this.testData = JSON.parse(fs.readFileSync(testDataFile, 'utf8'));

        // if (process.env.ENV == 'qa') {
        //     this.testData = qaTestData;
        // } else {
        //     this.testData = stageTestData;
        // }
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default BaseTest;