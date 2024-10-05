const { expect } = require('@playwright/test');

class BasePage {
    /**
    * 
    * @param {import ('@playwright/test').Page} page 
    */
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async clickOnElement(locator) {
        await locator.isVisible();
        await locator.click();
    }

    async doubleClickOnElement(locator) {
        await locator.isVisible();
        await locator.dbclick();
    }

    async enterText(locator, value) {
        await locator.click();
        await locator.clear();
        await locator.fill(value);
    }

    async isElementVisible(locator) {
        return await locator.isVisible();
    }

    async getText(locator) {
        return await locator.textContent();
    }

    async pressKeyboardKey(locator, key) {
        await locator.press(key);
    }

    async isElementEnabled(locator){
        await expect(locator).toBeEnabled();
    }
}

module.exports = BasePage;
