// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';

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

    async goto(){
        await this.page.setViewportSize({width:1366, height:728})
        await this.page.goto('https://www.google.com');
    }

    async searchKeywords(param1:string){
        await expect(this.searchTextbox).toBeEnabled();
        await this.searchTextbox.click();
        await this.searchTextbox.fill(param1);
        await this.searchTextbox.press('Enter');
    }

}