// Inlcude playwright module
const BasePage = require('./basepage');
const { expect } = require('@playwright/test')

// create class
exports.HomePage = class HomePage extends BasePage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        super(page);
        
        // Elements
        this.searchTextbox = page.locator('#APjFqb');
    }

    async goto() {
        await this.page.setViewportSize({ width: 1366, height: 728 })
        if (process.env.ENV.toUpperCase() == 'QA') {
            await this.navigateTo(process.env.QA_URL);
        } else if (process.env.ENV.toUpperCase() == 'STAGE') {
            await this.navigateTo(process.env.STAGING_URL);
        }
    }

    async searchKeywords(param1) {
        await this.clickOnElement(this.searchTextbox);
        await this.enterText(this.searchTextbox, param1);
        await this.pressKeyboardKey(this.searchTextbox, 'Enter');
    }
}