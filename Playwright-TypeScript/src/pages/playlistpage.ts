// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basepage';

// create class
export class PlaylistPage extends BasePage {

    readonly videoLink: Locator;
    
    constructor(page: Page) {
        super(page); 

        // Elements
        this.videoLink = page.locator('#container > #thumbnail');
    }

    async clickOnVideo(){
        await this.page.waitForTimeout(3000);
        await this.isElementEnabled(this.videoLink.first());
        await this.clickOnElement(this.videoLink.first());
    }
}