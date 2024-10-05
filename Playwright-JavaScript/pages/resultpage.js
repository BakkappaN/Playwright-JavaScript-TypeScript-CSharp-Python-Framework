// Inlcude playwright module
const BasePage = require('./basepage');
const { expect } = require('@playwright/test');

// create class
exports.ResultPage = class ResultPage extends BasePage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page, testData) {
        super(page);

        // Elements
        this.playlistlink = page.getByRole('link', { name: testData.module1.skill1 });
    }

    async clickOnPlaylist() {
        await expect(this.playlistlink.first()).toBeEnabled();
        await this.playlistlink.first().click();
    }

    async clickOnPlaylist(playlist) {
        const link = this.page.getByRole('link', { name: playlist }).first();
        await this.isElementEnabled(link)
        await this.clickOnElement(link);
    }
}