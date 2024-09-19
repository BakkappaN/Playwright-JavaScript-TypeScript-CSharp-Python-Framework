// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';

// create class
export class OpenNewAccountPage {

    readonly page: Page;
    readonly accountNumber: Locator;
    readonly accountType: Locator;
    readonly openNewAccountButton: Locator;

    constructor(page: Page) {
        // Init page object
        this.page = page;

        // Elements
        this.accountType = page.locator('#type');
        this.accountNumber = page.locator('#newAccountId').first();

        // Buttons
        this.openNewAccountButton = page.locator('[value="Open New Account"]');
    }

    async selectAccountType(accounttype:string) {
        await this.accountType.selectOption(accounttype);
    }

    async createNewAccount(accounttype:string) {
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