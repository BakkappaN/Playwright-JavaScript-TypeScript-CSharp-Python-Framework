// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';

// create class
export class ParaBankHomePage {
    readonly page: Page;
    readonly openNewAccount: Locator;

    constructor(page: Page) {
        // Init page object
        this.page = page;

        // Elements
        this.openNewAccount = page.getByRole('link', { name: 'Open New Account' });
    }

    async clickOnOpenNewAccountLink() {
        await this.openNewAccount.click();
    }
}