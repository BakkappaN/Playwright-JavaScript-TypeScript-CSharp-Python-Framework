// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

// create class
export class LoginPage {

    readonly page: Page;
    readonly registerLink: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        // Init page object
        this.page = page;

        // Elements
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.userName = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');

        // Buttons
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    async goto() {
        await this.page.setViewportSize({ width: 1366, height: 728 })
        const url: string = process.env.API_KEY || '';
        await this.page.goto(url);
    }

    async clickOnRegisterLink() {
        await this.registerLink.click();
    }

    async loginToApplication(username:string, password:string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}