// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

// create class
export class HomePage {

    readonly page: Page;
    readonly searchTextbox: Locator;

    constructor(page: Page) {
        // Init page object
        this.page = page;

        // Elements
        this.searchTextbox = page.locator('#APjFqb');
    }

    async goto() {
        await this.page.setViewportSize({ width: 1366, height: 728 })
        if (String(process.env.ENV).toUpperCase() == 'QA') {
            await this.page.goto(String(process.env.QA_URL));
        } else if (String(process.env.ENV).toUpperCase() == 'STAGE') {
            await this.page.goto(String(process.env.STAGING_URL));
        }
    }

    async searchKeywords(param1:string){
        await expect(this.searchTextbox).toBeEnabled();
        await this.searchTextbox.click();
        await this.searchTextbox.fill(param1);
        await this.searchTextbox.press('Enter');
    }

}