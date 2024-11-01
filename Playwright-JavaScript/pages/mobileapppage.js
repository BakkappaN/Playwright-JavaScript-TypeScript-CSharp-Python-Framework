const { Page } = require('playwright-core');
import { expect } from '@playwright/test';

class MobileAppPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;

        // Elements
        this.searchTextbox = page.locator("(//*[@aria-label='Search YouTube'])[2]");
        this.searchTextboxInput = page.locator("[name='search_query']");
        this.playlistLink = page.getByRole('link', { name: 'Playwright by Testers Talk☑️' });
    }

    /********************************************************** Elements ********************************************************* */

    async searchWithKeywords(keyword) {
        await this.searchTextbox.click();
        await this.searchTextboxInput.fill(keyword);
        await this.searchTextboxInput.press('Enter');
        await this.page.waitForTimeout(3000);
    }

    async validateTestersTalkLink() {
        await expect(this.playlistLink).toBeVisible();
    }
}

module.exports = MobileAppPage;
