// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';

import BaseTest from '../utils/basetest';

// create class
export class ResultPage {

    readonly page: Page;
    readonly playlistlink: Locator;

    constructor(page: Page) {
        const baseTest = new BaseTest(page);

        // Init page object
        this.page = page;

        console.log(String(baseTest.testData.module1.skill1));
        // Elements
        this.playlistlink = page.getByRole('link',{name: String(baseTest.testData.module1.skill1) });
    }

    async clickOnPlaylist(){
        await expect(this.playlistlink.first()).toBeEnabled();
        await this.playlistlink.first().click();
    }

}