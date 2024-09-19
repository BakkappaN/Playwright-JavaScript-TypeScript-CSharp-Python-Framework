// Inlcude playwright module
const { expect } = require('@playwright/test')

// create class
exports.RegistrationPage = class RegistrationPage {

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        // Init page object
        this.page = page;

        // Elements
        this.firstName = page.locator('[id="customer\\.firstName"]');
        this.lastName = page.locator('[id="customer\\.lastName"]');
        this.firstName = page.locator('[id="customer\\.firstName"]');
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

    async registerNewUser(fname, lname, address, city, state, zipcode, phone, ssn, username, pass) {
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