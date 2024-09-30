// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.ResultPage = class ResultPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page, testData) {
        // Init page object
        this.page = page;

        // Elements
        this.playlistlink = page.getByRole('link', { name: testData.module1.skill1 });
    }

    async clickOnPlaylist() {
        await expect(this.playlistlink.first()).toBeEnabled();
        await this.playlistlink.first().click();
    }

    async clickOnPlaylist(playlist) {
        await expect(this.page.getByRole('link', { name: playlist }).first()).toBeEnabled();
        await this.page.getByRole('link', { name: playlist }).first().click();
    }
}