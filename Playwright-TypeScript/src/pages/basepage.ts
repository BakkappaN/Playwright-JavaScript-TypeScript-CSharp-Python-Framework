import { Locator, Page } from 'playwright';
import { expect } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async clickOnElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' }); 
        await locator.click();
    }

    async doubleClickOnElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' }); 
        await locator.dblclick(); 
    }

    async enterText(locator: Locator, value: string): Promise<void> {
        await locator.click();
        await locator.fill(''); 
        await locator.fill(value);
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async getText(locator: Locator): Promise<string | null> {
        return await locator.textContent();
    }

    async pressKeyboardKey(locator: Locator, key: string): Promise<void> {
        await locator.press(key);
    }

    async isElementEnabled(locator: Locator): Promise<void> {
        await expect(locator).toBeEnabled();
    }
}
