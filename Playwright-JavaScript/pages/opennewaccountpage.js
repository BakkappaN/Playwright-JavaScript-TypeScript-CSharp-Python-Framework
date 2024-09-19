// Inlcude playwright module
const { th } = require('@faker-js/faker');
const { expect } = require('@playwright/test')

// create class
exports.OpenNewAccountPage = class OpenNewAccountPage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        // Init page object
        this.page = page;

        // Elements
        this.accountType = page.locator('#type');
        this.accountNumber = page.locator('#newAccountId').first();

        // Buttons
        this.openNewAccountButton = page.locator('[value="Open New Account"]');
    }

    async selectAccountType(accounttype) {
        await this.accountType.selectOption(accounttype);
    }

    async createNewAccount(accounttype) {
        await this.selectAccountType(accounttype);
        await expect(this.openNewAccountButton).toBeEnabled();
        await this.openNewAccountButton.click();
        await this.page.waitForTimeout(4000);
    }

    async getAccountNumber() {
        console.log("start")
        await this.accountNumber.textContent();
        console.log(await this.accountNumber.textContent())

        await this.accountNumber.innerText();
        console.log(await this.accountNumber.innerText())

        const html = await this.accountNumber.innerHTML();
        const text = html.replace(/<[^>]*>/g, '');
        console.log(text)
        console.log("end");
    }
}