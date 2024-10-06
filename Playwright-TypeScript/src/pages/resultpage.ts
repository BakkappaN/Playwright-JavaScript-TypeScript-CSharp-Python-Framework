// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basepage';

// create class
export class ResultPage extends BasePage {

    readonly playlistlink: Locator;

    constructor(page: Page, testData: any) {
        super(page);
        
        // Elements
        this.playlistlink = page.getByRole('link',{name: String(testData.module1.skill1) });
    }

    async clickOnPlaylist(){
        await this.isElementEnabled(this.playlistlink.first());
        await this.clickOnElement( this.playlistlink.first());
    }
    
    async clickOnPlaylistLink(playlist:string) {
        const link = this.page.getByRole('link', { name: playlist }).first();
        await expect(link).toBeEnabled();
        await this.clickOnElement(link);
    }
}