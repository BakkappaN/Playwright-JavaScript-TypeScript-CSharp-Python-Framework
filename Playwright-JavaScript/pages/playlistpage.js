// Inlcude playwright module
const { expect } = require('@playwright/test')
const BasePage = require('./basepage');

// create class
exports.PlaylistPage = class PlaylistPage extends BasePage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        super(page);
        
        // Elements
        this.videoLink = page.locator('#container > #thumbnail');
    }

    async clickOnVideo(){
        await this.page.waitForTimeout(3000);
        await this.isElementEnabled(this.videoLink.first())
        await this.clickOnElement(this.videoLink.first());
    }

}