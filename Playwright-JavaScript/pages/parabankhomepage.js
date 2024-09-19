// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.ParaBankHomePage = class ParaBankHomePage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        // Init page object
        this.page = page;

        // Elements
        this.openNewAccount = page.getByRole('link', { name: 'Open New Account' });
    }

    async clickOnOpenNewAccountLink() {
        await this.openNewAccount.click();
    }
}