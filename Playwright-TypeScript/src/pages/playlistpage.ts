// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';
import { setTimeout } from 'timers';

// create class
export class PlaylistPage {
    readonly page: Page;
    readonly videoLink: Locator;
    
    constructor(page: Page) {
        // Init page object
        this.page = page;

        // Elements
        this.videoLink = page.locator('#container > #thumbnail');
    }

    async clickOnVideo(){
        await this.page.waitForTimeout(3000);
        await expect(this.videoLink.first()).toBeEnabled(),{setTimeout:60000};
        await this.videoLink.first().click();
    }

}