// Inlcude playwright module
import { expect, type Locator, type Page } from '@playwright/test';

// create class
export class RegistrationPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly addresss: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phoneNumber: Locator;
    readonly ssn: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly confirm: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        // Init page object
        this.page = page;

        // Elements
        this.firstName = page.locator('[id="customer\\.firstName"]');
        this.lastName = page.locator('[id="customer\\.lastName"]');
        this.addresss = page.locator('[id="customer\\.address\\.street"]');
        this.city = page.locator('[id="customer\\.address\\.city"]');
        this.state = page.locator('[id="customer\\.address\\.state"]');
        this.zipCode = page.locator('[id="customer\\.address\\.zipCode"]');
        this.phoneNumber = page.locator('[id="customer\\.phoneNumber"]');
        this.ssn = page.locator('[id="customer\\.ssn"]');
        this.userName = page.locator('[id="customer\\.username"]');
        this.password = page.locator('[id="customer\\.password"]');
        this.confirm = page.locator('#repeatedPassword');

        // Buttons
        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    async registerNewUser(fname: string, lname: string, address: string, city: string, state: string, zipcode: string, phone: string, ssn: string, username: string, pass: string) {
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.addresss.fill(address);
        await this.city.fill(city);
        await this.state.fill(state);
        await this.zipCode.fill(zipcode);
        await this.phoneNumber.fill(phone);
        await this.ssn.fill(ssn);
        await this.userName.fill(username);
        await this.password.fill(pass);
        await this.confirm.fill(pass);
        await this.registerButton.click();
    }
}