// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basepage';

import dotenv from 'dotenv';
dotenv.config();

// create class
export class HomePage extends BasePage {

    readonly searchTextbox: Locator;

    constructor(page: Page) {
        super(page); 
        
        // Elements
        this.searchTextbox = page.locator('#APjFqb');
    }

    async goto() {
        await this.page.setViewportSize({ width: 1366, height: 728 });
        if (String(process.env.ENV).toUpperCase() === 'QA') {
            await this.navigateTo(String(process.env.QA_URL));
        } else if (String(process.env.ENV).toUpperCase() === 'STAGE') {
            await this.navigateTo(String(process.env.STAGING_URL));
        }
    }

    async searchKeywords(param1: string) {
        await this.clickOnElement(this.searchTextbox);
        await this.enterText(this.searchTextbox, param1);
        await this.pressKeyboardKey(this.searchTextbox, 'Enter');
    }
}