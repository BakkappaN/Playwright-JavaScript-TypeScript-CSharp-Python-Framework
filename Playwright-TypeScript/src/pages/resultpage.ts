// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';

// create class
export class ResultPage {

    readonly page: Page;
    readonly playlistlink: Locator;

    constructor(page: Page, testData: any) {
        // Init page object
        this.page = page;
        // Elements
        this.playlistlink = page.getByRole('link',{name: String(testData.module1.skill1) });
    }

    async clickOnPlaylist(){
        await expect(this.playlistlink.first()).toBeEnabled();
        await this.playlistlink.first().click();
    }
}