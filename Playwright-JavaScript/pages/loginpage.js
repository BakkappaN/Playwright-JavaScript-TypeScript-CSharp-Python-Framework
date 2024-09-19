// Inlcude playwright module
const { expect } = require('@playwright/test')
import dotenv from 'dotenv';
dotenv.config;

// create class
exports.LoginPage = class LoginPage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
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
        const url = process.env.URL;
        await this.page.goto(process.env.URL);
    }

    async clickOnRegisterLink() {
        await this.registerLink.click();
    }

    async loginToApplication(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}